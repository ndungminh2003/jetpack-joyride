import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FallState } from "./FallState";

export class FlyState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {

    if (this.player.currentScene.input.keyboard?.keys[38].isDown) {
      (this.player.getByName("body") as Phaser.GameObjects.Sprite).play(
        "body-fly"
      );
      (this.player.getByName("head") as Phaser.GameObjects.Sprite).play(
        "head-fly"
      );
      (this.player.getByName("jetpack") as Phaser.GameObjects.Sprite).play(
        "jetpack-fly"
      );
      this.player.body.setVelocityY(-800);
    }

    if (this.player.currentScene.input.keyboard?.keys[38].isUp) {
      this.changeState(new FallState(this.player));
    }
  }
}
