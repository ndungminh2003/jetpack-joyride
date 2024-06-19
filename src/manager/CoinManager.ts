import { Score } from "../UI/Score";

export class CoinManager {
  private coin: number;
  private coinText: Score;
  private totalTextCoin: Score;

  constructor(scene: Phaser.Scene, coin: number = 0) {
    this.coin = coin;

    this.coinText = new Score(
      scene,
      10 + 40,
      scene.cameras.main.height / 20 + 60,
      "0",
      {
        fontSize: "32px",
        stroke: "#000000", // black color for the outline
        strokeThickness: 6,
      }
    ).setDepth(Infinity);

    scene.add
      .image(30, scene.cameras.main.height / 20 + 78, "coin")
      .setDepth(Infinity)
      .setScrollFactor(0);

    // Initialize best score in localStorage if not already set
    if (localStorage.getItem("TOTALCOINS") === null) {
      localStorage.setItem("TOTALCOINS", "0");
    }
  }

  public getCoin(): number {
    return this.coin;
  }

  public addCoin(): void {
    this.coin += 1;
  }

  // Write score to local storage if it's higher than the current best score
  public writeCoinToLocalStorage(): void {
    const currentTotalCoins = localStorage.getItem("TOTALCOINS");
    // add the current coin to the total coins
    const totalCoins = parseInt(currentTotalCoins ?? "0") + this.coin;
    localStorage.setItem("TOTALCOINS", totalCoins.toString());
  }

  public update(time: number, delta: number): void {
    console.log(time, delta);
    this.coinText.setText(this.coin.toString());

    console.log(this.totalTextCoin);
  }
}
