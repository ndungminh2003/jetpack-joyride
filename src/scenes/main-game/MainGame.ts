import { mapGenerator } from "../../manager/MapGenerator";
import { Player } from "../../objects/player/Player";
import { BaseWorker } from "../../objects/worker/BaseWorker";
import { NormalWorker } from "../../objects/worker/NormalWorker";
import { YellowWorker } from "../../objects/worker/YellowWorker";
import { Zapper } from "../../objects/obstacle/zapper/Zapper";
import { Missile } from "../../objects/obstacle/missile/Missile";

export class MainGame extends Phaser.GameObjects.Container {
  private player: Player;
  private zapper: Zapper;
  private normalWorker: BaseWorker;
  private yellowWorker: BaseWorker;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0);
    this.create();
    this.setDepth(Infinity);
  }

  public create() {
    this.scene.physics.world.enable(this);

    // create game object
    this.player = new Player(this.scene, 100, 550);
    this.zapper = new Zapper(this.scene, 400, 300);
    this.normalWorker = new NormalWorker(this.scene, "run");
    this.yellowWorker = new YellowWorker(this.scene, "run");

    // create map and set up world bound
    mapGenerator.generateMap(
      mapGenerator.getMapName(0),
      this.scene,
      this.player
    );
    mapGenerator.parallex(this.scene);
    this.scene.physics.world.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    // check collide

    this.zapper.addCollide(this.player);

    this.scene.physics.add.collider(
      this.normalWorker,
      mapGenerator.getGround()
    );
    this.scene.physics.add.collider(
      this.yellowWorker,
      mapGenerator.getGround()
    );
    this.scene.physics.add.collider(this.player, mapGenerator.getGround());
    this.scene.physics.add.collider(
      this.player.getBullets(),
      mapGenerator.getGround(),
      (bullet, _) => {
        this.player
          .getBullets()
          .handleBulletCollideWithGround(bullet as Phaser.Physics.Arcade.Image);
      }
    );

    this.scene.physics.add.collider(
      this.player.getBullets(),
      this.normalWorker,
      () => {
        this.normalWorker.handleCollide();
      }
    );

    this.scene.physics.add.collider(
      this.player.getBullets(),
      this.yellowWorker,
      () => {
        this.yellowWorker.handleCollide();
      }
    );

    this.scene.physics.world.on("worldbounds", (body: any) => {
      body.gameObject.onWorldBounds();
    });

    // SET UP CAMERA
    this.scene.cameras.main.startFollow(this.player, true, 0.5, 0.5);
    this.scene.cameras.main.setBounds(
      0,
      0,
      Infinity,
      mapGenerator.getMap().heightInPixels
    );

    this.player.setDepth(Infinity);
    this.player.getBullets().setDepth(Infinity);

    this.scene.add.existing(this);
  }

  update(time: number, delta: number) {
    this.zapper.loopZapper();

    this.normalWorker.update();
    this.yellowWorker.update();

    this.player.update(time, delta);
    mapGenerator.update(this.player, this.scene);

    if (Math.random() < 0.005) {
      let missile = new Missile(
        this.scene,
        this.scene.cameras.main.scrollX + this.scene.cameras.main.width - 50,
        this.player.y + this.player.body.height / 4,
        this.player.body.velocity.x
      );

      missile.addCollide(this.player);
    }
  }
}
