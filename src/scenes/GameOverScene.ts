import { Scene } from "phaser";

export class GameOverScene extends Scene {
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.Image;
  gameover_text: Phaser.GameObjects.Text;

  constructor() {
    super("GameOverScene");
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0xff0000);

    this.gameover_text = this.add.text(512, 384, "Game Over", {
      fontFamily: "Arial Black",
      fontSize: 64,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    });
    this.gameover_text.setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("MainMenuScene");
    });
  }
}