import { Bullets } from "../bullet/Bullet";
import { BaseState } from "./state/BaseState";
import { RunState } from "./state/RunState";

export class Player extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  public currentScene: Phaser.Scene;
  public currentState: BaseState;
  public keys: Map<string, Phaser.Input.Keyboard.Key>;
  public bullets: Bullets;
  public firstTimeFall: boolean = false;

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
    //set initial state and enable physics
    this.currentState = new RunState(this);
    this.currentScene.physics.world.enable(this);
    this.currentScene.add.existing(this);

    //set properties
    this.getChildByName("bulletFlash")?.setVisible(false);
    this.body.setSize(46, 48);
    this.setScale(2);
    this.getChildByName("bulletFlash")?.setScale(0.5);

    //create bullet
    this.bullets = this.currentScene.add.existing(
      new Bullets(this.currentScene.physics.world, this.currentScene, {
        name: "bullets",
      })
    );

    this.bullets.createMultiple({
      key: "bullet",
      quantity: 1000,
    });

    this.bullets.rotate(Math.PI / 2);

    //input
    this.keys = new Map([["FLY", this.addKey("SPACE")]]);
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard!.addKey(key);
  }

  public update(): void {
    this.currentState.update();
  }

  public getChildByName(name: string): Phaser.GameObjects.Sprite {
    return this.getByName(name) as Phaser.GameObjects.Sprite;
  }
}
