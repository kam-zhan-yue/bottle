import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.image("island", "images/island.png");
    this.load.image("rock", "images/rock.png");
    this.load.image("tree", "images/tree.png");
    this.load.image("mailbox", "images/mailbox.png");
    this.load.image("mailbox_full", "images/mailbox_full.png");
    this.load.image("table", "images/table.png");
    this.load.image("bottle", "images/bottle_floating.png");
    this.load.image("spacebar", "images/spacebar.png");
    this.load.atlas("player", "atlas/character.png", "atlas/character.json");

    this.load.glsl("stars", "shaders/stars.glsl");
    this.load.glsl("water", "shaders/water.glsl");
  }

  create() {
    this.scene.start("Island");
  }
}
