class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.depth = 1;

        this.stats = {
            health: 100,
            speed: 160,
            jumpStrength: 5,
            jumpCount: 1,
            damage: 20,
            status: 'alive'
        }

        this.attackDebounce = false;
        this.fallVelocity = 0;
        this.touchingGround = false;
        // this.jumpCounter = 0;
        // this.flyDebounce = 0;
    }

    preload() {

    }

    create() {

    }

    update() {
        // console.log(`player position: ${this.y}`);
        // console.log(`fall velocity: ${this.fallVelocity}`);

        /*
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyW) && this.jumpCounter < this.stats.jumpCount) {
            this.fallVelocity = 0 - this.stats.jumpStrength;
            this.jumpCounter += 1;
        }
        */
        /*
        if (keybinds.keyS.isDown && !this.touchingGround && this.stats.health > 0) {
            // console.log("falling faster");
            this.fallVelocity += 1 / 4;
        }

        if (keybinds.keyW.isDown && this.stats.health > 0) {
            // console.log("falling slower");
            this.fallVelocity -= 1 / 4;
        }
        */

        if (this.fallVelocity <= -5) {
            this.fallVelocity = -5;
        }

        this.fallVelocity += gameConfiguration.gravity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        this.y += this.fallVelocity;

        if (this.y >= gameConfiguration.height - 30) {
            this.fallVelocity = 0;
            this.y = gameConfiguration.height - 30;

            // this.jumpCounter = 0;
            this.touchingGround = true;
        } else if (this.y <= 0 + 30) {
            this.fallVelocity = 0;
            this.y = 0 + 30;

            this.touchingGround = true;
        } else {
            this.touchingGround = false;
        }
    }
}