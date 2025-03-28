import { Scene } from "phaser";
import { EventBus } from "../../EventBus";
import createCharacterAnims from "../classes/AnimationHandler";
import Bottle from "../classes/Bottle";
import BottleHandler from "../classes/BottleHandler";
import GameImage from "../classes/GameImage";
import InputHandler from "../classes/InputHandler";
import InteractionHandler from "../classes/InteractionHandler";
import ObstacleHandler from "../classes/ObstacleHandler";
import Player from "../classes/Player";

export class Island extends Scene {
  public title: string;
  public elapsedTime: number;
  public state: "game" | "ui";
  public player!: Player;
  private inputHandler!: InputHandler;
  private interactionHandler!: InteractionHandler;
  private obstacleHandler!: ObstacleHandler;
  private bottleHandler!: BottleHandler;
  private island!: GameImage;

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
    this.bottleHandler = new BottleHandler(this);

    const tags = this.anims.createFromAseprite("ocean");
    console.log(tags);

    const OCEAN_WIDTH = 48;
    const OCEAN_HEIGHT = 48;

    const START_X = -960;
    const START_Y = -960;
    const END_X = 960;
    const END_Y = 960;

    for (let x = START_X; x <= END_X; x += OCEAN_WIDTH) {
      for (let y = START_Y; y <= END_Y; y += OCEAN_HEIGHT) {
        const ocean = this.add
          .sprite(x, y, "ocean")
          .play({ key: "ocean", repeat: -1 });
        ocean.setDepth(-2000);
      }
    }
    // const sprite = this.add.sprite(500, 300).play({ key: 'Magnum Break', repeat: -1 }).setScale(6);

    // const shader = this.add.shader("water", 0, 0, 1280, 720);
    // shader.setDepth(-500);
    this.island =new GameImage(this, new Phaser.Math.Vector2(0, 0), "island", -100);
    new GameImage(this, new Phaser.Math.Vector2(-10, -50), "tree");
    new GameImage(this, new Phaser.Math.Vector2(50, -30), "flower");
    new GameImage(this, new Phaser.Math.Vector2(25, 45), "flower");
    new GameImage(this, new Phaser.Math.Vector2(-25, 30), "flower");
    new GameImage(this, new Phaser.Math.Vector2(-50, 0), "rock");
    new GameImage(this, new Phaser.Math.Vector2(-20, 25), "rock");
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
    this.bottleHandler.replyBottle();
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
    this.cameras.main.startFollow(this.island.image, false, 0.4, 0.4);
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
