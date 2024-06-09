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
      "body-fly",
      true
    );
    (this.player.getChildByName("head") as Phaser.GameObjects.Sprite).play(
      "head-fly",
      true
    );
    (this.player.getChildByName("jetpack") as Phaser.GameObjects.Sprite).play(
      "jetpack-fly",
      true
    );

    if (this.player.keys.get("FLY")?.isDown) {
      (
        this.player.getChildByName("bulletFlash") as Phaser.GameObjects.Sprite
      ).play("bulletFlash", true);

      if (this.player.bullets) {
        const randomAngle = Phaser.Math.Between(80, 100); // Generate a random angle between -20 and 20 degrees
        const angleInRadians = Phaser.Math.DegToRad(randomAngle); // Convert the angle to radians

        const speed = 500;
        const velocityX = speed * Math.cos(angleInRadians);
        const velocityY = speed * Math.sin(angleInRadians);

        this.player.bullets.fire(
          this.player.x - 10,
          this.player.y +
            this.player.getChildByName("jetpack")?.height! +
            this.player.getChildByName("bulletFlash")?.height! / 2,
          velocityX,
          velocityY
        );
      }
    }

    this.player.getChildByName("bulletFlash")?.setVisible(true);

    if (this.player.keys.get("FLY")?.isUp) {
      this.player.firstTimeFall = true
      this.changeState(new FallState(this.player));
      this.player.getChildByName("bulletFlash")?.anims.stop();
      this.player.getChildByName("bulletFlash")?.setVisible(false);
      
    }
  }
}
