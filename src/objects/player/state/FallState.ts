import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FlyState } from "./FlyState";
import { RunState } from "./RunState";

export class FallState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    if (this.player.firstTimeFall) {
      this.player.body.setVelocityY(200);
      (this.player.getChildByName("body") as Phaser.GameObjects.Sprite).play(
        "body-fall",
        true
      );
      (this.player.getChildByName("head") as Phaser.GameObjects.Sprite).play(
        "head-fall",
        true
      );
      (this.player.getChildByName("jetpack") as Phaser.GameObjects.Sprite).play(
        "jetpack-fall",
        true
      );
      this.player.firstTimeFall = false;
    }

    if (this.player.keys.get("FLY")?.isDown) {
      this.changeState(new FlyState(this.player));
    }
    if (this.player.body.blocked.down) {
      this.changeState(new RunState(this.player));
    }
  }
}
