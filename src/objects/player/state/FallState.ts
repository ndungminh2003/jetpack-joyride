import { Player } from '../Player'
import { BaseState } from './BaseState'
import { FlyState } from './FlyState'
import { RunState } from './RunState'

export class FallState extends BaseState {
    constructor(player: Player) {
        super(player)
    }

    public update(time: number, delta: number): void {
        console.log(time, delta)
        if (this.player.getFirstTimeFall()) {
            this.player.body.setVelocityY(200)

            this.player.getPlayerBody().play('body-fall', true)
            this.player.getPlayerHead().play('head-fall', true)
            this.player.getJetpack().play('jetpack-fall', true)
            this.player.setFirstTimeFall(false)
        }

        if (this.player.getIsFlying()) {
            this.changeState(new FlyState(this.player))
        }

        if (this.player.body.blocked.down) {
            this.changeState(new RunState(this.player))
        }
    }
}
