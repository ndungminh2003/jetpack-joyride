import { BaseWorker } from "./BaseWorker";

export class YellowWorker extends BaseWorker {

  constructor(scene: Phaser.Scene, action: string) {
    super(scene, action);

    this.init();
  }

  override init() {
    super.init();

    this.x = 200
    this.y = 400

    this.workerHead = this.scene.add.sprite(16, 8, "worker2Head");
    this.workerBody = this.scene.add.sprite(16, 20, "worker2Body");

    this.playAction(this.action)

    this.body.setSize(32, 32);
    this.add([this.workerBody, this.workerHead]);
  }

  playAction(action: string): void {
    this.workerBody.play("worker-body-" + action + "-1", true);
    this.workerHead.play("worker-head-" + action + "-1", true);
  }

  // public clone(): BaseWorker {
  //   return new NormalWorker(this);
  // }
}
