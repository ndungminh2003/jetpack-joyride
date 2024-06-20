import { CoinManager } from "./CoinManager";
import { Scene } from "phaser";
import { Player } from "../objects/player/Player";
import { Coins } from "../objects/coin/Coin";
import { Zapper } from "../objects/obstacle/zapper/Zapper";
import { YellowWorker } from "../objects/worker/YellowWorker";
import { NormalWorker } from "../objects/worker/NormalWorker";

export class MapGenerator {
  private lv: number = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private ground: Phaser.Tilemaps.TilemapLayer;
  private mapName: string[] = ["Hallway", "Forest", "Aqua", "Cave"];
  private layers: { rationX: number; sprite: Phaser.GameObjects.TileSprite }[] =
    [];
  private coins: Coins;

  constructor() {}

  public generateMap(
    maptype: string,
    scene: Scene,
    player: Player,
    tilte: number,
    coinManager: CoinManager,
    obstacleGroup: Phaser.GameObjects.Group,
    workerGroup: Phaser.GameObjects.Group
  ): void {
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
          (this.map.widthInPixels - 32 * 4.55) * this.lv,
          0
        )
        ?.setDepth(9999 - this.lv);

      this.ground = this.map.createLayer(
        "Ground",
        this.tileset,
        (this.map.widthInPixels - 32 * 4) * this.lv - 1,
        this.map.heightInPixels - 32 * 4
      )!;
      this.ground.setCollisionByExclusion([-1]);

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

    if (this.map) {
      const objects = this.map.getObjectLayer("Objects")?.objects as any[];
      if (objects) {
        objects.forEach((object) => {
          if (object.name === "Zapper") {
            const zapper = new Zapper(
              scene,
              object.x + (this.map.widthInPixels - 32 * 4.6) * this.lv,
              object.y
            );
            zapper.addCollide(player);
            obstacleGroup.add(zapper);
          } else if (object.name === "Coin") {
            let height = object.y;
            let width =
              object.x + (this.map.widthInPixels - 32 * 4.6) * this.lv;
            let patternNum = Math.floor(Math.random() * 27) + 1;
            this.coins = new Coins(scene, width, height, patternNum);
            this.coins.spawnCoins();
            this.coins.addCollide(player, coinManager);
          } else if (object.name === "YellowWorker") {
            const action = Phaser.Math.RND.pick(["walk", "run"]);
            const flipX = Phaser.Math.RND.between(0, 1) === 1;

            const xWorker =
              object.x + (this.map.widthInPixels - 32 * 4.6) * this.lv;
            const yWorker = object.y;
            const worker = new YellowWorker(scene, action, xWorker, yWorker);
            worker.setFlipX(flipX);

            scene.physics.add.collider(worker, this.getGround());
            scene.physics.add.collider(player.getBullets(), worker, () => {
              worker.handleCollide();
            });

            workerGroup.add(worker);
            scene.add.existing(worker);
          } else if (object.name === "NormalWorker") {
            const action = Phaser.Math.RND.pick(["walk", "run"]);
            const flipX = Phaser.Math.RND.between(0, 1) === 1;

            const xWorker =
              object.x + (this.map.widthInPixels - 32 * 4.6) * this.lv;
            const yWorker = object.y;
            const worker = new NormalWorker(scene, action, xWorker, yWorker);
            worker.setFlipX(flipX);

            scene.physics.add.collider(worker, this.getGround());
            scene.physics.add.collider(player.getBullets(), worker, () => {
              worker.handleCollide();
            });

            workerGroup.add(worker);
            scene.add.existing(worker);
          }
        });
      }
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
  public update(
    player: Player,
    scene: Scene,
    coinManager: CoinManager,
    obstacleGroup: Phaser.GameObjects.Group,
    workerGroup: Phaser.GameObjects.Group
  ): void {
    if (
      this.map &&
      player.x >= ((this.map.widthInPixels - 32 * 4.55) * (2 * this.lv + 1)) / 2
    ) {
      this.lv++;
      let ran = Math.floor(Math.random() * 3); //0-2
      if (this.lv % 2 === 0) {
        this.generateMap(
          this.mapName[0],
          scene,
          player,
          0,
          coinManager,
          obstacleGroup,
          workerGroup
        );
      } else {
        this.setLayer(ran);
        this.generateMap(
          this.mapName[ran + 1],
          scene,
          player,
          0,
          coinManager,
          obstacleGroup,
          workerGroup
        );
      }
      if (this.ground) {
        scene.physics.add.collider(player, this.ground);
      }
    }
    this.updateLayer(player);
  }
}
