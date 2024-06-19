import { MusicManager } from "../../../manager/MusicManager";
import { Player } from "../Player";
import { BaseState } from "./BaseState";

export class DieState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(time: number, delta: number): void {
    console.log(time, delta);

    
    MusicManager.getInstance(this.player.getCurrentScene()).stopRunSound();
    MusicManager.getInstance(this.player.getCurrentScene()).stopJetpackFire();

    if (this.player.active) {
      this.player.rotation = Math.PI / 2;

      this.player.getPlayerBody().play("body-die", true);
      this.player.getPlayerHead().play("head-die", true);

      this.player.getPlayerBody().y = 0;
      this.player.getPlayerHead().y = -10;
      this.player.getPlayerBody().x = 35;
      this.player.getPlayerHead().x = 35;

      this.player.setActive(false);

      this.player.getJetpack().destroy();
      this.player.getBulletFlash().destroy();
    }
    if (this.player.body.velocity.x > 0) {
      this.player.body.velocity.x -= 2;
    }
    if (this.player.body.velocity.x <= 0) {
      this.player.body.velocity.x = 0;
      this.player.body.enable = false;
      
    }
  }
}
