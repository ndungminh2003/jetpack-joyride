import { Scene } from "phaser";
// import { Button } from "../UI/Button";

export class HUDScene extends Scene {
  // private button: Button;
  constructor() {
    super("HUDScene");
  }

  create() {
    // this.button = new Button(this, 500, 400, "btn", "NEXT", () => {});
  }

  update(time: number, delta: number): void {
    console.log(time, delta);
    // console.log(this.button);
  }
}
