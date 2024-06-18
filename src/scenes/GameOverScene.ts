import { Scene } from "phaser";
import { Button } from "../UI/Button";

export class GameOverScene extends Scene {
  private nextBtn: Button;

  constructor() {
    super("GameOverScene");
  }

  create() {
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.7);
    graphics.fillRect(0, 0, width, height);

    this.nextBtn = new Button(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 150,
      "btn",
      "RESTART",
      () => {
        this.scene.stop("GameScene");
        this.scene.stop("HUDScene");
        this.scene.start("MainMenuScene");
        
      }
    );

    console.log(this.nextBtn);
  }
}
