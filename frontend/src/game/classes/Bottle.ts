import { constants } from "../Constants";

export default class Bottle {
  private scene: Phaser.Scene;
  private target: Phaser.Math.Vector2;
  private body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(
    scene: Phaser.Scene,
    spawn: Phaser.Math.Vector2,
    target: Phaser.Math.Vector2,
  ) {
    this.scene = scene;
    this.target = target;
    this.body = scene.physics.add.sprite(spawn.x, spawn.y, "bottle");
  }

  update(delta: number) {
    const currentPos = new Phaser.Math.Vector2(this.body.x, this.body.y);
    const targetPos = new Phaser.Math.Vector2(this.target.x, this.target.y);
    const difference = targetPos.subtract(currentPos);
    const deltaX = difference.normalize().x * constants.bottleSpeed * delta;
    const deltaY = difference.normalize().y * constants.bottleSpeed * delta;
    this.body.x += deltaX;
    this.body.y += deltaY;
  }
}
