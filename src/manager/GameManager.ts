import { Player } from "./../objects/player/Player";
import { IGameManagerContructor } from "../types/IGameManagerContructor";
import { MapGenerator } from "./MapGenerator";
import { Zapper } from "../objects/obstacle/zapper/Zapper";
import { Missile } from "../objects/obstacle/missile/Missile";
import { NormalWorker } from "../objects/worker/NormalWorker";
import { YellowWorker } from "../objects/worker/YellowWorker";
import { ScoreManager } from "./ScoreManager";
import { DieState } from "../objects/player/state/DieState";

export class GameManager {
  private scene: Phaser.Scene;
  private player: Player;
  private obstacleGroup: Phaser.GameObjects.Group;
  private workerGroup: Phaser.GameObjects.Group;
  private mapGenerator: MapGenerator;
  private scoreManager: ScoreManager;

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

    this.mapGenerator.generateMap("Tilte", this.scene, this.player, 1);
    this.mapGenerator.parallex(this.scene);
    this.scene.physics.world.setBounds(
      0,
      0,
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

    // Timed generation of obstacles and workers
    this.scene.time.addEvent({
      delay: 2000, // 2 seconds
      callback: this.generateObstacle,
      callbackScope: this,
      loop: true,
    });

    this.scene.time.addEvent({
      delay: 2000, // 2 seconds
      callback: this.generateWorker,
      callbackScope: this,
      loop: true,
    });
  }

  public update(time: number, delta: number) {
    this.scoreManager.update(time, delta);
    this.mapGenerator.update(this.player, this.scene);

    const cameraX = this.scene.cameras.main.scrollX;

    // Update and destroy obstacles that are out of view
    this.obstacleGroup.getChildren().forEach((child: any) => {
      if (child.active && child.update) {
        child.update();
      }
      if (child.x < cameraX - 400) {
        // 50 pixels buffer
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
      this.player.getCurrentScene().scene.pause();
      this.player.getCurrentScene().scene.stop("HUDScene");
      this.player
        .getCurrentScene()
        .scene.launch("GameOverScene", { score: this.scoreManager.getScore() });
    }
  }
  //0 0.4 0.5 1 1.01 15
  private generateObstacle() {
    const obstacleTypes = ["Zapper", "Missile"];
    const type = Phaser.Math.RND.pick(obstacleTypes);

    let obstacle;

    switch (type) {
      case "Zapper":
        const zapperX =
          this.scene.cameras.main.scrollX + this.scene.cameras.main.width + 50;
        const zapperY = Phaser.Math.Between(200, this.scene.scale.height - 300);

        obstacle = new Zapper(this.scene, zapperX, zapperY);
        this.obstacleGroup.add(obstacle);
        break;
      case "Missile":
        const missileX =
          this.scene.cameras.main.scrollX + this.scene.cameras.main.width - 50;
        const missileY = this.player.y + this.player.body.height / 4;
        obstacle = new Missile(
          this.scene,
          missileX,
          missileY,
          this.player.body.velocity.x
        );
        this.obstacleGroup.add(obstacle);
        break;
      default:
        console.warn("Unknown obstacle type:", type);
        break;
    }

    if (obstacle) {
      obstacle.addCollide(this.player);
      this.scene.add.existing(obstacle);
    }
  }

  private generateWorker() {
    const numNormalWorkers = 1;
    const numYellowWorkers = 2;

    // Generate NormalWorkers
    for (let i = 0; i < numNormalWorkers; i++) {
      const xWorker =
        this.scene.cameras.main.scrollX +
        this.scene.cameras.main.width +
        Phaser.Math.Between(0, 800);
      const yWorker = 550;
      const action = Phaser.Math.RND.pick(["walk", "run"]); // Random action
      const flipX = Phaser.Math.RND.between(0, 1) === 1; // Random flipX for this worker
      const worker = new NormalWorker(this.scene, action, xWorker, yWorker);
      worker.setFlipX(flipX); // Set flipX

      // Set up collisions
      this.scene.physics.add.collider(worker, this.mapGenerator.getGround());
      this.scene.physics.add.collider(this.player.getBullets(), worker, () => {
        worker.handleCollide();
      });

      // Add worker to group and scene
      this.workerGroup.add(worker);
      this.scene.add.existing(worker);
    }

    // Generate YellowWorkers
    for (let i = 0; i < numYellowWorkers; i++) {
      const xWorkerYellow =
        this.scene.cameras.main.scrollX +
        this.scene.cameras.main.width +
        Phaser.Math.Between(0, 800);
      const yWorkerYellow = 600;
      const action = Phaser.Math.RND.pick(["walk", "run"]); // Random action
      const flipX = Phaser.Math.RND.between(0, 1) === 1; // Random flipX for this worker
      const worker = new YellowWorker(
        this.scene,
        action,
        xWorkerYellow,
        yWorkerYellow
      );
      worker.setFlipX(flipX); // Set flipX

      // Set up collisions
      this.scene.physics.add.collider(worker, this.mapGenerator.getGround());
      this.scene.physics.add.collider(this.player.getBullets(), worker, () => {
        worker.handleCollide();
      });

      // Add worker to group and scene
      this.workerGroup.add(worker);
      this.scene.add.existing(worker);
    }
  }
}
