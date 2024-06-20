export class Text extends Phaser.GameObjects.Text {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        text: string,
        style: Phaser.Types.GameObjects.Text.TextStyle
    ) {
        super(scene, x, y, text, style)
        this.setOrigin(0)
        this.setScrollFactor(0)
        scene.add.existing(this)
    }

    public setTextNumber(score: number) {
        this.setText(`${score}M`)
    }
}
