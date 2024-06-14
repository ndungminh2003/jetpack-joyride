import { Scene } from "phaser";
import { Player } from "../objects/player/Player";

export class MapGenerator {
  private static instance: MapGenerator;
  private lv: number = 0;
  private map: Phaser.Tilemaps.Tilemap;
  private map1: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private ground: Phaser.Tilemaps.TilemapLayer;
  private mapName: string[] = ["Hallway", "Forest", "Cave", "Aqua"];
  private layers: { sprite: Phaser.GameObjects.TileSprite }[] = [];

  constructor() {}

  public static getInstance(): MapGenerator {
    if (!this.instance) {
      return new MapGenerator();
    }
    return this.instance;
  }

  public generateMap(maptype: string, scene: Scene, player: Player): void {
    let map = scene.make.tilemap({
      key: maptype,
      tileWidth: 32,
      tileHeight: 32,
    });
    this.tileset = map.addTilesetImage(
      maptype,
      maptype + "_tileset"
    ) as Phaser.Tilemaps.Tileset;
    if (this.tileset) {
      map
        .createLayer("Layer", this.tileset, map.widthInPixels * this.lv, 0)
        ?.setDepth(99);
      this.ground = map.createLayer(
        "Ground",
        this.tileset,
        map.widthInPixels * this.lv - 1,
        0
      )!;
      if (this.ground) {
        this.ground.setCollisionByExclusion([-1]);
        scene.physics.add.collider(
          player.getBullets(),
          mapGenerator.getGround(),
          (bullet, _) => {
            player
              .getBullets()
              .handleBulletCollideWithGround(
                bullet as Phaser.Physics.Arcade.Image
              );
          }
        );
      }
    }
    if (this.lv % 2 == 0) {
      this.map = map;
    } else {
      this.map1 = map;
    }
  }
  public parallex(scene: Scene): void {
    for (let i = 3; i > 0; i--) {
      this.layers.push({
        sprite: scene.add
          .tileSprite(
            -40,
            -20,
            this.map!.widthInPixels,
            this.map!.heightInPixels,
            "Forest" + i
          )
          .setOrigin(0, 0)
          .setScrollFactor(0, 0),
      });
    }
    this.layers.push({
      sprite: scene.add
        .tileSprite(
          -40,
          -20,
          this.map!.widthInPixels,
          this.map!.heightInPixels,
          "Cave1"
        )
        .setOrigin(0, 0)
        .setScrollFactor(0, 0),
    });
  }

  //      lv1c    lv2     lv3c
  // lv0  0.5  1  1.5  2  2.5  3
  public update(player: Player, scene: Scene): void {
    if (
      this.map &&
      player.x >= (this.map.widthInPixels * (2 * this.lv + 1)) / 2
    ) {
      this.lv++;
      let ran = Math.floor(Math.random() * 2); //0-1
      if (this.lv % 2 === 0) {
        this.generateMap(this.mapName[0], scene, player);
      } else {
        this.generateMap(this.mapName[ran + 1], scene, player);

        if (ran == 0) {
          for (let i = 0; i < 3; i++) {
            this.layers[i].sprite.setDepth(10 + i);
            this.layers[3].sprite.setDepth(9);
          }
        } else {
          for (let i = 0; i < 3; i++) {
            this.layers[i].sprite.setDepth(0);
            this.layers[3].sprite.setDepth(15);
          }
        }
      }

      if (this.ground) {
        scene.physics.add.collider(player, this.ground);
      }
    }
    {
      for (let i = 0; i < this.layers.length - 1; ++i) {
        const bg = this.layers[i];
        bg.sprite.tilePositionX += 2 + 1 * i;
      }
      this.layers[3].sprite.tilePositionX += 2 + 1 * 3;
    }
  }

  public getMap(): Phaser.Tilemaps.Tilemap {
    return this.map;
  }

  public getMap1(): Phaser.Tilemaps.Tilemap {
    return this.map1;
  }

  public getGround(): Phaser.Tilemaps.TilemapLayer {
    return this.ground;
  }

  public incrementLevel(): void {
    this.lv++;
  }

  public getLevel(): number {
    return this.lv;
  }

  public getMapName(index: number): string {
    return this.mapName[index];
  }
}

export const mapGenerator = MapGenerator.getInstance();
