import { Scene } from "phaser";
import { EventBus } from "../../EventBus";
import Player from "../classes/Player";
import InputHandler from "../classes/InputHandler";
import createCharacterAnims from "../classes/AnimationHandler";
import GameImage from "../classes/GameImage";

export class Island extends Scene {
  public title: string;
  public elapsedTime: number;
  public state: "game" | "ui";
  public player!: Player;
  private inputHandler!: InputHandler;

  constructor() {
    super({ key: "Island" });
    this.title = "This is a title";
    this.elapsedTime = 0;
    this.state = "game";
  }

  setupGame() {
    this.inputHandler = new InputHandler(this);
    new GameImage(this, 0, 0, "island", -100);
    new GameImage(this, 0, 0, "tree");
    this.player = new Player(this.physics, 0, 0, "player", this.inputHandler);
  }

  setupAnimations() {
    createCharacterAnims(this.anims);
  }

  create() {
    this.setupGame();
    this.setupAnimations();
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.zoom = 3.0;
  }

  update(_time: number, delta: number) {
    this.elapsedTime += delta;
    EventBus.emit("update", this.elapsedTime);
    // To fix the screen repositioning issue
    this.cameras.main.centerOn(0, 0);
    switch (this.state) {
      case "game":
        this.player.update();
        break;
      case "ui":
        break;
    }
  }
}
