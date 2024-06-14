
import { Player } from "../Player";
import { BaseState } from "./BaseState";

export class DieState extends BaseState {


  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    if(this.player.active){
      this.player.rotation = Math.PI / 2;
      this.player.getPlayerBody().play("body-die", true);
      this.player.getPlayerHead().play("head-die", true);
      this.player.setActive(false); 
      
      this.player.body.setVelocityX(0); 
      
      this.player.getJetpack().destroy();
      this.player.getBulletFlash().destroy();
  }

  }
}
