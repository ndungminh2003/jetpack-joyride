import { Scene } from 'phaser';

export class SceneManager {

  private static instance: SceneManager;
  private scene : Scene;

  public static getInstance() { 
    if (!SceneManager.instance) {
      SceneManager.instance = new SceneManager();
    }
    return SceneManager.instance;
  }

  public setScene(scene: Scene) {
    this.scene = scene;
  }

  public getScene() {
    return this.scene;
  }

  


}