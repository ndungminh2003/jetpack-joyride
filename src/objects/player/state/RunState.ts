import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FlyState } from "./FlyState";

export class RunState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    this.player.getPlayerBody().play("body-run", true);
    this.player.getPlayerHead().play("head-run", true);
    this.player.getJetpack().play("jetpack-run", true);

    if (this.player.getKeys().get("FLY")?.isDown) {
      this.changeState(new FlyState(this.player));
    }
  }
}
