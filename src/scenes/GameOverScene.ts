import { Scene } from "phaser";
import { Button } from "../UI/Button";

export class GameOverScene extends Scene {
  private nextBtn: Button;
  private score: any;

  constructor() {
    super("GameOverScene");
  }

  init(data: any){
    this.score = data.score;
  }

  create() {
  
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.7);
    graphics.fillRect(0, 0, width, height);

    this.add
      .image(width / 2, height / 2, "itemsBtn")
      .setOrigin(0.5)
      .setScale(3);

    this.add
      .text(width / 2, height / 3, "YOU FLEW", {
        fontSize: "24px",
        color: "#FFFFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
        align: "center",
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height / 2, `${this.score}M`, {
        fontSize: "24px",
        color: "#FFFFFF",
        fontStyle: "bold",
        stroke: "#000000",
        strokeThickness: 3,
        align: "center",
      })
      .setOrigin(0.5);

    this.nextBtn = new Button(
      this,
      this.cameras.main.width / 2,
      this.cameras.main.height / 2 + 100,
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
