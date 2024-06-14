class Bullet extends Phaser.Physics.Arcade.Image {
  declare body: Phaser.Physics.Arcade.Body;

  public fire(x: number, y: number, vx: number, vy: number, angle: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocity(vx, vy);

    this.rotation = Math.PI / 2 - angle;
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

  public fire(x: number, y: number, vx: number, vy: number, angle: number) {
    const bullet = this.getFirstDead(false);

    if (bullet) {
      bullet.fire(x, y, vx, vy, angle);
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

  public handleBulletCollideWithGround(bullet: Phaser.Physics.Arcade.Image) {
    const bulletPos = bullet.getCenter();

    const splash = this.scene.add.sprite(
      bulletPos.x,
      bulletPos.y,
      "bulletSplash"
    );
    splash.setDepth(100);
    splash.play("bulletSplash");

    bullet.disableBody(true, true);

    splash.on("animationcomplete", () => {
      splash.destroy();
    });
  }
}
