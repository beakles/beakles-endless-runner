class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.properties = {
            rotation: 'horizontal'
        }

        // scene.physics.add.existing(this);
        // this.setImmovable(true);
        // this.setPushable(false);

        // this.depth = 1;
    }

    preload() {

    }

    create() {

    }

    update() {
        this.x -= 300 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);
    }
}