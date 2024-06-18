import { Button } from "../UI/Button";

export class PauseScene extends Phaser.Scene {
  private homeBtn: Button;
  private resumeBtn: Button;
  private pauseText: Phaser.GameObjects.Text;

  constructor() {
    super("PauseScene");
  }

  create() {
    // Create a semi-transparent overlay
    const { width, height } = this.cameras.main;
    const graphics = this.add.graphics();

    graphics.fillStyle(0x000000, 0.7);
    graphics.fillRect(0, 0, width, height);

    // Create Text Pause
    this.pauseText = this.add.text(width / 2, height / 2 - 100, "PAUSE", {
      fontSize: "48px",
      color: "#fff",
      fontStyle: "bold",
    });
    this.pauseText.setOrigin(0.5);

    // Create Home Button
    this.homeBtn = new Button(
      this,
      width / 2,
      height / 2,
      "btn",
      "HOME",
      () => {
        this.scene.stop("GameScene");
        this.scene.stop("HUDScene");
        this.scene.start("MainMenuScene");
      }
    );

    // Create Resume Button
    this.resumeBtn = new Button(
      this,
      width / 2,
      height / 2 + 100,
      "btn",
      "RESUME",
      () => {
        this.scene.resume("HUDScene");
        this.scene.resume("GameScene");
        this.scene.stop("PauseScene");
      }
    );

    console.log(this.homeBtn);
    console.log(this.resumeBtn);
  }
}
