class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.type = 'hurt';
    }

    preload() {

    }

    create() {

    }

    update() {
        this.x -= 300 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);
    }
}