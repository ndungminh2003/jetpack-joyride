import { Scene } from "phaser";
import { Button } from "../UI/Button";

export class HUDScene extends Scene {
  private button: Button;
  constructor() {
    super("HUDScene");
  }

  create() {
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
  }

  update(time: number, delta: number): void {
    console.log(time, delta);
    console.log(this.button);
  }
}
