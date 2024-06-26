export class Button extends Phaser.GameObjects.Container {
    private button: Phaser.GameObjects.Image
    private text: Phaser.GameObjects.Text
    private callback: Function

    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        key: string,
        text: string,
        callback: Function
    ) {
        super(scene, x, y)
        this.setDepth(Infinity)
        this.scene = scene
        this.callback = callback

        // Create the button image
        this.button = this.scene.add.image(0, 0, key)

        this.add(this.button)

        // Create the text
        this.text = this.scene.add.text(0, 0, text, {
            fontSize: '24px', // Adjust font size to match the style
            color: '#FFFFFF', // White text color
            fontStyle: 'bold', // Bold text
            stroke: '#000000', // Black stroke
            strokeThickness: 3, // Stroke thickness
            align: 'center', // Center alignment
        })
        Phaser.Display.Align.In.Center(this.text, this.button)
        this.add(this.text)
        this.setSize(this.button.width, this.button.height)
        // Add this container to the scene
        this.scene.add.existing(this)

        // Enable input and set up event listeners
        this.button.setInteractive()
        this.button.on('pointerdown', this.onDown, this)
        this.button.on('pointerup', this.onUp, this)
        this.button.on('pointerover', this.onOver, this)
        this.button.on('pointerout', this.onOut, this)
    }

    private onDown() {
        this.button.setTint(0x999999) // Change to a darker shade
    }

    private onUp() {
        this.button.clearTint() // Remove the tint
        this.callback()
    }

    private onOver() {
        this.button.setTint(0xcccccc) // Change to a lighter shade
    }

    private onOut() {
        this.button.clearTint() // Remove the tint
    }
}
