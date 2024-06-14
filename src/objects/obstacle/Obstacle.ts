import { Player } from "../player/Player";

export abstract class Obstacle extends Phaser.GameObjects.Container {
  declare body: Phaser.Physics.Arcade.Body;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    this.init();
  }

  protected init(): void {
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.scene.add.existing(this);
  }

  abstract addCollide(player: Player): void;

  
}
