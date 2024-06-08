import { Player } from "../Player";
import { BaseState } from "./BaseState";

export class FallState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    if (this.player.currentScene.input.keyboard?.keys[38].isDown) {
      (this.player.getByName("body") as Phaser.GameObjects.Sprite).play(
        "body-fall"
      );
      (this.player.getByName("head") as Phaser.GameObjects.Sprite).play(
        "head-fall"
      );
      (this.player.getByName("jetpack") as Phaser.GameObjects.Sprite).play(
        "jetpack-fall"
      );
      this.player.body.setVelocityY(800);
    }
  }
}