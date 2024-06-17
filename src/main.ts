import { BootScene } from "./scenes/BootScene";
import { GameScene } from "./scenes/GameScene";
import { GameOverScene } from "./scenes/GameOverScene";
import { MainMenuScene } from "./scenes/MainMenuScene";
import { Preloader } from "./scenes/Preloader";
import { HUDScene } from "./scenes/HUDScene";

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO, // Phaser.AUTO, Phaser.CANVAS, Phaser.HEADLESS, Phaser.WEBGL
  width: 1365,
  height: 768,
  parent: "game-container",
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.FIT, // Phaser.Scale.NONE, Phaser.Scale.FIT, Phaser.Scale.ENVELOP, Phaser.Scale.RESIZE
    autoCenter: Phaser.Scale.CENTER_BOTH, // Phaser.Scale.CENTER_BOTH, Phaser.Scale.CENTER_HORIZONTALLY, Phaser.Scale.CENTER_VERTICALLY
  },

  physics: {
    default: "arcade",
    arcade: {
      gravity: { x: 0, y: 1000 },
      debug: true,
    },
  },
  scene: [BootScene, Preloader, MainMenuScene, GameScene, GameOverScene, HUDScene],
};

export default new Game(config);
