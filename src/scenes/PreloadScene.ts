import { Scene } from 'phaser'
import { AnimationHelper } from '../helpers/animation-helper'

export class Preloader extends Scene {
    // graphics

    public animationHelper: AnimationHelper

    private loadingBar: Phaser.GameObjects.Graphics
    private progressBar: Phaser.GameObjects.Graphics

    constructor() {
        super('PreloadScene')
    }

    init() {
        let image = this.add.image(0, 0, 'background')
        image.setOrigin(0.5, 0.5) // set origin to center of image
        image.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2)
    }

    preload() {
        this.createLoadingGraphics()

        // pass value to change the loading bar fill
        this.load.on(
            'progress',
            (value: number) => {
                this.progressBar.clear()
                this.progressBar.fillStyle(0x88e453, 1)
                this.progressBar.fillRect(
                    this.cameras.main.width * 0.2,
                    this.cameras.main.height * 0.8,
                    ((this.cameras.main.width * 0.6) / 2) * value,
                    20
                )
            },
            this
        )

        this.load.on(
            'complete',
            () => {
                this.animationHelper = new AnimationHelper(
                    this,
                    this.cache.json.get('animationJSON')
                )
            },
            this
        )

        this.load.pack('preload', 'assets/pack.json', 'preload')
    }

    create() {
        this.scene.run('GameScene')
        this.scene.pause('GameScene')
        this.scene.start('MainMenuScene')
        this.scene.bringToTop('MainMenuScene')
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics()
        this.loadingBar.fillStyle(0xffffff, 1)
        this.loadingBar.fillRect(
            this.cameras.main.width * 0.2,
            this.cameras.main.height * 0.8,
            this.cameras.main.width * 0.6,
            20
        )
        this.progressBar = this.add.graphics()
    }
}
