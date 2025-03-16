import { EventBus } from "../../EventBus";
import { constants } from "../Constants";
import Bottle from "./Bottle";

export default class BottleHandler {
  private scene: Phaser.Scene;
  private bottles: Bottle[] = [];
  private position: Phaser.Math.Vector2;
  private size: Phaser.Math.Vector2;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.position = new Phaser.Math.Vector2(0, 0);
    this.size = new Phaser.Math.Vector2(215, 150);

    if (constants.debug) {
      const graphics = this.scene.add.graphics();
      graphics.fillStyle(0xff0000, 0.5);
      graphics.fillRect(
        this.getMinBound().x,
        this.getMinBound().y,
        this.size.x,
        this.size.y,
      );
    }
  }

  getMinBound(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      this.position.x - this.size.x / 2,
      this.position.y - this.size.y / 2,
    );
  }

  getRandomSpawn() {
    const x = this.scene.game.config.width as number;
    const y = this.scene.game.config.height as number;
    const randomAngle = Phaser.Math.Between(0, 360);
    const spawnX = x * Math.cos(randomAngle);
    const spawnY = y * Math.sin(randomAngle);
    return new Phaser.Math.Vector2(spawnX, spawnY);
  }

  sendBottle() {
    const bottle = new Bottle(
      constants.sendBottleId,
      this.scene,
      // Hard coded spawn point
      new Phaser.Math.Vector2(100, 0),
      // Hard coded destination
      new Phaser.Math.Vector2(1000, 0),
    );
    this.bottles.push(bottle);
  }

  replyBottle() {
    const bottle = new Bottle(
      constants.sendBottleId,
      this.scene,
      // Hard coded spawn point
      new Phaser.Math.Vector2(-100, 0),
      // Hard coded destination
      new Phaser.Math.Vector2(-1000, 0),
    );
    this.bottles.push(bottle);
  }

  spawnBottle(id: string) {
    const bottle = new Bottle(
      id,
      this.scene,
      this.getRandomSpawn(),
      new Phaser.Math.Vector2(0, 0),
    );
    this.bottles.push(bottle);
  }

  contains(bottle: Bottle): boolean {
    const contains =
      bottle.body.x >= this.getMinBound().x &&
      bottle.body.x <= this.getMinBound().x + this.size.x &&
      bottle.body.y >= this.getMinBound().y &&
      bottle.body.y <= this.getMinBound().y + this.size.y;
    return contains;
  }

  update(delta: number) {
    for (const bottle of this.bottles) {
      // Only catch received bottles
      if (this.contains(bottle) && bottle.getId() !== constants.sendBottleId) {
        bottle.fadeOut();
      } else {
        bottle.update(delta);
      }
    }
    for (let i = this.bottles.length - 1; i >= 0; i--) {
      if (this.bottles[i].isDead()) {
        // Only emit an event on received bottles
        if (this.bottles[i].getId() !== constants.sendBottleId)
          EventBus.emit("bottle", this.bottles[i].getId());

        this.bottles.splice(i, 1); // Remove the dead bottle
      }
    }
  }
}
