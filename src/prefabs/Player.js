class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);

        this.parentScene = scene;

        this.stats = {
            health: 1,
            speed: 160,
            jumpStrength: 2500,
            jumpCount: 1,
            damage: 20,
            status: 'alive'
        }

        this.fallVelocity = 0;
        this.touchingGround = false;
        this.animationTime = 0;

        this.lastAngleChange = 0;

        this.balloonStep = this.parentScene.sound.add('balloonStep');
        this.balloonFly = this.parentScene.sound.add('balloonFly');
        this.balloonFly.setLoop(true);
        this.balloonImpact = this.parentScene.sound.add('balloonImpact');
        // this.balloonInjured = this.parentScene.sound.add('balloonInjured');
        // this.balloonDead = this.parentScene.sound.add('balloonDead');

        this.balloonStepDebounce = false;
        this.balloonImpactDebounce = false;
        // this.balloonInjuredDebounce = false;
        // this.balloonDeadDebounce = false;
    }

    preload() {

    }

    create() {

    }

    update() {
        this.animationTime += 1 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

        if (this.stats.health > 0) {
            this.fallVelocity += gameConfiguration.gravity / globalVariables.gameDelta;
        } else {
            this.fallVelocity += gameConfiguration.gravity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        }

        if (this.stats.health <= 0) {
            this.stats.status = 'dead';
            this.setOrigin(0.5, 0.5);
        } else {
            this.stats.status = 'alive';
            this.setOrigin(0, 0);
        }

        if (this.stats.status == 'alive') {
            if (keybinds.keyW.isDown) {
                this.fallVelocity -= this.stats.jumpStrength / globalVariables.gameDelta;
                if (this.fallVelocity < -1000) {
                    this.fallVelocity = -1000;
                }

                if (!this.balloonFly.isPlaying) {
                    this.balloonFly.play();
                }
            } else {
                if (this.balloonFly.isPlaying) {
                    this.balloonFly.stop();
                }
            }
        }

        if (this.stats.health > 0) {
            this.y += this.fallVelocity / globalVariables.gameDelta;
        } else {
            this.y += this.fallVelocity * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
        }

        if (this.y <= 0) {
            this.fallVelocity = 0;
            this.y = 0;

            if (!this.balloonImpactDebounce && this.stats.health <= 0) {
                this.balloonImpactDebounce = true;
                this.balloonImpact.play();
            } else {
                this.balloonImpactDebounce = false;
            }
        }

        if (this.y >= gameConfiguration.height - this.height - 40) {
            this.touchingGround = true;
            this.fallVelocity = 0;
            this.y = gameConfiguration.height - this.height - 40;
        } else {
            this.touchingGround = false;
        }
        
        if (this.stats.status == 'alive') {
            if (this.touchingGround) {
                this.angle = 0;
                if (this.animationTime > 0.6) {
                    this.animationTime = 0;
                    this.setTexture('playerCharacterMidRun');
                    this.balloonStepDebounce = false;
                } else if (this.animationTime > 0.45) {
                    this.setTexture('playerCharacterRunLeft');
                    if (!this.balloonStepDebounce) {
                        this.balloonStepDebounce = true;
                        this.balloonStep.play();
                    }
                } else if (this.animationTime > 0.3) {
                    this.setTexture('playerCharacterMidRun');
                    this.balloonStepDebounce = false;
                } else if (this.animationTime > 0.15) {
                    this.setTexture('playerCharacterRunRight');
                    if (!this.balloonStepDebounce) {
                        this.balloonStepDebounce = true;
                        this.balloonStep.play();
                    }
                }
            } else {
                this.angle = this.fallVelocity / 100;
                if (this.fallVelocity < 0) {
                    this.setTexture('playerCharacterRise');
                } else if (this.fallVelocity > 0) {
                    this.setTexture('playerCharacterFall');
                } else {
                    this.setTexture('playerCharacterMidRun');
                    this.angle = Phaser.Math.Between(-2, 2);
                }
            }
        } else if (this.stats.status == 'dead') {
            this.setTexture('playerCharacterDead');
            if (this.balloonFly.isPlaying) {
                this.balloonFly.stop();
            }
            if (this.touchingGround) {
                if (!this.balloonImpactDebounce) {
                    this.balloonImpactDebounce = true;
                    this.balloonImpact.play();
                }
                this.angle += 200 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);
            } else {
                this.angle += this.lastAngleChange * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
                this.balloonImpactDebounce = false;
            }
        }
    }
}