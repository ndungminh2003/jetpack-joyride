import { Button } from "../UI/Button";
import { Scene } from "phaser";

export class SettingScene extends Scene {
  private button: Button;
  constructor() {
    super("SettingScene");
  }

  create() {
    this.button = new Button(this, 0, this.cameras.main.width, "btn", "NEXT", () => {
      this.scene.start("GameOverScene");
    });
  } 

  update(time: number, delta: number): void {
    console.log(time, delta);
    console.log(this.button);
  }

  
}