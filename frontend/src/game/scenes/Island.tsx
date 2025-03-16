import { Scene } from "phaser";
import { EventBus } from "../../EventBus";
import Player from "../classes/Player";
import InputHandler from "../classes/InputHandler";
import createCharacterAnims from "../classes/AnimationHandler";
import GameImage from "../classes/GameImage";
import InteractionHandler from "../classes/InteractionHandler";
import ObstacleHandler from "../classes/ObstacleHandler";
import BottleHandler from "../classes/BottleHandler";
import AudioPlayer from "../classes/AudioPlayer";
import Bottle from "../classes/Bottle";

export class Island extends Scene {
  public title: string;
  public elapsedTime: number;
  public state: "game" | "ui";
  public player!: Player;
  private inputHandler!: InputHandler;
  private interactionHandler!: InteractionHandler;
  private obstacleHandler!: ObstacleHandler;
  private bottleHandler!: BottleHandler;
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private audioPlayer: AudioPlayer;
  
  constructor() {
    super({ key: "Island" });
    this.title = "This is a title";
    this.elapsedTime = 0;
    this.state = "game";
    this.audioPlayer = new AudioPlayer(this);
  }

  // playBackgroundMusic() {
  //   this.audioPlayer.play('background-music');
  // }

  setupGame() {
    this.inputHandler = new InputHandler(this);
    this.interactionHandler = new InteractionHandler(this);
    this.obstacleHandler = new ObstacleHandler(this);
    this.bottleHandler = new BottleHandler(this);

    // const shader = this.add.shader("water", 0, 0, 1280, 720);
    // shader.setDepth(-500);
    new GameImage(this, new Phaser.Math.Vector2(0, 0), "island", -100);
    new GameImage(this, new Phaser.Math.Vector2(-10, -50), "tree");
  }

  setupAnimations() {
    createCharacterAnims(this.anims);
  }

  spawnBottle(id: string) {
    console.log(`GAME | Spawning Bottle ${id}`);
    this.bottleHandler.spawnBottle(id);
  }

  sendBottle() {
    console.log("GAME | Sending Bottle");
    this.bottleHandler.sendBottle();
  }

  replyBottle() {
    console.log("GAME | Replying Bottle");
    this.bottleHandler.sendBottle();
  }

  initPlayer() {
    if (!this.player) {
      this.player = new Player(this.physics, 0, 0, "player", this.inputHandler);
      this.obstacleHandler.init(this.player);
      this.cameras.main.startFollow(this.player.body, false, 0.4, 0.4);
    }
  }

  create() {
    this.setupGame();
    this.setupAnimations();
    this.cameras.main.zoom = 3.0;
  }

  switchState(state: string) {
    if (state === "ui") {
      this.state = "ui";
      this.player.stop();
    } else if (state === "game") {
      this.state = "game";
    }
  }

  getBottles(): Bottle[] {
    return this.bottleHandler.getBottles();
  }

  fillMailbox() {
    this.interactionHandler?.fillMailbox();
  }

  emptyMailbox() {
    this.interactionHandler?.emptyMailbox();
  }

  update(_time: number, delta: number) {
    this.elapsedTime += delta;
    EventBus.emit("update", this.elapsedTime);
    // To fix the screen repositioning issue
    this.bottleHandler.update(delta);

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
      if (interaction) {
        EventBus.emit(interaction.id);
      }
    }
  }
}
