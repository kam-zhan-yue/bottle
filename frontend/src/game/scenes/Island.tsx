import { Scene } from 'phaser';

export class Island extends Scene {
    constructor() {
        super({ key: 'Island' });
    }

    preload() {
        // this.load.glsl('stars', '/game/shaders/stars.glsl');
    }

    update(time: number, delta: number) {
      console.log('island update ', time, delta);
    }
}
