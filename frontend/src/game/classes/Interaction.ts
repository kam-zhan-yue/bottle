import { InteractionType } from "../../utils/InteractionType";
import { constants } from "../Constants";
import GameImage from "./GameImage";

export default class Interaction {
  public id: InteractionType;
  private scene: Phaser.Scene;
  private position: Phaser.Math.Vector2;
  private size: Phaser.Math.Vector2;
  private graphics: Phaser.GameObjects.Graphics;
  private tooltip: GameImage;
  private active: boolean;

  constructor(
    scene: Phaser.Scene,
    id: InteractionType,
    point: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2,
    imageKey: string | undefined = undefined,
    depth: number | undefined = undefined,
    offset: number | undefined = undefined,
  ) {
    this.scene = scene;
    this.id = id;
    this.position = point;
    this.size = size;

    if (imageKey) {
      new GameImage(this.scene, this.position, imageKey, depth);
    }

    if (constants.debug) {
      this.graphics = this.scene.add.graphics();
      this.graphics.fillStyle(0x00ff00, 0.5);
      this.graphics.fillRect(
        this.getMinBound().x,
        this.getMinBound().y,
        this.size.x,
        this.size.y,
      );
    }

    this.tooltip = new GameImage(
      scene,
      new Phaser.Math.Vector2(0, 0),
      "spacebar",
      1000,
    );
    this.tooltip.image.setPosition(
      this.position.x,
      this.position.y - this.size.y / 2 + (offset || 0),
    );
    this.tooltip.image.setOrigin(0.5);
    this.tooltip.image.setVisible(false);
    this.active = true;
  }

  getMinBound(): Phaser.Math.Vector2 {
    return new Phaser.Math.Vector2(
      this.position.x - this.size.x / 2,
      this.position.y - this.size.y / 2,
    );
  }

  showTooltip() {
    this.tooltip.image.setVisible(true);
  }

  hideTooltip() {
    this.tooltip.image.setVisible(false);
  }

  setActive(active: boolean) {
    this.active = active;
  }

  // Method to check if a point (x, y) is inside the rectangle
  containsPoint(x: number, y: number) {
    if (!this.active) {
      this.hideTooltip();
      return false;
    }
    const contains =
      x >= this.getMinBound().x &&
      x <= this.getMinBound().x + this.size.x &&
      y >= this.getMinBound().y &&
      y <= this.getMinBound().y + this.size.y;
    if (contains) {
      this.showTooltip();
    } else {
      this.hideTooltip();
    }
    return contains;
  }

  update(playerPos: Phaser.Math.Vector2) {
    this.containsPoint(playerPos.x, playerPos.y);
  }
}
