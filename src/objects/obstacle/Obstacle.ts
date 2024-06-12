export abstract class Obstacle extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public currentScene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.currentScene = scene;

    this.init();
  }

  protected init(): void {
    this.currentScene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.scene.add.existing(this);
  }

}
