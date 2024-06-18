import { Scene } from "phaser";
import { Player } from "../objects/player/Player";
import { Coins } from "../objects/coin/Coin";

export class MapGenerator {

  private lv: number = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private ground: Phaser.Tilemaps.TilemapLayer;
  private mapName: string[] = ["Hallway", "Forest", "Aqua", "Cave"];
  private layers: { rationX: number; sprite: Phaser.GameObjects.TileSprite }[] = [];
  private coins: Coins;
  constructor() { }

  public generateMap(maptype: string, scene: Scene, player: Player, tilte: number): void {
    this.map = scene.make.tilemap({
      key: maptype,
      tileWidth: 32,
      tileHeight: 32,
    });
    this.tileset = this.map.addTilesetImage(
      maptype,
      maptype + "_tileset"
    ) as Phaser.Tilemaps.Tileset;
    if (this.tileset) {
      if (tilte == 1)
        this.map
          .createLayer(
            "Layer1",
            this.tileset,
            (this.map.widthInPixels - 32 * 4.6) * this.lv,
            0
          )
          ?.setDepth(9999 - this.lv);
      this.map
        .createLayer(
          "Layer",
          this.tileset,
          (this.map.widthInPixels - 32 * 4.6) * this.lv,
          0
        )
        ?.setDepth(9999 - this.lv);

      this.ground = this.map.createLayer(
        "Ground",
        this.tileset,
        (this.map.widthInPixels - 32 * 4) * this.lv - 1,
        this.map.heightInPixels - 32 * 4
      )!;
      this.ground.setCollisionByExclusion([-1])

      scene.physics.add.overlap(
        player.getBullets(),
        this.getGround(),
        (bullet, _) => {
          player
            .getBullets()
            .handleBulletCollideWithGround(
              bullet as Phaser.Physics.Arcade.Image
            );
        }
      );
    }
    
    if (tilte != 1 && this.lv % 2 == 1) {
      let height = this.map.heightInPixels / 3
      let width = (this.map.widthInPixels - 32 * 4.6) * this.lv + this.map.widthInPixels / 3
      let patternNum = Math.floor(Math.random() * 27) + 1;
      this.coins = new Coins(scene, width, height, patternNum)
      this.coins.spawnCoins()
      //scene.physics.add.collider(Player, this.coins)

    }
  }
  public parallex(scene: Scene): void {
    for (let i = 3; i > 0; i--) {
      this.layers.push({
        rationX: 1 - 0.2 * i,
        sprite: scene.add
          .tileSprite(
            0,
            0,
            this.map!.widthInPixels,
            this.map!.heightInPixels,
            "Forest" + i
          )
          .setOrigin(0, 0)
          .setScrollFactor(0, 0),
      });
    }
    for (let i = 3; i > 0; i--) {
      this.layers.push({
        rationX: 1 - 0.2 * i,
        sprite: scene.add
          .tileSprite(
            0,
            0,
            this.map!.widthInPixels,
            this.map!.heightInPixels,
            "Aqua" + i
          )
          .setOrigin(0, 0)
          .setScrollFactor(0, 0),
      });
    }
    this.layers.push({
      rationX: 1 - 0.2,
      sprite: scene.add
        .tileSprite(
          0,
          0,
          this.map!.widthInPixels,
          this.map!.heightInPixels,
          "Cave1"
        )
        .setOrigin(0, 0)
        .setScrollFactor(0, 0),
    });
  }
  public setLayer(idex: number): void {
    for (let i = 0; i < 7; i++) {
      this.layers[i].sprite.setDepth(-Infinity);
    }
    if (idex == 0) {
      for (let i = 0; i < 3; i++) {
        this.layers[i].sprite.setDepth(i);
      }
    } else if (idex == 1) {
      for (let i = 0; i < 3; i++) {
        this.layers[i + 3].sprite.setDepth(i);
      }
    } else this.layers[6].sprite.setDepth(0);
  }
  public updateLayer(player: Player): void {
    for (let i = 0; i < 3; i++) {
      this.layers[i].sprite.tilePositionX +=
        (player.body.velocity.x * this.layers[i].rationX) / 100;
    }
    for (let i = 0; i < 3; i++) {
      this.layers[i + 3].sprite.tilePositionX +=
        (player.body.velocity.x * this.layers[i + 3].rationX) / 100;
    }
    this.layers[6].sprite.tilePositionX +=
      (player.body.velocity.x * this.layers[6].rationX) / 100;
  }
  public getMap(): Phaser.Tilemaps.Tilemap {
    return this.map;
  }
  public getGround(): Phaser.Tilemaps.TilemapLayer {
    return this.ground;
  }
  public getLevel(): number {
    return this.lv;
  }
  public getMapName(index: number): string {
    return this.mapName[index];
  }
  //      lv1c    lv2     lv3c
  // lv0  0.5  1  1.5  2  2.5  3
  public update(player: Player, scene: Scene): void {
    // console.log(this.coins)
    if (
      this.map &&
      player.x >= (this.map.widthInPixels * (2 * this.lv + 1)) / 2
    ) {
      this.lv++;
      let ran = Math.floor(Math.random() * 3); //0-2
      if (this.lv % 2 === 0) {
        this.generateMap(this.mapName[0], scene, player, 0);
      } else {
        this.setLayer(ran);
        this.generateMap(this.mapName[ran + 1], scene, player, 0);
      }
      if (this.ground) {
        scene.physics.add.collider(player, this.ground);
      }
    }
    this.updateLayer(player);
  }
}

