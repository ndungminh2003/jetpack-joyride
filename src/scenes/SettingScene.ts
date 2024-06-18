import { Button } from "../UI/Button";
import { Scene } from "phaser";

export class SettingScene extends Scene {
  private btnCross: Button;
  private btnMusic: Button;
  private btnSfx: Button;
  private btnLanguage: Button;
  private btnCredits: Button;

  constructor() {
    super("SettingScene");
  }

  create() {

    const { width, height } = this.cameras.main;

    this.add.image(width / 2, height / 2, "itemsBtn").setOrigin(0.5).setScale(3);
    this.add.text(width / 2, height / 3, "SETTINGS", {
      fontSize: "24px", 
      color: "#FFFFFF", 
      fontStyle: "bold", 
      stroke: "#000000", 
      strokeThickness: 3, 
      align: "center", 
    }).setOrigin(0.5);


    this.btnCross = new Button(
      this,
      width / 1.65,
      height / 3,
      "btnCross",
      "",
      () => {
        this.scene.start("MainMenuScene");
      }
    );

    this.add.text(width / 2, height / 3 + 50, "AUDIO", {
      fontSize: "24px", 
      color: "#FFFFFF", 
      fontStyle: "bold", 
      stroke: "#000000", 
      strokeThickness: 3, 
      align: "center", 
    }).setOrigin(0.5);

    this.btnMusic = new Button(
      this,
      width / 2 - 30,
      height / 3 + 100,
      "btnMusic",
      "",
      () => {
        console.log("Music");
      }
    );

    this.btnSfx = new Button(
      this,
      width / 2 + 30,
      height / 3 + 100,
      "btnSfx",
      "",
      () => {
        console.log("Sfx");
      }
    );

    this.btnLanguage = new Button(
      this,
      width / 2,
      height / 3 + 160,
      "btn",
      "LANGUAGE",
      () => {
        console.log("Language");
      }
    );

    this.btnCredits = new Button(
      this,
      width / 2,
      height / 3 + 230,
      "btn",
      "CREDITS",
      () => {
        console.log("Credits");
      }
    );

    console.log(this.btnCross);
    console.log(this.btnMusic);
    console.log(this.btnSfx);
    console.log(this.btnLanguage);
    console.log(this.btnCredits);


  }
}
