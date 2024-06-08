import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FallState } from "./FallState";

export class FlyState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    this.player.body.setVelocityY(-200);
    (this.player.getChildByName("body") as Phaser.GameObjects.Sprite).play(
      "body-fly", true
    );
    (this.player.getChildByName("head") as Phaser.GameObjects.Sprite).play(
      "head-fly", true
    );
    (this.player.getChildByName("jetpack") as Phaser.GameObjects.Sprite).play(
      "jetpack-fly", true
    );
    if (this.player.keys.get("JUMP")?.isUp) {
      this.changeState(new FallState(this.player));
    }
  }
}
