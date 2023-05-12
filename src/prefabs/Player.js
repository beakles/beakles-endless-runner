class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.depth = 2;

        this.stats = {
            health: 1,
            speed: 160,
            jumpStrength: 2500,
            jumpCount: 1,
            damage: 20,
            status: 'alive'
        }

        // this.attackDebounce = false;
        this.fallVelocity = 0;
        this.touchingGround = false;
        this.animationTime = 0;
        // this.jumpCounter = 0;
        // this.flyDebounce = 0;
    }

    preload() {

    }

    create() {

    }

    update() {
        this.animationTime += 1 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

        this.fallVelocity += gameConfiguration.gravity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

        if (this.stats.health <= 0) {
            this.stats.status = 'dead';
        } else {
            this.stats.status = 'alive';
        }

        if (this.stats.status == 'alive') {
            if (keybinds.keyW.isDown) {
                this.fallVelocity -= this.stats.jumpStrength / globalVariables.gameDelta;
                if (this.fallVelocity < -1000) {
                    this.fallVelocity = -1000;
                }
            }
        }

        this.y += this.fallVelocity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

        if (this.y <= 0 + this.height / 2 + 40) {
            this.fallVelocity = 0;
            this.y = 0 + this.height / 2 + 40;
        }

        if (this.y >= gameConfiguration.height - this.height / 2 - 40) {
            this.touchingGround = true;
            this.fallVelocity = 0;
            this.y = gameConfiguration.height - this.height / 2 - 40;
        } else {
            this.touchingGround = false;
        }
        
        if (this.stats.status == 'alive') {
            if (this.touchingGround) {
                if (this.animationTime > 0.6) {
                    this.animationTime = 0;
                    this.setTexture('playerCharacterMidRun');
                } else if (this.animationTime > 0.45) {
                    this.setTexture('playerCharacterRunLeft');
                } else if (this.animationTime > 0.3) {
                    this.setTexture('playerCharacterMidRun');
                } else if (this.animationTime > 0.15) {
                    this.setTexture('playerCharacterRunRight');
                }
            } else {
                if (this.fallVelocity < 0) {
                    this.setTexture('playerCharacterRise');
                } else if (this.fallVelocity > 0) {
                    this.setTexture('playerCharacterFall');
                } else {
                    this.setTexture('playerCharacterMidRun');
                }
            }
        } else if (this.stats.status == 'dead') {
            this.setTexture('playerCharacterDead');
            this.angle += 100 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);
        }

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
            this.fallVelocity += 1 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        }

        if (keybinds.keyW.isDown && this.stats.health > 0) {
            // console.log("falling slower");
            this.fallVelocity -= 10000 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        }

        if (this.fallVelocity <= -500) {
            this.fallVelocity = -500;
        }

        this.fallVelocity += gameConfiguration.gravity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        this.y += this.fallVelocity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

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
        */
    }
}