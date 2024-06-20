import { Bullets } from '../bullet/Bullet'
import { BaseState } from './state/BaseState'
import { DieState } from './state/DieState'
import { RunState } from './state/RunState'
import { IContainerConstructor } from '../../types/IContainerConstructor'

export class Player extends Phaser.GameObjects.Container {
    declare body: Phaser.Physics.Arcade.Body
    private currentScene: Phaser.Scene
    private currentState: BaseState
    private keys: Map<string, Phaser.Input.Keyboard.Key>
    private bullets: Bullets
    private firstTimeFall: boolean = false
    private isFlying: boolean = false

    private playerHead: Phaser.GameObjects.Sprite
    private playerBody: Phaser.GameObjects.Sprite
    private jetpack: Phaser.GameObjects.Sprite
    private bulletFlash: Phaser.GameObjects.Sprite

    constructor(params: IContainerConstructor) {
        super(params.scene, params.x, params.y)
        this.currentScene = params.scene

        this.init()
    }

    private init() {
        // Initialize sprites to add in container
        this.playerHead = this.currentScene.add.sprite(13, 8, 'player-head')
        this.playerBody = this.currentScene.add.sprite(13, 20, 'player-body')
        this.jetpack = this.currentScene.add.sprite(0, 17, 'jetpack').setDepth(Infinity)
        this.bulletFlash = this.currentScene.add.sprite(0, 47, 'bulletFlash').setDepth(Infinity)
        this.setDepth(Infinity)

        this.add([this.playerHead, this.playerBody, this.jetpack, this.bulletFlash])

        // Set initial state and enable physics
        this.currentState = new RunState(this)
        this.currentScene.physics.world.enable(this)
        this.currentScene.add.existing(this)
        this.body.setImmovable(true)
        this.body.collideWorldBounds = true

        // Set properties
        this.bulletFlash.setVisible(false)
        this.body.setSize(15, 30)
        this.setScale(2)
        this.bulletFlash.setScale(0.5)

        this.body.velocity.x = 250
        this.body.maxVelocity.x = 550
        this.body.velocity.y = 0

        // Create bullets
        this.bullets = this.currentScene.add.existing(
            new Bullets(this.currentScene.physics.world, this.currentScene, {
                name: 'bullets',
            })
        )

        this.bullets.createMultiple({
            key: 'bullet',
            quantity: 5,
        })

        // Input
        this.keys = new Map([['FLY', this.addKey('SPACE')]])

        this.scene.input.on('pointerdown', this.startFlying, this)
        this.scene.input.on('pointerup', this.stopFlying, this)
    }

    private startFlying(): void {
        this.isFlying = true
    }

    private stopFlying(): void {
        this.isFlying = false
    }

    private addKey(key: string): Phaser.Input.Keyboard.Key {
        return this.currentScene.input.keyboard!.addKey(key)
    }

    public update(time: number, delta: number): void {
        if (!(this.currentState instanceof DieState)) {
            this.body.velocity.x += 1
            this.currentState.update(time, delta)
        } else {
            this.currentState.update(time, delta)
        }
    }

    public getIsFlying(): boolean {
        return this.isFlying
    }

    public setCurrentState(state: BaseState): void {
        this.currentState = state
    }

    public getCurrentState(): BaseState {
        return this.currentState
    }

    public getKeys(): Map<string, Phaser.Input.Keyboard.Key> {
        return this.keys
    }

    public getBullets(): Bullets {
        return this.bullets
    }

    public getFirstTimeFall(): boolean {
        return this.firstTimeFall
    }

    public setFirstTimeFall(value: boolean): void {
        this.firstTimeFall = value
    }

    public getCurrentScene(): Phaser.Scene {
        return this.currentScene
    }

    public getPlayerBody(): Phaser.GameObjects.Sprite {
        return this.playerBody
    }

    public getPlayerHead(): Phaser.GameObjects.Sprite {
        return this.playerHead
    }

    public getJetpack(): Phaser.GameObjects.Sprite {
        return this.jetpack
    }

    public getBulletFlash(): Phaser.GameObjects.Sprite {
        return this.bulletFlash
    }
}
