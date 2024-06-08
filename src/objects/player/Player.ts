import { BaseState } from "./state/BaseState";
import { RunState } from "./state/RunState";

export class Player extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public currentScene: Phaser.Scene;
  public currentState: BaseState;
  public keys: Map<string, Phaser.Input.Keyboard.Key>;

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

    this.getChildByName("body")?.play("body-run");
    this.getChildByName("head")?.play("head-run");
    this.getChildByName("jetpack")?.play("jetpack-run");

    //input
    this.keys = new Map([["JUMP", this.addKey("SPACE")]]);

    this.currentScene.add.existing(this);
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard!.addKey(key);
  }

  public update(): void {
    this.currentState.update();
  }

  public getChildByName(name: string): Phaser.GameObjects.Sprite | undefined {
    return this.getByName(name) as Phaser.GameObjects.Sprite | undefined;
  }
}
