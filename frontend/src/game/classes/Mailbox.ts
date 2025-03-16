import { InteractionType } from "../../utils/InteractionType";
import GameImage from "./GameImage";
import Interaction from "./Interaction";

export default class Mailbox extends Interaction {
  private notification: GameImage;
  constructor(
    scene: Phaser.Scene,
    id: InteractionType,
    point: Phaser.Math.Vector2,
    size: Phaser.Math.Vector2,
    imageKey: string | undefined = undefined,
    depth: number | undefined = undefined,
    offset: number | undefined = undefined,
  ) {
    super(scene, id, point, size, imageKey, depth, offset);
    const notificationPoint = new Phaser.Math.Vector2(point.x, point.y - 25);
    this.notification = new GameImage(
      scene,
      notificationPoint,
      "notification",
      200,
    );
    this.notification.image.setVisible(false);
  }

  makeFull() {
    this.image.image.setTexture("mailbox_full");
    this.notification.image.setVisible(true);
  }

  makeEmpty() {
    this.image.image.setTexture("mailbox");
    this.notification.image.setVisible(false);
  }
}
