import { Player } from '../player/Player'

export abstract class Obstacle extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        this.setDepth(Infinity)
    }

    abstract init(): void

    public abstract update(): void

    abstract addCollide(player: Player): void
}
