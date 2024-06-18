import { Scene } from "phaser";
import { Player } from "../objects/player/Player";
import { MapGenerator } from "../manager/MapGenerator";
import { GameManager } from "../manager/GameManager";

export class GameScene extends Scene {
  private player: Player;
  private obstacleGroup: Phaser.GameObjects.Group;
  private workerGroup: Phaser.GameObjects.Group;
  private mapGenerator: MapGenerator;
  private gameManager: GameManager;

  constructor() {
    super("GameScene");
  }

  create() {
    // Create player
    this.player = new Player({
      scene: this,
      x: 100,
      y: 550,
    });

    //create map generator
    this.mapGenerator = new MapGenerator();

    // Create groups
    this.obstacleGroup = this.add.group();
    this.workerGroup = this.add.group();

    // Create GameManager
    this.gameManager = new GameManager({
      scene: this,
      player: this.player,
      obstacleGroup: this.obstacleGroup,
      workerGroup: this.workerGroup,
      mapGenerator: this.mapGenerator,
    });
  }

  update(time: number, delta: number) {
    this.player.update(time, delta);
    this.gameManager.update(time, delta);
  }
}
