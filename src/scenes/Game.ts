import { Missile } from "../objects/obstacle/missile/Missile";
import { Obstacle } from "./../objects/obstacle/Obstacle";
import { Scene } from "phaser";
import { Player } from "../objects/player/Player";
// import { DieState } from "../objects/player/state/DieState";
import { Zapper } from "../objects/obstacle/zapper/Zapper";

export class Game extends Scene {
  // Map
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset | null;
  private mapName: string[] = ["Forest", "Aqua"];
  private ground: Phaser.Tilemaps.TilemapLayer | null;
  private lv: number = 0;

  // Game Object
  private player: Player;
  private obstacle: Obstacle;
  private zapper: Zapper;

  constructor() {
    super("Game");
  }

  create() {
    // create map
    this.genMap(this.mapName[0]);
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.player = new Player(this, 200, 0);

    this.zapper = new Zapper(this, 400, 300);
    this.zapper.setRotation(Math.PI / 4);

    this.physics.add.collider(this.player, this.obstacle, () => {
      this.scene.start("GameOver");
    });

    // check collide
    if (this.ground) {
      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(
        this.player.getBullets(),
        this.ground,
        (bullet, _) => {
          this.player
            .getBullets()
            .handleBulletCollideWithGround(
              bullet as Phaser.Physics.Arcade.Image
            );
        }
      );
    }

    this.zapper.getCircleCollisions().forEach((circle) => {
      this.physics.add.collider(this.player, circle, () => {
        this.zapper.handleCollide(this.player);
      });
    });

    this.physics.world.on("worldbounds", (body: any) => {
      body.gameObject.onWorldBounds();
    });

    // SET UP CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, Infinity, this.map.heightInPixels);

    this.player.setDepth(Infinity);
    this.player.getBullets().setDepth(Infinity);
  }

  update() {
    let i = Math.floor(Math.random() * 2);
    this.zapper.loopZapper();

    if (this.player.x >= (this.map.widthInPixels * (this.lv + 1)) / 2) {
      this.lv++;
      this.genMap(this.mapName[i]);
      this.physics.world.setBounds(
        0,
        200,
        this.map.widthInPixels * this.lv - 100,
        this.map.heightInPixels * this.lv - 100
      );

      if (this.ground) {
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(
          this.player.getBullets(),
          this.ground,
          (bullet, _) => {
            this.player
              .getBullets()
              .handleBulletCollideWithGround(
                bullet as Phaser.Physics.Arcade.Image
              );
          }
        );
      }
    }

    if (Math.random() < 0.005) {
      let missile = new Missile(
        this,
        this.cameras.main.scrollX + this.cameras.main.width - 50,
        this.player.y + this.player.body.height / 4,
        this.player.body.velocity.x
      );

      console.log(missile);
    }

    this.player.update();
  }

  private genMap(maptype: string) {
    this.map = this.make.tilemap({
      key: maptype,
      tileWidth: 32,
      tileHeight: 32,
    });
    this.tileset = this.map.addTilesetImage(maptype, maptype + "_tileset");
    if (this.tileset) {
      this.map.createLayer(
        "Layer4",
        this.tileset,
        this.map.widthInPixels * this.lv,
        0
      );
      this.map.createLayer(
        "Layer3",
        this.tileset,
        this.map.widthInPixels * this.lv,
        0
      );

      this.map.createLayer(
        "Layer2",
        this.tileset,
        this.map.widthInPixels * this.lv,
        0
      );

      this.map.createLayer(
        "Layer1",
        this.tileset,
        this.map.widthInPixels * this.lv,
        0
      );

      this.ground = this.map.createLayer(
        "Ground",
        this.tileset,
        this.map.widthInPixels * this.lv,
        0
      );

      if (this.ground) {
        this.ground.setCollisionByExclusion([-1]);
      }
    }
  }
}
