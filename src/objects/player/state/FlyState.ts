import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FallState } from "./FallState";

export class FlyState extends BaseState {
  constructor(player: Player) {
    super(player);
  }

  public update(): void {
    
    this.player.body.setVelocityY(-200);
    this.player.getBulletFlash().setVisible(true);
    this.player.getPlayerBody().play("body-fly", true);
    this.player.getPlayerHead().play("head-fly", true);
    this.player.getJetpack().play("jetpack-fly", true);

    if (this.player.getKeys().get("FLY")?.isDown) {
      this.player.getBulletFlash().play("bulletFlash", true);

      if (this.player.getBullets()) {
        const foreBullet = 600;
        const randomAngle =
          Math.random() * (Math.PI / 4 - -Math.PI / 4) + -Math.PI / 4;

        this.player
          .getBullets()
          .fire(
            this.player.x,
            this.player.y +
              this.player.getJetpack().height +
              +this.player.getBulletFlash().height +
              +20,
            this.player.body.velocity.x +
              Math.tan(randomAngle) *
                this.player.getCurrentScene().physics.world.gravity.y,
            this.player.getCurrentScene().physics.world.gravity.y + foreBullet,
            randomAngle / 3
          );
      }
    }

    if (this.player.getKeys().get("FLY")?.isUp) {
      this.player.setFirstTimeFall(true);
      this.changeState(new FallState(this.player));
      this.player.getBulletFlash().anims.stop();
      this.player.getBulletFlash().setVisible(false);
    }
  }
}
