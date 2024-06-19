import { MusicManager } from "../../../manager/MusicManager";
import { Player } from "../Player";
import { BaseState } from "./BaseState";
import { FallState } from "./FallState";

export class FlyState extends BaseState {
  private jetpackSoundPlaying: boolean;

  constructor(player: Player) {
    super(player);
    this.jetpackSoundPlaying = false; // Initialize the flag
  }

  public update(time: number, delta: number): void {
    console.log(time, delta);

    this.player.getBulletFlash().setVisible(true);
    this.player.getPlayerBody().play("body-fly", true);
    this.player.getPlayerHead().play("head-fly", true);
    this.player.getJetpack().play("jetpack-fly", true);
    this.player.getBulletFlash().play("bulletFlash", true);

    if (this.player.getKeys().get("FLY")?.isDown) {
      this.player.body.velocity.y = -300;

      if (!this.jetpackSoundPlaying) {
        MusicManager.getInstance(
          this.player.getCurrentScene()
        ).playJetpackFire();
        this.jetpackSoundPlaying = true;
      }

      if (this.player.getBullets()) {
        const foreBullet = 600;
        const randomAngle =
          Math.random() * (Math.PI / 4 - -Math.PI / 4) + -Math.PI / 4;

        if (this.player.y >= 500) {
          this.player
            .getBullets()
            .fire(
              this.player.x + 8,
              this.player.y + this.player.getJetpack().height,
              this.player.body.velocity.x +
                Math.tan(randomAngle) *
                  this.player.getCurrentScene().physics.world.gravity.y,
              this.player.getCurrentScene().physics.world.gravity.y +
                foreBullet,
              randomAngle / 3
            );
        } else {
          this.player
            .getBullets()
            .fire(
              this.player.x + 8,
              this.player.y +
                this.player.getJetpack().height +
                this.player.getBulletFlash().height +
                20,
              this.player.body.velocity.x +
                Math.tan(randomAngle) *
                  this.player.getCurrentScene().physics.world.gravity.y,
              this.player.getCurrentScene().physics.world.gravity.y +
                foreBullet,
              randomAngle / 3
            );
        }
      }
    }

    if (this.player.getKeys().get("FLY")?.isUp) {
      this.player.setFirstTimeFall(true);
      this.changeState(new FallState(this.player));
      this.player.getBulletFlash().anims.stop();
      this.player.getBulletFlash().setVisible(false);
      this.jetpackSoundPlaying = false;
      MusicManager.getInstance(this.player.getCurrentScene()).stopJetpackFire();
    }
  }
}
