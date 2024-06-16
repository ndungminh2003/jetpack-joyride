export abstract class BaseWorker extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  protected workerHead: Phaser.GameObjects.Sprite;
  protected workerBody: Phaser.GameObjects.Sprite;

  
  protected action: string;

  constructor(scene: Phaser.Scene, action: string) {
    super(scene);
    this.action = action;
    this.init();
  }

  protected init() {
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.body.setImmovable(true);
    this.setDepth(Infinity);
    this.setScale(1.5);
  }


  protected abstract playAction(action: string): void;

  public handleCollide(): void {
    this.rotation = Math.PI / 2;
    this.setActive(false);
    
    this.body.setVelocityX(0);

    this.scene.tweens.add({
      targets: this,
      y: this.y - 50,
      duration: 500,
      ease: "Power1",
      yoyo: true,
      repeat: 0,
    });
  }

  public abstract update() : void

}
