import { constants } from "../Constants";

export default class Bottle {
  private id: string;
  private scene: Phaser.Scene;
  private target: Phaser.Math.Vector2;
  public body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private dead: boolean = false;
  private lifetime: number = 0;

  isDead(): boolean {
    return this.dead;
  }

  getId(): string {
    return this.id;
  }

  constructor(
    id: string,
    scene: Phaser.Scene,
    spawn: Phaser.Math.Vector2,
    target: Phaser.Math.Vector2,
  ) {
    this.id = id;
    this.scene = scene;
    this.target = target;
    this.body = this.scene.physics.add.sprite(spawn.x, spawn.y, "bottle");
  }

  update(delta: number) {
    if (this.dead) return;
    this.lifetime += delta;
    const currentPos = new Phaser.Math.Vector2(this.body.x, this.body.y);
    const targetPos = new Phaser.Math.Vector2(this.target.x, this.target.y);
    const difference = targetPos.subtract(currentPos);
    const direction = difference.normalize();

    const deltaX = direction.x * constants.bottleSpeed * delta;
    const deltaY = direction.y * constants.bottleSpeed * delta;
    this.body.x += deltaX;
    this.body.y += deltaY;

    this.body.y +=
      Math.sin(this.scene.time.now * 0.005 * constants.bobFrequency) *
      constants.bobAmplitude;

    // Kill all send bottles after a certain lfietime
    if (
      this.id === constants.sendBottleId &&
      this.lifetime > constants.sendBottleLifetime
    ) {
      console.log("Kill bottle");
      this.body.destroy();
      this.dead = true;
    }
  }

  fadeOut() {
    if (this.dead) return;
    this.body.alpha -= 0.01;
    if (this.body.alpha <= 0) {
      this.body.destroy();
      this.dead = true;
    }
  }
}
