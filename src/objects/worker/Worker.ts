export class Worker extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public currentScene: Phaser.Scene;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    children: Phaser.GameObjects.Sprite[]
  ) {
    super(scene, x, y, children);
    this.currentScene = scene;
    this.add(children);

    this.init();
  }

  private init() {
    this.currentScene.physics.world.enable(this);
    this.currentScene.add.existing(this);

    this.body.setSize(46, 48);
    this.setScale(2);
  }

  public getChildByName(name: string): Phaser.GameObjects.Sprite {
    return this.getByName(name) as Phaser.GameObjects.Sprite;
  }
}
