import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FlyState } from "./FlyState";

export class RunState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    (this.player.getChildByName("body") as Phaser.GameObjects.Sprite).play(
      "body-run",
      true
    );
    (this.player.getChildByName("head") as Phaser.GameObjects.Sprite).play(
      "head-run",
      true
    );
    (this.player.getChildByName("jetpack") as Phaser.GameObjects.Sprite).play(
      "jetpack-run",
      true
    );

    if (this.player.keys.get("FLY")?.isDown) {
      this.changeState(new FlyState(this.player));
    }
  }
}
