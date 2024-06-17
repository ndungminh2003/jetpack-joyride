import { Scene } from "phaser";
import { MainGame } from "./main-game/MainGame";

export class GameScene extends Scene {
  private mainGame: MainGame;

  constructor() {
    super("GameScene");
  }

  create() {
    this.mainGame = new MainGame(this);
  }

  update(time: number, delta: number) {
    this.mainGame.update(time, delta);
    
  }
}
