import { Scene, GameObjects } from "phaser";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  title: GameObjects.Text;

  constructor() {
    super("MainMenu");
  }

  create() {
    let image = this.add.image(0, 0, "background");
    image.setOrigin(0.5, 0.5); // set origin to center of image
    image.setPosition(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2
    );  


    // this.title = this.add
    //   .text(512, 460, "Main Menu", {
    //     fontFamily: "Arial Black",
    //     fontSize: 38,
    //     color: "#ffffff",
    //     stroke: "#000000",
    //     strokeThickness: 8,
    //     align: "center",
    //   })
    //   .setOrigin(0.5);

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });

    
  }
}
