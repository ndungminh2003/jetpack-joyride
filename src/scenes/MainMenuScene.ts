import { Scene, GameObjects } from "phaser";

export class MainMenuScene extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super("MainMenuScene");
  }

  create() {
    let image = this.add.image(0, 0, "background");
    image.setOrigin(0.5, 0.5);
    image.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );

    this.input.once("pointerdown", () => {
      this.scene.start("GameScene");
      this.scene.start("HUDScene");
      this.scene.bringToTop("HUDScene");
    });
  }
}
