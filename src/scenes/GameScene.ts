import { Scene } from 'phaser'
import { Player } from '../objects/player/Player'
import { MapGenerator } from '../manager/MapGenerator'
import { GameManager } from '../manager/GameManager'
import { MusicManager } from '../manager/MusicManager'

export class GameScene extends Scene {
    private player: Player
    private obstacleGroup: Phaser.GameObjects.Group
    private workerGroup: Phaser.GameObjects.Group
    private mapGenerator: MapGenerator
    private gameManager: GameManager

    constructor() {
        super('GameScene')
    }

    create() {
        MusicManager.getInstance(this).playBGM()

        this.player = new Player({
            scene: this,
            x: 100,
            y: 550,
        })

        this.mapGenerator = new MapGenerator()

        this.obstacleGroup = this.add.group()
        this.workerGroup = this.add.group()

        this.gameManager = new GameManager({
            scene: this,
            player: this.player,
            obstacleGroup: this.obstacleGroup,
            workerGroup: this.workerGroup,
            mapGenerator: this.mapGenerator,
        })
    }

    update(time: number, delta: number) {
        this.player.update(time, delta)
        this.gameManager.update(time, delta)
    }
}
