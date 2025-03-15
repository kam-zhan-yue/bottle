import Bottle from "./Bottle";

export default class BottleHandler {
  private scene: Phaser.Scene;
  private bottles: Bottle[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  getRandomSpawn() {
    const x = this.scene.game.config.width as number;
    const y = this.scene.game.config.height as number;
    const randomAngle = Phaser.Math.Between(0, 360);
    const spawnX = x * Math.cos(randomAngle);
    const spawnY = y * Math.sin(randomAngle);
    return new Phaser.Math.Vector2(spawnX, spawnY);
  }

  spawnBottle() {
    const bottle = new Bottle(
      this.scene,
      this.getRandomSpawn(),
      new Phaser.Math.Vector2(0, 0),
    );
    this.bottles.push(bottle);
  }

  update(delta: number) {
    for (const bottle of this.bottles) {
      bottle.update(delta);
    }
  }
}
