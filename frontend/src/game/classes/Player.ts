import InputHandler from "./InputHandler";

export default class Player {
  private physics: Phaser.Physics.Arcade.ArcadePhysics;
  public body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private lastFacingDirection: "up" | "down" | "left" | "right";
  private inputHandler: InputHandler;

  constructor(
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    x: number,
    y: number,
    textureKey: string,
    inputHandler: InputHandler,
  ) {
    this.physics = physics;
    this.lastFacingDirection = "down";
    this.body = this.physics.add.sprite(x, y, textureKey);
    this.inputHandler = inputHandler;
  }

  getPos(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(this.body.x, this.body.y);
  }

  checkInputs() {
    const speed = 100;

    let x: number = 0;
    let y: number = 0;

    //Handle speed
    if (this.inputHandler.isLeft()) {
      x = -speed;
      this.body.setVelocity(-speed, 0);
      this.lastFacingDirection = "left";
    } else if (this.inputHandler.isRight()) {
      x = speed;
      this.body.setVelocity(speed, 0);
      this.lastFacingDirection = "right";
    }
    if (this.inputHandler.isUp()) {
      y = -speed;
      this.body.setVelocity(0, -speed);
      this.lastFacingDirection = "up";
    } else if (this.inputHandler.isDown()) {
      y = speed;
      this.body.setVelocity(0, speed);
      this.lastFacingDirection = "down";
    }

    //Handle animations
    if (y < 0) this.body.anims.play("player-run-up", true);
    else if (y > 0) this.body.anims.play("player-run-down", true);
    else if (x < 0) this.body.anims.play("player-run-left", true);
    else if (x > 0) this.body.anims.play("player-run-right", true);
    if (x === 0 && y === 0) {
      this.idle();
    }
    this.body.setVelocity(x, y);
  }

  idle() {
    this.body.setVelocity(0, 0);
    switch (this.lastFacingDirection) {
      case "up":
        this.body.anims.play("player-idle-up", true);
        break;
      case "down":
        this.body.anims.play("player-idle-down", true);
        break;
      case "left":
        this.body.anims.play("player-idle-left", true);
        break;
      case "right":
        this.body.anims.play("player-idle-right", true);
        break;
    }
  }

  update() {
    this.checkInputs();
    this.body.depth = this.body.y + this.body.height / 2;
  }
}
