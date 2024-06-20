import { BaseWorker } from './BaseWorker'

export class YellowWorker extends BaseWorker {
    constructor(scene: Phaser.Scene, action: string, x: number, y: number) {
        super(scene, action, x, y)
    }

    override init() {
        super.init()

        this.workerHead = this.scene.add.sprite(16, 8, 'worker2Head')
        this.workerBody = this.scene.add.sprite(16, 20, 'worker2Body')
        if (this.action === 'run') {
            this.body.setVelocityX(200)
        }
        this.playAction(this.action)
        this.body.setSize(32, 32)
        this.add([this.workerBody, this.workerHead])
    }

    override playAction(action: string): void {
        if (this.active) {
            this.workerBody.play('worker-body-' + action + '-1', true)
            this.workerHead.play('worker-head-' + action + '-1', true)
        }
    }

    override handleCollide(): void {
        if (this.active) {
            this.action = 'die'
            this.playAction(this.action)
            super.handleCollide()
        }
    }

    public update(): void {
        this.playAction(this.action)
    }
}
