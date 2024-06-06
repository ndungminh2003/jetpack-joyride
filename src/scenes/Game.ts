import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  preload() {
    // Ensure the path is correct and the image file exists
    this.load.spritesheet("body", "assets/Characters/Barry/defaultBody.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("head", "assets/Characters/Barry/defaultHead.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.image("forest", "assets/atlas/forest_assets.png")
    this.load.tilemapTiledJSON("map", "assets/atlas/MapForest.json");

  }

  create() {
    // Create the 'run' animation

    // const container = this.add.container(400, 400);



    // container.add(this.physics.add.sprite(550, 320, "head"))
    // container.add(this.physics.add.sprite(550, 300, "body"))

    // this.anims.create({
    //   key: "head-run",
    //   frames: this.anims.generateFrameNumbers("head", { frames: [] }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: "run",
    //   frames: this.anims.generateFrameNumbers("body", { frames: [] }),
    //   frameRate: 10,
    //   repeat: -1,
    // });


    // this.physics.add.sprite(550, 300, "body").play("run");
    // this.physics.add.sprite(550, 286, "head").play("head-run");

    const map = this.make.tilemap({ key: "map", tileWidth: 60, tileHeight: 32 });
    const forestTileset = map.addTilesetImage("Forest", "forest");

    map.createLayer("Background", forestTileset as Phaser.Tilemaps.Tileset, 0, 0);
    map.createLayer("Layer1", forestTileset as Phaser.Tilemaps.Tileset, 0, 0);
    map.createLayer("Layer2", forestTileset as Phaser.Tilemaps.Tileset, 0, 0);

    // Add the sprite and play the 'run' animation

    // Uncomment and adjust if needed
    // this.input.once("pointerdown", () => {
    //   this.scene.start("GameOver");
    // });
  }

  update() {
    // Game logic here
  }
}
