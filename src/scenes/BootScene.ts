import { Scene } from 'phaser'

export class BootScene extends Scene {
    constructor() {
        super('BootScene')
    }

    preload() {
        this.load.setPath('assets')

        this.load.image('background', './Splash/loading_screen.png')
    }

    create() {
        this.scene.start('PreloadScene')
    }
}
