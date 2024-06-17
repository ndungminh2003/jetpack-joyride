import { Player } from "../objects/player/Player"
import { MapGenerator } from "../manager/MapGenerator"

export interface IGameManagerContructor {
  scene : Phaser.Scene
  player: Player
  mapGenerator: MapGenerator
  obstacleGroup: Phaser.GameObjects.Group
  workerGroup: Phaser.GameObjects.Group
}