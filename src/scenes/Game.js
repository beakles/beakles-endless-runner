class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
    }

    preload() {

    }

    create() {

    }

    update(time, delta) {
        this.currentFPS = framerate / delta;
    }
}