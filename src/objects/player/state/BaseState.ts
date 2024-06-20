import { Player } from '../Player'

export abstract class BaseState {
    protected player: Player
    constructor(player: Player) {
        this.player = player
    }

    public abstract update(time: number, delta: number): void

    public changeState(state: BaseState): void {
        this.player.setCurrentState(state)
    }
}
