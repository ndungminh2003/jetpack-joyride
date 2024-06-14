export abstract class BaseWorker extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  protected currentScene: Phaser.Scene;
  protected workerHead: Phaser.GameObjects.Sprite;
  protected workerBody: Phaser.GameObjects.Sprite;
  protected action: string;

  constructor(scene: Phaser.Scene, action: string) {
    super(scene);
    this.currentScene = scene;
    this.action = action;
    this.init();
  }

  protected init() {
    this.currentScene.physics.world.enable(this);
    this.currentScene.add.existing(this);
    this.setDepth(100);
    this.setScale(1.5);
  }

  protected abstract playAction(action: string): void

  // abstract clone(scene : Phaser.Scene, x : number, y: number) : BaseWorker
}
