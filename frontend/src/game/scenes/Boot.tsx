import { Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super({ key: "Boot" });
  }

  preload() {
    this.load.image("island", "images/island.png");
    this.load.image("rock", "images/rock.png");
    this.load.image("tree", "images/tree.png");
    this.load.atlas("player", "atlas/character.png", "atlas/character.json");
  }

  create() {
    this.scene.start("Island");
  }
}
