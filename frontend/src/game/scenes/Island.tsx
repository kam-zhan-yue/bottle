import { Scene } from "phaser";
import { EventBus } from "../../EventBus";
import Player from "../classes/Player";
import InputHandler from "../classes/InputHandler";
import createCharacterAnims from "../classes/AnimationHandler";
import GameImage from "../classes/GameImage";
import InteractionHandler from "../classes/InteractionHandler";
import ObstacleHandler from "../classes/ObstacleHandler";

export class Island extends Scene {
  public title: string;
  public elapsedTime: number;
  public state: "game" | "ui";
  public player!: Player;
  private inputHandler!: InputHandler;
  private interactionHandler!: InteractionHandler;
  private obstacleHandler!: ObstacleHandler;

  constructor() {
    super({ key: "Island" });
    this.title = "This is a title";
    this.elapsedTime = 0;
    this.state = "game";
  }

  setupGame() {
    this.inputHandler = new InputHandler(this);
    this.interactionHandler = new InteractionHandler(this);
    this.obstacleHandler = new ObstacleHandler(this);

    const shader = this.add.shader("water", 0, 0, 1280, 720);
    shader.setDepth(-500);
    new GameImage(this, new Phaser.Math.Vector2(0, 0), "island", -100);
    new GameImage(this, new Phaser.Math.Vector2(-10, -50), "tree");
  }

  setupAnimations() {
    createCharacterAnims(this.anims);
  }

  initPlayer() {
    if (!this.player) {
      this.player = new Player(this.physics, 0, 0, "player", this.inputHandler);
      this.obstacleHandler.init(this.player);
    }
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

    if (!this.player) return;
    switch (this.state) {
      case "game":
        this.player.update();
        this.interactionHandler.update(this.player.getPos());
        break;
      case "ui":
        break;
    }

    if (this.inputHandler.isInteractDown()) {
      const interaction = this.interactionHandler.getCurrentInteraction(
        this.player.getPos(),
      );
      console.log(interaction);
      if (interaction) {
        EventBus.emit(interaction.id);
        console.log("Emitting ", interaction.id);
      }
    }
  }
}
