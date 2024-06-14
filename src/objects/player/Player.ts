import { Bullets } from "../bullet/Bullet";
import { BaseState } from "./state/BaseState";
import { RunState } from "./state/RunState";

export class Player extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;
  private currentScene: Phaser.Scene;
  private currentState: BaseState;
  private keys: Map<string, Phaser.Input.Keyboard.Key>;
  private bullets: Bullets;
  private firstTimeFall: boolean = false;

  private playerHead: Phaser.GameObjects.Sprite;
  private playerBody: Phaser.GameObjects.Sprite;
  private jetpack: Phaser.GameObjects.Sprite;
  private bulletFlash: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.currentScene = scene;

    this.init();
  }

  private init() {
    //init sprite to add in container
    this.playerHead = this.currentScene.add.sprite(13, 8, "player-head");
    this.playerBody = this.currentScene.add.sprite(13, 20, "player-body");
    this.jetpack = this.currentScene.add.sprite(0, 17, "jetpack");
    this.bulletFlash = this.currentScene.add.sprite(0, 47, "bulletFlash");

    this.add([
      this.playerHead,
      this.playerBody,
      this.jetpack,
      this.bulletFlash,
    ]);

    //set initial state and enable physics
    this.currentState = new RunState(this);
    this.currentScene.physics.world.enable(this);
    this.currentScene.add.existing(this);
    this.body.setImmovable(true)
    // this.body.collideWorldBounds = true

    //set properties
    this.bulletFlash.setVisible(false);
    this.body.setSize(15, 30);
    this.setScale(2);
    this.bulletFlash.setScale(0.5);
    this.body.setVelocityX(100);

    //create bullet
    this.bullets = this.currentScene.add.existing(
      new Bullets(this.currentScene.physics.world, this.currentScene, {
        name: "bullets",
      })
    );

    this.bullets.createMultiple({
      key: "bullet",
      quantity: 5,
    });

    //input
    this.keys = new Map([["FLY", this.addKey("SPACE")]]);
  }

  private addKey(key: string): Phaser.Input.Keyboard.Key {
    return this.currentScene.input.keyboard!.addKey(key);
  }

  public update(): void {
    this.currentState.update();
  }

  public setCurrentState(state: BaseState): void {
    this.currentState = state;
  }

  public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
    return this.keys;
  }

  public getBullets(): Bullets {
    return this.bullets;
  }

  public getFirstTimeFall(): boolean {
    return this.firstTimeFall;
  }

  public setFirstTimeFall(value: boolean): void {
    this.firstTimeFall = value;
  }

  public getCurrentScene(): Phaser.Scene {
    return this.currentScene;
  }

  public getPlayerBody(): Phaser.GameObjects.Sprite {
    return this.playerBody;
  }

  public getPlayerHead(): Phaser.GameObjects.Sprite {
    return this.playerHead;
  }

  public getJetpack(): Phaser.GameObjects.Sprite {
    return this.jetpack;
  }

  public getBulletFlash(): Phaser.GameObjects.Sprite {
    return this.bulletFlash;
  }
}
