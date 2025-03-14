import { Scene } from 'phaser';

export class Boot extends Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    preload() {
    }

    create() {
        this.scene.start('Island');
    }
}
