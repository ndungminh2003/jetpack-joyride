import { MusicManager } from "../../../manager/MusicManager";
import { Player } from "../../player/Player";
import { DieState } from "../../player/state/DieState";
import { Obstacle } from "../Obstacle";

export class Missile extends Obstacle {
  private missileAlert: Phaser.GameObjects.Sprite;
  private missileSmog: Phaser.GameObjects.Sprite;
  private missileHead: Phaser.GameObjects.Sprite;
  private missileTall: Phaser.GameObjects.Sprite;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    playerVelocityX: number
  ) {
    super(scene, x, y);
    this.init();
    this.body.setVelocityX(playerVelocityX);
    this.warning(x, y, playerVelocityX);
  }

  private warning(x: number, y: number, playerVelocityX: number): void {
    MusicManager.getInstance(this.scene).playMissileWarning();
    
    this.missileAlert = this.scene.physics.add.sprite(x, y, "missileAlert");
    (this.missileAlert.body as Phaser.Physics.Arcade.Body)
      .setVelocityX(playerVelocityX)
      .setAllowGravity(false);
    this.scene.add.existing(this.missileAlert);
    this.missileAlert.setDepth(Infinity);

    this.missileAlert.play("missileAllertEffect1", true);

    this.missileAlert.once("animationcomplete-missileAllertEffect1", () => {
      this.missileAlert.play("missileAllertEffect2", true);

      this.missileAlert.once("animationcomplete-missileAllertEffect2", () => {
        this.missileAlert.destroy();
        this.fireMissile();
      });
    });
  }

  private fireMissile(): void {
    this.missileSmog = this.scene.add.sprite(12, 16, "missileEffect");
    this.missileHead = this.scene.add.sprite(16, 16, "missile");
    this.missileTall = this.scene.add.sprite(48, 16, "missileEffect");
  
    MusicManager.getInstance(this.scene).playMissileLaunch();

    this.missileSmog.play("missile-smog-Effect", true);
    this.missileHead.play("missile-head-Effect", true);
    this.missileTall.play("missile-tall-Effect", true);

    this.add([this.missileSmog, this.missileHead, this.missileTall]);

    this.body.setSize(32, 32);
    this.setScale(1.5);

    this.body.setVelocityX(-300);
  }

  public addCollide(player: Player): void {
    this.scene.physics.add.collider(player, this, () => {
      
      if (player.active === false) return;
      let missileExplosion = this.scene.add.sprite(
        player.x + player.body.width,
        player.y + player.body.height / 2,
        "missileExplosion"
      );
      missileExplosion.setDepth(Infinity);
      missileExplosion.play("missileExplosionEffect", true);
      this.scene.add.existing(missileExplosion);

      this.destroy();

      player.setCurrentState(new DieState(player));

      MusicManager.getInstance(this.scene).playExplosion();
    });
  }

  public init(): void {
    this.scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.scene.add.existing(this);
  }

  public update(){
    
  }
}
