import { Scene } from "phaser";
import { Player } from "../objects/player/Player";

export class Game extends Scene {
  private player: Player;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset | null;
  private ground: Phaser.Tilemaps.TilemapLayer | null;

  constructor() {
    super("Game");
  }

  create() {
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    this.tileset = this.map.addTilesetImage("Forest", "forest");
    this.physics.world.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    if (this.tileset) {
      this.map.createLayer("Layer4", this.tileset, 0, 0);
      this.map.createLayer("Layer3", this.tileset, 0, 0);
      this.map.createLayer("Layer2", this.tileset, 0, 0);
      this.map.createLayer("Layer1", this.tileset, 0, 0);
      this.ground = this.map.createLayer("Ground", this.tileset, 0, 0);
      if (this.ground) {
        this.ground.setCollisionByExclusion([-1]);
      }
    }

    const body = this.add.sprite(8, 14, "player-body").setName("body");
    const head = this.add.sprite(8, 0, "player-head").setName("head");
    const jetpack = this.add.sprite(-5, 10, "jetpack").setName("jetpack");
    const bulletFlash = this.add
      .sprite(-5, 40, "bulletFlash")
      .setName("bulletFlash");

    this.add.sprite(400, 300, "zapper").play("zapEffect");

    this.player = new Player(this, 200, 0, [body, head, jetpack, bulletFlash]);

    this.physics.world.enable(this.player);

    // Adjust the physics body size and offset to match the player's container size
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setSize(this.player.width, this.player.height);
    playerBody.setOffset(-this.player.width / 2, -this.player.height / 2);

    if (this.ground) {
      this.physics.add.collider(this.player, this.ground);
      this.physics.add.collider(
        this.player.bullets,
        this.ground,
        (bullet, _) => {
          // Get the bullet's position
          const bulletPos = (bullet as Phaser.Physics.Arcade.Image).getCenter();
          console.log(bulletPos);

          // Create the bullet splash animation at the bullet's position
          const splash = this.add.sprite(
            bulletPos.x,
            bulletPos.y,
            "bulletSplash"
          );
          splash.play("bulletSplash");

          // Destroy the bullet
          (bullet as Phaser.Physics.Arcade.Image).destroy();

          // Destroy the splash animation after it finishes
          splash.on("animationcomplete", () => {
            splash.destroy();
          });
        }
      );
    }

    // SET UP CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setZoom(window.screen.availWidth / 2048);

 
  }

  update() {
    this.player.update();
  }
}
