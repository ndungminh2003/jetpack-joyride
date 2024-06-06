import { ISpriteConstructor } from "../types/ISpriteConstructor";

export class Barry extends Phaser.GameObjects.Sprite {
  declare body: Phaser.Physics.Arcade.Body;

  // private currentScene: Phaser.Scene;

  constructor(aParams: ISpriteConstructor) {
    super(aParams.scene, aParams.x, aParams.y, aParams.texture, aParams.frame);
  }

  public update(): void {



    
  }
}
