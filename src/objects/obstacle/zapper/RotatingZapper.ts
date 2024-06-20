import { Zapper } from './Zapper'

export class RotatingZapper extends Zapper {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
    }

    override init() {
        // Create the main zapper sprite with the origin at the center
        this.zapper = this.scene.add
            .tileSprite(512, 54, 1024, 117, 'RotatingZapper')
            .setOrigin(0.5, 0.5)

        // Adjust the position to match the center-origin adjustment
        this.zapper.x = this.zapper.width / 2
        this.zapper.y = this.zapper.height / 2

        // Create other components with their origins adjusted and positions relative to the main zapper
        this.zapGlowLeft = this.scene.add
            .sprite(0, 54, 'zapperGlowRotating')
            .setScale(2.5)
            .setOrigin(0.5, 0.5)
        this.zapGlowRight = this.scene.add
            .sprite(1024, 54, 'zapperGlowRotating')
            .setScale(2.5)
            .setOrigin(0.5, 0.5)
        this.zapOrAnimLeft = this.scene.add
            .sprite(0, 54, 'zapperOrAnim')
            .setScale(2.5)
            .setOrigin(0.5, 0.5)
        this.zapOrAnimRight = this.scene.add
            .sprite(1024, 54, 'zapperOrAnim')
            .setScale(2.5)
            .setOrigin(0.5, 0.5)

        // Rotate the animations
        this.zapOrAnimLeft.rotation = Math.PI / 2
        this.zapOrAnimRight.rotation = -Math.PI / 2

        // Play animations
        this.zapGlowLeft.play('zapGlowRotatingEffect')
        this.zapGlowRight.play('zapGlowRotatingEffect')
        this.zapOrAnimLeft.play('zapOrAnimEffect')
        this.zapOrAnimRight.play('zapOrAnimEffect')

        // Add the sprites and circles to the group
        this.add([
            this.zapper,
            this.zapGlowLeft,
            this.zapGlowRight,
            this.zapOrAnimLeft,
            this.zapOrAnimRight,
            ...this.circleCollisions, // Spread the circle collisions array
        ])

        // Create a tween to rotate the zapper around its center
        // this.scene.add.tween({
        //   targets: this.zap,
        //   angle: 360,
        //   duration: 5000,
        //   repeat: -1,
        // });

        const scale = [0.3, 0.35]

        // Random scale
        this.setScale(scale[Phaser.Math.Between(0, 1)])
    }
}
