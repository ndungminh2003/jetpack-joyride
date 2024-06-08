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

  preload() {
    this.load.spritesheet("body", "assets/Characters/Barry/defaultBody.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("head", "assets/Characters/Barry/defaultHead.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet(
      "jetpack",
      "assets/Characters/Jetpacks/jetpackDefault.png",
      {
        frameWidth: 32,
        frameHeight: 44,
      }
    );

    this.load.image("forest", "assets/atlas/forest_assets.png");
    this.load.tilemapTiledJSON("map", "assets/atlas/Forest_Map.json");
  }

  create() {
    this.map = this.make.tilemap({
      key: "map",
      tileWidth: 32,
      tileHeight: 32,
    });
    this.tileset = this.map.addTilesetImage("Forest", "forest");

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

    this.anims.create({
      key: "jetpack-run",
      frames: this.anims.generateFrameNumbers("jetpack", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "body-run",
      frames: this.anims.generateFrameNumbers("body", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "head-run",
      frames: this.anims.generateFrameNumbers("head", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "body-fly",
      frames: this.anims.generateFrameNumbers("body", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "head-fly",
      frames: this.anims.generateFrameNumbers("head", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jetpack-fly",
      frames: this.anims.generateFrameNumbers("jetpack", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "body-fall",
      frames: this.anims.generateFrameNumbers("body", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "head-fall",
      frames: this.anims.generateFrameNumbers("head", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jetpack-fall",
      frames: this.anims.generateFrameNumbers("jetpack", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });

    const body = this.add.sprite(8, 14, "body").setName("body");
    const head = this.add.sprite(8, 0, "head").setName("head");
    const jetpack = this.add.sprite(-5, 10, "jetpack").setName("jetpack");

    this.player = new Player(this, 80, 0, [body, head, jetpack]);

    this.physics.world.enable(this.player);

    // Adjust the physics body size and offset to match the player's container size
    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    playerBody.setSize(this.player.width, this.player.height);
    playerBody.setOffset(-this.player.width / 2, -this.player.height / 2);

    if (this.ground) {
      this.physics.add.collider(this.player, this.ground);
    }

    // SET UP CAMERA
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main
      .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
      .setZoom(window.screen.availWidth / 2048);

    // this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Store cursor keys for player movement
    this.input.keyboard?.createCursorKeys();
  }

  update() {
    this.player.update();
  }
}
