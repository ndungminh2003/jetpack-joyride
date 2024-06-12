import { Player } from "../Player";
import { BaseState } from "./BaseState";

export class DieState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    this.player.body.setVelocityY(200);

    this.player.getPlayerBody().play("body-die", true);
    this.player.getPlayerHead().play("head-die", true);
  }
}
