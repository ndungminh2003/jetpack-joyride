import { MusicManager } from "../../../manager/MusicManager";
import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FlyState } from "./FlyState";

export class RunState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(time: number, delta: number): void {
    console.log(time, delta);
    this.player.getPlayerBody().play("body-run", true);
    this.player.getPlayerHead().play("head-run", true);
    this.player.getJetpack().play("jetpack-run", true);

    MusicManager.getInstance(this.player.getCurrentScene()).playRunSound();

    console.log(this.player.getIsFlying())

    if ( this.player.getIsFlying()) {
      MusicManager.getInstance(this.player.getCurrentScene()).stopRunSound();
      this.changeState(new FlyState(this.player));
    }
  }
}
