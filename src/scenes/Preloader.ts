import { Scene } from "phaser";
import { AnimationHelper } from "../helpers/animation-helper";

export class Preloader extends Scene {
  // graphics

  public animationHelper: AnimationHelper;

  private loadingBar: Phaser.GameObjects.Graphics;
  private progressBar: Phaser.GameObjects.Graphics;

  constructor() {
    super("Preloader");
  }

  init() {
    //  load the background image from boot scene
    this.add.image(512, 384, "background");
    // this.cameras.main.setZoom(window.innerWidth / 1365);
  }

  preload() {
    this.createLoadingGraphics();

    // pass value to change the loading bar fill
    this.load.on(
      "progress",
      (value: number) => {
        this.progressBar.clear();
        this.progressBar.fillStyle(0x88e453, 1);
        this.progressBar.fillRect(
          window.innerWidth / 4,
          window.innerHeight - 50,
          (this.cameras.main.width / 2) * value,
          16
        );
      },
      this
    );

    this.load.on(
      "complete",
      () => {
        this.animationHelper = new AnimationHelper(
          this,
          this.cache.json.get("animationJSON")
        );
      },
      this
    );

    this.load.pack("preload", "assets/pack.json", "preload");
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.
    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("MainMenu");
  }

  private createLoadingGraphics(): void {
    this.loadingBar = this.add.graphics();
    this.loadingBar.fillStyle(0xffffff, 1);
    this.loadingBar.fillRect(
      window.innerWidth / 4,
      window.innerHeight - 50,
      this.cameras.main.width / 2 + 4,
      20
    );
    this.progressBar = this.add.graphics();
  }
}
