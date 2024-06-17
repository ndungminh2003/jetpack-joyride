export class Button extends Phaser.GameObjects.Container {

  private button: Phaser.GameObjects.Image;
  private text: Phaser.GameObjects.Text;
  private callback: Function;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    key: string,
    text: string,
    callback: Function
  ) {
    super(scene, x, y);
    this.setDepth(Infinity)
    this.scene = scene;
    this.callback = callback;
    this.button = this.scene.add.image(0, 0, key);
    this.add(this.button);

    this.text = this.scene.add.text(0, 0, text, {
      fontSize: "26px",
      color: "#000000",
    });
    Phaser.Display.Align.In.Center(this.text, this.button);
    this.add(this.text);

    this.scene.add.existing(this);

    this.button.setInteractive();
    this.button.on("pointerdown", this.onDown, this);
    this.button.on("pointerup", this.onUp, this);
    this.button.on("pointerover", this.onOver, this);
    this.button.on("pointerout", this.onOut, this);
  }

  private onDown() {
    this.button.setFrame(1);
  }

  private onUp() {
    this.button.setFrame(0);
    this.callback();
  }

  private onOver() {
    this.button.setFrame(1);
  }

  private onOut() {
    this.button.setFrame(0);
  }
}
