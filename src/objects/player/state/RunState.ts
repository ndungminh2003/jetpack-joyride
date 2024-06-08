import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FlyState } from "./FlyState";

export class RunState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    if (this.player.currentScene.input.keyboard?.keys[38].isDown) {
      (this.player.getByName("body") as Phaser.GameObjects.Sprite).play(
        "body-run"
      );
      (this.player.getByName("head") as Phaser.GameObjects.Sprite).play(
        "head-run"
      );
      (this.player.getByName("jetpack") as Phaser.GameObjects.Sprite).play(
        "jetpack-run"
      );
    } else if (this.player.currentScene.input.keyboard?.keys[38].isUp) {
      this.changeState(new FlyState(this.player));
    }
  }
}
