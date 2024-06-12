import { Obstacle } from "../Obstacle";

export class Missile extends Obstacle {
  
  private missileSmog: Phaser.GameObjects.Sprite;
  private missileHead: Phaser.GameObjects.Sprite;
  private missileTall: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.init();
  }

  override init(): void {
    super.init();

    this.missileSmog = this.scene.add
      .sprite(12, 16, "missileEffect")
      .setName("missileSmog");

    this.missileHead = this.scene.add
      .sprite(16, 16, "missile")
      .setName("missile");

    this.missileTall = this.scene.add
      .sprite(48, 16, "missileEffect")
      .setName("missileTall");

    // Play the animations
    this.missileSmog.play("missile-smog-Effect", true);
    this.missileHead.play("missile-head-Effect", true);
    this.missileTall.play("missile-tall-Effect", true);

    // Add the sprites to the group
    this.add([this.missileSmog, this.missileHead, this.missileTall]);

    this.body.setSize(32, 32);
    this.setScale(1.5);

    this.body.setVelocityX(-300);
  }
}
