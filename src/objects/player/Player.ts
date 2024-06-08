import { BaseState } from "./state/BaseState";
import { RunState } from "./state/RunState";

export class Player extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public currentScene: Phaser.Scene;
  public currentState: BaseState; 

  

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    children: Phaser.GameObjects.Sprite[]
  ) {
    super(scene, x, y, children);
    this.currentScene = scene;
    this.add(children);

    this.currentState = new RunState(this);
    this.init();
  }

  private init() {
    this.currentScene.physics.world.enable(this);

    this.body.setSize(46, 48);
    this.setScale(2);

    (this.getByName("body") as Phaser.GameObjects.Sprite).play("body-run");
    (this.getByName("head") as Phaser.GameObjects.Sprite).play("head-run");
    (this.getByName("jetpack") as Phaser.GameObjects.Sprite).play(
      "jetpack-run"
    );

    // this.body.setCollideWorldBounds(true);
    

    this.currentScene.add.existing(this);
  }

  public update(): void {
    this.currentState.update();
  }
}
