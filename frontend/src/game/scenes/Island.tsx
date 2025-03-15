import { Scene } from "phaser";
import { EventBus } from "../../EventBus";
import Player from "../classes/Player";
import InputHandler from "../classes/InputHandler";

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
    this.player = new Player(this.physics, 0, 0, "player");
    this.add.image(0, 0, "island");
    this.add.image(0, 0, "tree");
  }

  create() {
    this.setupGame();
    this.cameras.main.centerOn(0, 0);
    this.cameras.main.zoom = 3.0;
  }

  checkInputs() {
    switch (this.state) {
      case "game":
        this.player?.checkInputs(this.inputHandler);
        break;
      case "ui":
        break;
    }
  }

  handleInputs() {}

  update(_time: number, delta: number) {
    this.elapsedTime += delta;
    EventBus.emit("update", this.elapsedTime);
    this.checkInputs();
  }
}
