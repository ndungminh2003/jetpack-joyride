import { Player } from './../objects/player/Player'
import { Text } from '../UI/Text'

export class ScoreManager {
    private score: number
    private scoreText: Text
    private bestScoreText: Text
    private player: Player

    constructor(scene: Phaser.Scene, score: number = 0, player: Player) {
        this.score = score
        this.player = player
        this.scoreText = new Text(scene, 10, scene.cameras.main.height / 20, '0000M', {
            fontSize: '32px',
            stroke: '#000000',
            strokeThickness: 6,
        }).setDepth(Infinity)

        if (localStorage.getItem('BESTSCORE') === null) {
            localStorage.setItem('BESTSCORE', '0')
        }

        this.bestScoreText = new Text(
            scene,
            10,
            scene.cameras.main.height / 20 + 30,
            'Best: ' + localStorage.getItem('BESTSCORE') + 'M',
            {
                fontSize: '32px',
                stroke: '#000000',
                strokeThickness: 6,
            }
        ).setDepth(Infinity)
    }

    public getScore(): number {
        return this.score
    }

    public setScore(score: number): void {
        this.score = score
    }

    public writeScoreToLocalStorage(): void {
        const bestScore = localStorage.getItem('BESTSCORE')
        if (bestScore === null || this.score > parseInt(bestScore)) {
            localStorage.setItem('BESTSCORE', this.score.toString())
        }
    }

    public update(time: number, delta: number): void {
        console.log(time, delta)
        console.log(this.bestScoreText)
        this.score += Math.floor(this.player.body.velocity.x * (delta / 5000))
        const formattedScore = this.score.toString().padStart(4, '0')
        this.scoreText.setText(`${formattedScore}M`)
    }
}
