import { Scene } from "phaser";
import { Button } from "../UI/Button";


export class MainMenuScene extends Scene {
  private settingBtn: Button;
  private blinkText: Phaser.GameObjects.Text;
  private isSettingOpened: boolean = false;

  constructor() {
    super("MainMenuScene");
  }

  create() {
    // Add title images first to ensure they are in the background
    this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 100,
        "title_small"
      )
      .setOrigin(0.5);

    this.add
      .image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 - 100,
        "titleGlow_small"
      )
      .setOrigin(0.5)
      .setScale(2);

    // Add instruction text
    this.blinkText = this.add
      .text(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 150,
        "TOUCH ANYWHERE TO PLAY!",
        {
          fontSize: "32px",
          color: "#fff",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5);

    // Create the settings button
    this.settingBtn = new Button(
      this,
      this.cameras.main.width - 50,
      this.cameras.main.height / 12,
      "btnSettings",
      "",
      () => {
        this.isSettingOpened = true;
        this.scene.launch("SettingScene");
        this.scene.pause("GameScene");
      }
    );

    // Add input listener to prevent propagation
    this.settingBtn.setInteractive().on('pointerdown', (event: any) => {
      event.stopPropagation(); // Prevents the event from propagating to other scenes
    });

    console.log(this.settingBtn);

    // Run the GameScene and then pause it
    this.scene.run("GameScene");
    this.scene.pause("GameScene");
    this.scene.bringToTop("MainMenuScene");

    // Add input listener to resume GameScene on click if not settings button
    this.input.on("pointerdown", () => {
      if (!this.isSettingOpened) {
        this.scene.stop("MainMenuScene");
        this.scene.resume("GameScene");
        this.scene.start("HUDScene");
      } else {
        this.isSettingOpened = false; // Reset the flag for the next interaction
      }
    });

    // Create a tween to make the text fade in and out
    this.tweens.add({
      targets: this.blinkText,
      alpha: 0,
      duration: 1000,
      ease: 'Cubic.easeInOut',
      yoyo: true,
      repeat: -1
    });
  }
}
