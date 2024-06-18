import { Score } from "../UI/Score";

export class ScoreManager {
  private score: number;
  private scoreText: Score;

  constructor(scene: Phaser.Scene, score: number = 0) {
    this.score = score;

    this.scoreText = new Score(
      scene,
      10,
      scene.cameras.main.height / 20 ,
      "Score: 0",
      {
        fontSize: "32px",
        stroke: "#000000", // black color for the outline
        strokeThickness: 6,
      }
    );
  }

  public getScore(): number {
    return this.score;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  //write score to local storage
  public writeScoreToLocalStorage(): void {
    const bestScore = localStorage.getItem("BESTSCORE");
    if (bestScore !== null && this.score >= parseInt(bestScore)) {
      localStorage.setItem("BESTSCORE", this.score.toString());
    }
  }

  public update(time: number, delta: number): void {
    console.log(time, delta);
    this.score += 1;
    const formattedScore = this.score.toString().padStart(4, "0");
    this.scoreText.setText(`${formattedScore}M`);
  }
}
