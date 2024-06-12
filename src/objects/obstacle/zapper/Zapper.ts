import { Obstacle } from "../Obstacle";

export class Zapper extends Obstacle {

  private shape1: Phaser.GameObjects.Rectangle;
  
  private zapper: Phaser.GameObjects.TileSprite;
  private zapGlowLeft: Phaser.GameObjects.Sprite;
  private zapGlowRight: Phaser.GameObjects.Sprite;
  private zapOrAnimLeft: Phaser.GameObjects.Sprite;
  private zapOrAnimRight: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.init();
  }

  override init(): void {
    super.init();

    this.shape1 = this.scene.add.rectangle(0, 0, 1024, 117);

    this.zapper = this.scene.add.tileSprite(512, 54, 1024, 117, "zapper1");
    this.zapGlowLeft = this.scene.add.sprite(0, 54, "zapperGlow").setScale(1.5);
    this.zapGlowRight = this.scene.add
      .sprite(1024, 54, "zapperGlow")
      .setScale(1.5);
    this.zapOrAnimLeft = this.scene.add
      .sprite(0, 54, "zapperOrAnim")
      .setScale(1.5);
    this.zapOrAnimRight = this.scene.add
      .sprite(1024, 54, "zapperOrAnim")
      .setScale(1.5);

    this.zapOrAnimLeft.rotation = Math.PI / 2;
    this.zapOrAnimRight.rotation = -Math.PI / 2;

    //play animation
    this.zapGlowLeft.play("zapGlowEffect");
    this.zapGlowRight.play("zapGlowEffect");
    this.zapOrAnimLeft.play("zapOrAnimEffect");
    this.zapOrAnimRight.play("zapOrAnimEffect");

    // Add the sprites to the group
    this.add([
      this.zapper,
      this.zapGlowLeft,
      this.zapGlowRight,
      this.zapOrAnimLeft,
      this.zapOrAnimRight,
      this.shape1,
    ]);

    this.setScale(0.5);
  }

  public loopZapper(): void {
    this.zapper.tilePositionX += 10;
  }
}
