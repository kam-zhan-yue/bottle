export default class InputHandler {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: {
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
  };

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard
      ? scene.input.keyboard.createCursorKeys()
      : ({} as Phaser.Types.Input.Keyboard.CursorKeys);
    this.wasd = scene.input.keyboard?.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    }) as {
      up: Phaser.Input.Keyboard.Key;
      down: Phaser.Input.Keyboard.Key;
      left: Phaser.Input.Keyboard.Key;
      right: Phaser.Input.Keyboard.Key;
    };
  }

  public isDown(): boolean {
    return this.cursors?.down?.isDown || this.wasd?.down?.isDown;
  }

  public isUp(): boolean {
    return this.cursors?.up?.isDown || this.wasd?.up?.isDown;
  }

  public isRight(): boolean {
    return this.cursors?.right?.isDown || this.wasd?.right?.isDown;
  }

  public isLeft(): boolean {
    return this.cursors?.left?.isDown || this.wasd?.left?.isDown;
  }
}
