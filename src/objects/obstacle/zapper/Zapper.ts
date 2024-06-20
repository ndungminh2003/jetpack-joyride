import { MusicManager } from '../../../manager/MusicManager'
import { Player } from '../../player/Player'
import { DieState } from '../../player/state/DieState'
import { Obstacle } from '../Obstacle'

export class Zapper extends Obstacle {
    protected circleCollisions: Phaser.GameObjects.Arc[]

    protected zapper: Phaser.GameObjects.TileSprite
    protected zapGlowLeft: Phaser.GameObjects.Sprite
    protected zapGlowRight: Phaser.GameObjects.Sprite
    protected zapOrAnimLeft: Phaser.GameObjects.Sprite
    protected zapOrAnimRight: Phaser.GameObjects.Sprite

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.scene.physics.world.enable(this)
        this.body.allowGravity = false
        this.scene.add.existing(this)
        this.circleCollisions = []
        this.createCircles()
        this.body.setImmovable(true)

        this.init()
    }

    override init(): void {
        const rotation = Phaser.Math.FloatBetween(-Math.PI / 4, Math.PI / 4)
        this.rotation = rotation

        this.zapper = this.scene.add.tileSprite(512, 54, 1024, 117, 'zapper1')
        this.zapGlowLeft = this.scene.add.sprite(0, 54, 'zapperGlow').setScale(2.5)
        this.zapGlowRight = this.scene.add.sprite(1024, 54, 'zapperGlow').setScale(2.5)
        this.zapOrAnimLeft = this.scene.add.sprite(0, 54, 'zapperOrAnim').setScale(2.5)
        this.zapOrAnimRight = this.scene.add.sprite(1024, 54, 'zapperOrAnim').setScale(2.5)

        this.zapOrAnimLeft.rotation = Math.PI / 2
        this.zapOrAnimRight.rotation = -Math.PI / 2

        this.zapGlowLeft.play('zapGlowEffect')
        this.zapGlowRight.play('zapGlowEffect')
        this.zapOrAnimLeft.play('zapOrAnimEffect')
        this.zapOrAnimRight.play('zapOrAnimEffect')

        this.add([
            this.zapper,
            this.zapGlowLeft,
            this.zapGlowRight,
            this.zapOrAnimLeft,
            this.zapOrAnimRight,
            ...this.circleCollisions,
        ])

        const scale = [0.3, 0.35]

        this.setScale(scale[Phaser.Math.Between(0, 1)])
    }

    protected createCircles(): void {
        for (let i = 0; i < 22; i++) {
            const posX = i * 50
            let circle = this.scene.add.circle(posX, 54, 40)
            this.scene.physics.add.existing(circle)
            ;(circle.body as Phaser.Physics.Arcade.Body).setAllowGravity(false).setImmovable(true)

            this.circleCollisions.push(circle)
        }
    }

    public update(): void {
        this.zapper.tilePositionX += 5
    }

    protected getCircleCollisions(): Phaser.GameObjects.Arc[] {
        return this.circleCollisions
    }

    public addCollide(player: Player): void {
        this.getCircleCollisions().forEach((circle) => {
            this.scene.physics.add.collider(player, circle, () => {
                if (player.active === false) return

                let glowOff = this.scene.add.sprite(player.x, player.y, 'zapperGlowOff')
                glowOff.setDepth(Infinity)
                glowOff.play('zapGlowOffEffect', true)
                glowOff.setScale(0.5)
                this.scene.add.existing(glowOff)
                MusicManager.getInstance(this.scene).playDieBones()
                player.setCurrentState(new DieState(player))
            })
        })
    }
}
