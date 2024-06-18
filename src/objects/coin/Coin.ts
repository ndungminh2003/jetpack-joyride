import { GameObjects } from "phaser";

class Coin extends GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;
  private key: string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string) {
    super(scene, x, y, key);
    this.key = key;
    scene.physics.world.enable(this); // Enable physics for this sprite
    scene.add.existing(this); // Add the sprite to the scene
    this.body.setAllowGravity(false); // Now you can access this.body safely

    console.log(this.key)
  }
}

export class Coins extends GameObjects.Container {
  private container: Coin[];
  private patternIndex: number;

  constructor(scene: Phaser.Scene, x: number, y: number, patternIndex: number) {
    super(scene, x, y);
    this.patternIndex = patternIndex;
    this.container = []; // Initialize the container array
  }

  public spawnCoins(): void {
    let pattern = this.scene.cache.text.get("coin" + this.patternIndex);
    const rows = pattern.trim().split("\n");

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex].trim();
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];
        if (cell === "1") {
          const x = this.x + colIndex * 16; // Adjust x position as needed
          const y = this.y + rowIndex * 16; // Adjust y position as needed
          let coin = new Coin(this.scene, x, y, "coin");
          this.add(coin);
          this.container.push(coin);
        }
      }
    }
  }

  public getCoinAt(index: number): Coin {
    return this.container[index];
  }

  public getLength(): number {
    return this.container.length;
  }

  public coinCollect(coin: Coin): void {
    const pos = coin.getCenter();

    const splash = this.scene.add.sprite(pos.x, pos.y, "coinCollect");
    splash.setDepth(Infinity);
    splash.play("coinCollect");

    splash.on("animationcomplete", () => {
      splash.destroy();
    });
  }
}
