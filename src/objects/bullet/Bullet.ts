class Bullet extends Phaser.Physics.Arcade.Image {
  declare body: Phaser.Physics.Arcade.Body;

  public fire(x: number, y: number, vx: number, vy: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocity(vx, vy);
  }

  public onCreate() {
    this.disableBody(true, true);
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
  }

  public onWorldBounds() {
    this.disableBody(true, true);
  }
}

export class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(
    world: Phaser.Physics.Arcade.World,
    scene: Phaser.Scene,
    config: Phaser.Types.Physics.Arcade.PhysicsGroupConfig
  ) {
    super(world, scene, {
      ...config,
      classType: Bullet,
      createCallback: Bullets.prototype.onCreate,
    });
  }

  public fire(x: number, y: number, vx: number, vy: number) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, vx, vy);
    }
  }

  public onCreate(bullet: any) {
    bullet.onCreate();
  }

  poolInfo() {
    return `${this.name} total=${this.getLength()} active=${this.countActive(
      true
    )} inactive=${this.countActive(false)}`;
  }
}
