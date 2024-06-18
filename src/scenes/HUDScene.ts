import { Scene } from "phaser";
import { Button } from "../UI/Button";
import { ScoreManager } from "../manager/ScoreManager";

export class HUDScene extends Scene {
  private button: Button;
  private scoreManager: ScoreManager;

  constructor() {
    super("HUDScene");
  }

  create() {

    this.scoreManager = new ScoreManager(this, 0);

    this.button = new Button(
      this,
      this.cameras.main.width - 50,
      this.cameras.main.height / 12,
      "btnPause",
      "",
      () => {
        this.scene.launch("PauseScene");
        this.scene.pause("HUDScene");
        this.scene.pause("GameScene");
      }
    );
    console.log(this.button);
  }

  update(time: number, delta: number): void {

    this.scoreManager.update(time, delta);
  }
}
