import { Player } from "../../player/Player";
import { Obstacle } from "../Obstacle";

export class Missile extends Obstacle {
  private missileAlert: Phaser.GameObjects.Sprite;
  private missileSmog: Phaser.GameObjects.Sprite;
  private missileHead: Phaser.GameObjects.Sprite;
  private missileTall: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    playerVelocityX: number
  ) {
    super(scene, x, y);

    this.body.setVelocityX(playerVelocityX);
    this.warning(x, y, playerVelocityX);
  }

  private warning(x: number, y: number, playerVelocityX: number): void {
    this.missileAlert = this.scene.physics.add.sprite(x, y, "missileAlert");
    (this.missileAlert.body as Phaser.Physics.Arcade.Body)
      .setVelocityX(playerVelocityX)
      .setAllowGravity(false);
    this.scene.add.existing(this.missileAlert);

    this.missileAlert.play("missileAllertEffect1", true);

    this.missileAlert.on("animationcomplete-missileAllertEffect1", () => {
      this.missileAlert.play("missileAllertEffect2", true);

      this.missileAlert.on("animationcomplete-missileAllertEffect2", () => {
        this.missileAlert.destroy();
        this.fireMissile();
      });
    });
  }

  private fireMissile(): void {
    this.missileSmog = this.scene.add
      .sprite(12, 16, "missileEffect")
      .setName("missileSmog");

    this.missileHead = this.scene.add
      .sprite(16, 16, "missile")
      .setName("missile");

    this.missileTall = this.scene.add
      .sprite(48, 16, "missileEffect")
      .setName("missileTall");

    this.missileSmog.play("missile-smog-Effect", true);
    this.missileHead.play("missile-head-Effect", true);
    this.missileTall.play("missile-tall-Effect", true);

    this.add([this.missileSmog, this.missileHead, this.missileTall]);

    this.body.setSize(32, 32);
    this.setScale(1.5);

    this.body.setVelocityX(-300);
  }

  public handleCollide(player : Player): void {
    console.log(player);
  }
}
