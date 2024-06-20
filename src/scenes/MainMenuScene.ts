import { Scene } from 'phaser'
import { Button } from '../UI/Button'

export class MainMenuScene extends Scene {
    private settingBtn: Button
    private blinkText: Phaser.GameObjects.Text

    constructor() {
        super('MainMenuScene')
    }

    create() {
        this.add
            .image(this.cameras.main.width + 10, this.cameras.main.height / 7.5, 'btnBackingResult')
            .setOrigin(1)
            .setScale(1.2)

        this.add.image(this.cameras.main.width - 230, this.cameras.main.height / 12, 'totalCoins')

        // get total coins from local storage
        let totalCoins = localStorage.getItem('TOTALCOINS')

        this.add.text(
            this.cameras.main.width - 200,
            this.cameras.main.height / 12 - 15,
            `${totalCoins}`,
            {
                fontSize: '38px',
                color: '#fff',
                fontStyle: 'bold',
            }
        )

        this.add
            .image(this.cameras.main.width / 2, this.cameras.main.height / 2 - 100, 'title_small')
            .setOrigin(0.5)

        this.add
            .image(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 - 100,
                'titleGlow_small'
            )
            .setOrigin(0.5)
            .setScale(2)

        this.add
            .rectangle(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2,
                this.cameras.main.width,
                this.cameras.main.height,
                0x000000,
                0
            )
            .setInteractive()
            .setOrigin(0.5)
            .on('pointerdown', () => {
                this.scene.sleep('MainMenuScene')
                this.scene.resume('GameScene')
                this.scene.start('HUDScene')
            })

        this.blinkText = this.add
            .text(
                this.cameras.main.width / 2,
                this.cameras.main.height / 2 + 150,
                'TOUCH ANYWHERE TO PLAY!',
                {
                    fontSize: '32px',
                    color: '#fff',
                    fontStyle: 'bold',
                }
            )
            .setOrigin(0.5)

        this.settingBtn = new Button(
            this,
            this.cameras.main.width - 50,
            this.cameras.main.height / 12,
            'btnSettings',
            '',
            () => {
                this.scene.pause('GameScene')
                this.scene.launch('SettingScene')
                this.scene.bringToTop('SettingScene')
            }
        )

        console.log(this.settingBtn)

        this.scene.run('GameScene')
        this.scene.pause('GameScene')
        this.scene.bringToTop('MainMenuScene')

        this.tweens.add({
            targets: this.blinkText,
            alpha: 0,
            duration: 1000,
            ease: 'Cubic.easeInOut',
            yoyo: true,
            repeat: -1,
        })
    }
}
