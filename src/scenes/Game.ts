import { Missile } from "../objects/obstacle/missile/Missile";
// import { Obstacle } from "./../objects/obstacle/Obstacle";
import { Scene } from "phaser";
import { Player } from "../objects/player/Player";
import { Zapper } from "../objects/obstacle/zapper/Zapper";
import { mapGenerator } from "../manager/MapGenerator";
import { BaseWorker } from "../objects/worker/BaseWorker";
import { NormalWorker } from "../objects/worker/NormalWorker";
import { YellowWorker } from "../objects/worker/YellowWorker";

export class Game extends Scene {
  // Game Object
  private player: Player;
  // private obstacle: Obstacle;
  private zapper: Zapper;
  private normalWorker: BaseWorker;
  private yellowWorker: BaseWorker;

  constructor() {
    super("Game");
  }

  create() {
    // create game object

    this.player = new Player(this, 100, 550);
    this.zapper = new Zapper(this, 400, 300);
    this.normalWorker = new NormalWorker(this, "run");
    this.yellowWorker = new YellowWorker(this, "run");

    // create map and set up world bound
    mapGenerator.generateMap(mapGenerator.getMapName(0), this, this.player);
    mapGenerator.parallex(this);
    this.physics.world.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    // check collide

    this.zapper.addCollide(this.player);

    this.physics.add.collider(this.normalWorker, mapGenerator.getGround());
    this.physics.add.collider(this.yellowWorker, mapGenerator.getGround());
    this.physics.add.collider(this.player, mapGenerator.getGround());
    this.physics.add.collider(
      this.player.getBullets(),
      mapGenerator.getGround(),
      (bullet, _) => {
        this.player
          .getBullets()
          .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
      }
    );

    

    this.physics.add.collider(
      this.player.getBullets(),
      this.normalWorker,
      () => {
        this.normalWorker.handleCollide();
      }
    );

    this.physics.add.collider(
      this.player.getBullets(),
      this.yellowWorker,
      () => {
        this.yellowWorker.handleCollide();
      }
    );

    this.physics.world.on("worldbounds", (body: any) => {
      body.gameObject.onWorldBounds();
    });

    // SET UP CAMERA
    this.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    this.cameras.main.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    this.player.setDepth(Infinity);
    this.player.getBullets().setDepth(Infinity);
  }

  update() {
    this.zapper.loopZapper();
    
    this.normalWorker.update();
    this.yellowWorker.update();  

    this.player.update();
    mapGenerator.update(this.player, this);

    if (Math.random() < 0.005) {
      let missile = new Missile(
        this,
        this.cameras.main.scrollX + this.cameras.main.width - 50,
        this.player.y + this.player.body.height / 4,
        this.player.body.velocity.x
      );

      missile.addCollide(this.player);
    }
  }
}
