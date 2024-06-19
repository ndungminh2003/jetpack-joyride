import { CoinManager } from "../../manager/CoinManager";
import { Player } from "../player/Player";

export class Coins extends Phaser.GameObjects.Container {
  private coins: Phaser.GameObjects.Sprite[];
  private patternIndex: number;

  constructor(scene: Phaser.Scene, x: number, y: number, patternIndex: number) {
    super(scene, x, y);
    this.patternIndex = patternIndex;
    this.setDepth(Infinity);
    this.coins = [];
    this.init();
  }

  init(): void {
    this.scene.physics.world.enable(this);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = false;
    this.scene.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).setImmovable(true);

    this.spawnCoins();
    this.add(this.coins);
  }

  public spawnCoins(): void {
    let pattern = this.scene.cache.text.get("coin" + this.patternIndex);
    const rows = pattern.trim().split("\n");

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex].trim();
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        const cell = row[colIndex];
        if (cell === "1") {
          const x = this.x + colIndex * 32;
          const y = this.y + rowIndex * 32;
          let coin = this.scene.add.sprite(x, y, "coin");
          this.scene.physics.add.existing(coin);
          coin.setDepth(10000);
          (coin.body as Phaser.Physics.Arcade.Body)
            .setAllowGravity(false)
            .setImmovable(true);
          this.coins.push(coin);
        }
      }
    }
  }

  public addCollide(player: Player, coinManager: CoinManager): void {
    this.coins.forEach((coin) => {
      this.scene.physics.add.collider(player, coin, () => {
        this.handlePlayerCollideWithCoin(coin, coinManager);
      });
    });
  }

  public handlePlayerCollideWithCoin(
    coin: Phaser.GameObjects.GameObject,
    coinManager: CoinManager
  ): void {
    if (coin instanceof Phaser.GameObjects.Sprite) {
      const coinPos = coin.getCenter();

      console.log("Coin collected at: ", coinPos.x, coinPos.y);
      const coinAnim = this.scene.add.sprite(
        coinPos.x,
        coinPos.y,
        "coinCollect"
      );
      coinAnim.setDepth(Infinity);
      coinAnim.play("coinCollectAnim");
      coinManager.addCoin();

      coin.destroy();

      coinAnim.on("animationcomplete", () => {
        coinAnim.destroy();
      });
    } else {
      console.error("Collision object is not a Sprite:", coin);
    }
  }
}
