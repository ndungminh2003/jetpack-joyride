import { Player } from "./../objects/player/Player";
import { IGameManagerContructor } from "../types/IGameManagerContructor";
import { MapGenerator } from "./MapGenerator";
import { Missile } from "../objects/obstacle/missile/Missile";
import { ScoreManager } from "./ScoreManager";
import { DieState } from "../objects/player/state/DieState";
import { CoinManager } from "./CoinManager";

export class GameManager {
  private scene: Phaser.Scene;
  private player: Player;
  private obstacleGroup: Phaser.GameObjects.Group;
  private workerGroup: Phaser.GameObjects.Group;
  private mapGenerator: MapGenerator;
  private scoreManager: ScoreManager;
  private coinManager: CoinManager;

  constructor(params: IGameManagerContructor) {
    this.scene = params.scene;
    this.player = params.player;
    this.obstacleGroup = params.obstacleGroup;
    this.workerGroup = params.workerGroup;
    this.mapGenerator = params.mapGenerator;
    this.init();
  }

  private init() {
    // Create map and set up world bounds

    this.scoreManager = new ScoreManager(this.scene, 0, this.player);
    this.coinManager = new CoinManager(this.scene, 0);

    this.mapGenerator.generateMap(
      "Tilte",
      this.scene,
      this.player,
      1,
      this.coinManager,
      this.obstacleGroup,
      this.workerGroup
    );
    this.mapGenerator.parallex(this.scene);
    this.scene.physics.world.setBounds(
      0,
      this.scene.cameras.main.height / 9,
      Infinity,
      this.mapGenerator.getMap().heightInPixels
    );

    // Set up player collisions with ground
    this.scene.physics.add.collider(this.player, this.mapGenerator.getGround());

    this.scene.physics.add.overlap(
      this.player.getBullets(),
      this.mapGenerator.getGround(),
      (bullet, _) => {
        this.player
          .getBullets()
          .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
      }
    );

    // Handle world bounds events
    this.scene.physics.world.on("worldbounds", (body: any) => {
      body.gameObject.onWorldBounds();
    });

    // Set up camera to follow player
    this.scene.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    this.scene.cameras.main.setBounds(
      0,
      0,
      Infinity,
      this.mapGenerator.getMap().heightInPixels
    );

    // Set player and bullet depths
    this.player.setDepth(Infinity);
    this.player.getBullets().setDepth(Infinity);

    this.scene.time.addEvent({
      delay: 4000,
      callback: this.generateObstacle,
      callbackScope: this,
      loop: true,
    });
  }

  public update(time: number, delta: number) {
    this.scoreManager.update(time, delta);
    this.mapGenerator.update(
      this.player,
      this.scene,
      this.coinManager,
      this.obstacleGroup,
      this.workerGroup
    );
    this.coinManager.update(time, delta);

    const cameraX = this.scene.cameras.main.scrollX;

    // Update and destroy obstacles that are out of view
    this.obstacleGroup.getChildren().forEach((child: any) => {
      if (child.active && child.update) {
        child.update();
      }
      if (child.x < cameraX - 400) {
        child.destroy();
      }
    });

    // Update and destroy workers that are out of view
    this.workerGroup.getChildren().forEach((child: any) => {
      if (child.active && child.update) {
        child.update();
      }
      if (child.x < cameraX - 400) {
        child.destroy();
      }
    });

    if (
      this.player.getCurrentState() instanceof DieState &&
      this.player.body.velocity.x <= 0
    ) {
      this.scoreManager.writeScoreToLocalStorage();
      this.coinManager.writeCoinToLocalStorage();
      this.player.getCurrentScene().scene.pause();
      this.player.getCurrentScene().scene.stop("HUDScene");
      this.player
        .getCurrentScene()
        .scene.launch("GameOverScene", { score: this.scoreManager.getScore() });
    }
  }

  private generateObstacle() {
    const missileX =
      this.scene.cameras.main.scrollX + this.scene.cameras.main.width - 50;
    const missileY = this.player.y + this.player.body.height / 4;
    let obstacle = new Missile(
      this.scene,
      missileX,
      missileY,
      this.player.body.velocity.x
    );

    obstacle.addCollide(this.player);
    this.scene.add.existing(obstacle);
    this.obstacleGroup.add(obstacle);
  }
}
