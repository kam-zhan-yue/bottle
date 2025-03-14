import { Scene } from "phaser";
import { EventBus } from "../../EventBus";

export class Island extends Scene {
  public title: string;
  public elapsedTime: number;

  constructor() {
    super({ key: "Island" });
    this.title = "This is a title";
    this.elapsedTime = 0;
  }

  preload() {
    // this.load.glsl('stars', '/game/shaders/stars.glsl');
  }

  update(_time: number, delta: number) {
    this.elapsedTime += delta;
    EventBus.emit("update", this.elapsedTime);
  }
}
