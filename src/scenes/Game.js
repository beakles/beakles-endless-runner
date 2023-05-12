class Game extends Phaser.Scene {
    constructor() {
        super("sceneGame");
    }

    preload() {

        // load images
        this.load.image('labBackground', './assets/labBackground.png');
        this.load.image('playerCharacterMidRun', './assets/playerCharacter.png');
        this.load.image('playerCharacterRunLeft', './assets/playerCharacterRunLeft.png');
        this.load.image('playerCharacterRunRight', './assets/playerCharacterRunRight.png');
        this.load.image('playerCharacterDead', './assets/playerCharacterDead.png');
        this.load.image('playerCharacterRise', './assets/playerCharacterRise.png');
        this.load.image('playerCharacterFall', './assets/playerCharacterFall.png');

        this.load.image('powerupShield', './assets/playerShield.png');
        this.load.image('powerupShieldPickup', './assets/playerShieldPickup.png');

        this.load.image('laserTrap', './assets/laserTrap.png');
        this.load.image('laserTrapVertical', './assets/laserTrapVertical.png');

        // load sounds
        this.load.audio('balloonStep', './assets/balloonStep.wav');
        this.load.audio('balloonFly', './assets/balloonFly.wav');
        this.load.audio('balloonImpact', './assets/balloonImpact.wav');
        this.load.audio('balloonInjured', './assets/balloonInjured.wav');
        this.load.audio('balloonDead', './assets/balloonDead.wav');

        this.load.audio('pickupShield', './assets/pickupShield.wav');

        this.load.audio('menuInteract', './assets/menuSound.wav');
        this.load.audio('newHighScore', './assets/newHighScore.wav');

        this.load.audio('gameplayMusic', './assets/play-again-classic-arcade-game-116820.mp3');
    }

    create() {
        this.gameMusic = this.sound.add('gameplayMusic');
        this.gameMusic.setVolume(0.5);
        this.gameMusic.setLoop(true);
        this.gameMusic.play();

        this.background = this.add.tileSprite(0, 0, 1280, 720, 'labBackground').setOrigin(0, 0);
        this.background.depth = 1;

        this.hurtFlash = this.add.rectangle(0, 0, gameConfiguration.width, gameConfiguration.height, 0xFFFFFF, 1).setOrigin(0, 0);
        this.hurtFlash.alpha = 0;
        this.hurtFlash.depth = 4;

        let resultTextProperties = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#00000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 5
        }

        let currentScoreTextProperties = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#00000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 0,
                bottom: 0,
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 5
        }

        let finalScoreTextProperties = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#FF8080FF',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
                left: 5,
                right: 5
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 5
        }

        let newBestTextProperties = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#80FF80FF',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 5
        }

        let nextOptionTextProperties = {
            fontFamily: 'Courier',
            fontSize: '32px',
            backgroundColor: '#00000000',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 0,
                bottom: 0,
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 4
        }

        this.resultText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 4, 'THE BALLOON HAS PERISHED\n\nYOUR SCORE', resultTextProperties).setOrigin(0.5, 0.5);
        this.resultText.depth = 5;
        this.resultText.alpha = 0;

        this.currentScoreText = this.add.text(0 + 50, 0 + 50, 'null', currentScoreTextProperties).setOrigin(0, 0);
        this.currentScoreText.depth = 5;

        this.finalScoreText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 1.75 - 75, 'null', finalScoreTextProperties).setOrigin(0.5, 0.5);
        this.finalScoreText.depth = 5;
        this.finalScoreText.alpha = 0;

        this.newBestText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 1.75 + 75, 'New best!', newBestTextProperties).setOrigin(0.5, 0.5);
        this.newBestText.depth = 5;
        this.newBestText.alpha = 0;

        this.nextOptionText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 1.25, 'Press (R) to try again or press (M) to return to the menu', nextOptionTextProperties).setOrigin(0.5, 0.5);
        this.nextOptionText.depth = 5;
        this.nextOptionText.alpha = 0;

        // assign keybinds
        keybinds.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keybinds.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keybinds.keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

        // create player
        this.playerSprite = new Player(this, gameConfiguration.width / 4, gameConfiguration.height / 2, 'playerCharacterMidRun', 0).setOrigin(0, 0);
        this.playerSprite.depth = 3;
        this.playerSprite.x -= this.playerSprite.width / 2;

        this.playerShield = new Obstacle(this, gameConfiguration.width / 2, gameConfiguration.height / 2, 'powerupShield', 0).setOrigin(0.5, 0.5);
        this.playerShield.depth = 3;

        // tables for sorting created entities
        this.obstacleArray = [];
        this.enemyArray = [];

        // timers for spawning entities
        this.obstacleTimer = 0;
        this.enemyTimer = 0;
        this.itemTimer = 0;

        // debounce checks
        this.playerInjuredDebounce = 0;
        this.gameSpeedDebounce = 0;
        this.menuDebounce = false;
        this.newBestDebounce = false;

        // current score tracker
        globalVariables.currentScore = 0;
    }

    // AABB collision check, with a bit of lenience for more "fair" gameplay
    checkCollision(object1, object2) {
        return object1.x + 20 < object2.x + object2.width
        && object1.x + object1.width - 40 > object2.x
        && object1.y + 20 < object2.y + object2.height
        && object1.y + object1.height - 20 > object2.y;
    }

    update(time, delta) {

        // adjust the game's speed according to the player's refresh rate
        globalVariables.gameDelta = 1000 / delta;

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyR)) {
            gameConfiguration.gameSpeed = 1;
            gameConfiguration.scrollSpeed = 1;
            this.gameMusic.stop();
            this.scene.restart();
        }

        // timer for when to spawn another obstacle
        this.obstacleTimer += 1 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        // timer for when to spawn another item
        this.itemTimer += 1 / globalVariables.gameDelta;

        // track distance travelled
        globalVariables.currentScore += 1 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        // update current distance
        this.currentScoreText.text = Math.floor(globalVariables.currentScore) + " M";
        if (Math.floor(globalVariables.currentScore >= globalVariables.highScore)) {
            this.currentScoreText.setColor('#80FF80FF');
        }

        // update final score
        this.finalScoreText.text = Math.floor(globalVariables.currentScore) + " Meters";

        // move the background
        this.background.tilePositionX += 300 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        // timer for when the player can take damage after getting hit
        if (this.playerInjuredDebounce > 0) {
            this.playerInjuredDebounce -= 1 / globalVariables.gameDelta;

            this.playerSprite.alpha = 0.5;
        } else {
            this.playerSprite.alpha = 1;
        }

        // timer for when to make the death flash completely disappear
        if (this.playerSprite.stats.health > 0) {
            if (this.hurtFlash.alpha > 0) {
                this.hurtFlash.alpha -= 2 * (1 / globalVariables.gameDelta);
            } else {
                this.hurtFlash.alpha = 0;
            }
        } else {
            if (this.hurtFlash.alpha > 0.5) {
                this.hurtFlash.alpha -= 2 * (1 / globalVariables.gameDelta);
            } else {
                this.hurtFlash.alpha = 0.5;
            }
        }

        // when the player is alive, the game's speed slowly goes up to 3x the base speed of 1x. escalating difficulty
        // when the player dies, the game slows down to 1/10th of the normal speed, then goes back up to base speed.
        if (this.playerSprite.stats.health > 0) {
            if (gameConfiguration.gameSpeed < 3) {
                gameConfiguration.gameSpeed += 1 / 100 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
            } else {
                gameConfiguration.gameSpeed = 3;
            }
        } else {
            if (this.gameSpeedDebounce >= 3) {
                if (!this.menuDebounce) {
                    this.menuDebounce = true;
                    this.sound.play('menuInteract');
                    this.resultText.alpha = 1;
                    this.finalScoreText.alpha = 1;
                    this.nextOptionText.alpha = 1;

                    this.gameMusic.volume = 0.5;
                }
                if (Math.floor(globalVariables.currentScore >= globalVariables.highScore)) {
                    if (!this.newBestDebounce) {
                        this.newBestDebounce = true;
                        this.sound.play('newHighScore');
                        this.newBestText.alpha = 1;
                    }

                    globalVariables.highScore = Math.floor(globalVariables.currentScore);
                }
                if (gameConfiguration.gameSpeed < 1) {
                    gameConfiguration.gameSpeed += 2 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
                } else {
                    gameConfiguration.gameSpeed = 1;
                }
                if (gameConfiguration.gameSpeed >= 1) {
                    if (gameConfiguration.scrollSpeed > 0) {
                        gameConfiguration.scrollSpeed -= 1 / 3 / globalVariables.gameDelta;
                    } else {
                        gameConfiguration.scrollSpeed = 0;
                    }
                }
            } else {
                this.gameSpeedDebounce += 1 / globalVariables.gameDelta;
            }
        }

        // update the player sprite
        this.playerSprite.update();

        // update the player shield based on how much health the player has
        this.playerShield.x = this.playerSprite.x + this.playerSprite.width / 2;
        this.playerShield.y = this.playerSprite.y + this.playerSprite.height / 2;
        if (this.playerSprite.stats.health > 1) {
            this.playerShield.alpha = 1;
        } else {
            this.playerShield.alpha = 0;
        }

        // randomly spawn one of five possible obstacle arrangements:
        // - the cross
        // - L-shape
        // - reverse L-shape
        // - single vertical
        // - single horizontal
        if (this.obstacleTimer >= 2) {
            this.obstacleTimer = 0;
            let randomShape = Phaser.Math.Between(0, 4);
            if (randomShape == 0) {
                let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrap', 0).setOrigin(0, 0);
                let newObstacle2 = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrapVertical', 0).setOrigin(0, 0);

                let randomYPosition = Phaser.Math.Between(0, gameConfiguration.height - newObstacle2.height);
                
                newObstacle.depth = 2;
                newObstacle2.depth = 2;

                newObstacle.x = gameConfiguration.width;
                newObstacle.y = 0 + newObstacle2.height / 2 - newObstacle.height / 2 + randomYPosition;

                newObstacle2.x = gameConfiguration.width + newObstacle.width / 2 - newObstacle2.width / 2;
                newObstacle2.y = 0 + randomYPosition;

                this.obstacleArray.push(newObstacle);
                this.obstacleArray.push(newObstacle2);
            } else if (randomShape == 1) {
                let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrap', 0).setOrigin(0, 0);

                let randomYPosition = Phaser.Math.Between(0, gameConfiguration.height - newObstacle.height);

                newObstacle.depth = 2;

                newObstacle.x = gameConfiguration.width;
                newObstacle.y = 0 + randomYPosition;

                this.obstacleArray.push(newObstacle);
            } else if (randomShape == 2) {
                let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrapVertical', 0).setOrigin(0, 0);

                let randomYPosition = Phaser.Math.Between(0, gameConfiguration.height - newObstacle.height);

                newObstacle.depth = 2;

                newObstacle.x = gameConfiguration.width;
                newObstacle.y = 0 + randomYPosition;

                this.obstacleArray.push(newObstacle);
            } else if (randomShape == 3) {
                let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrap', 0).setOrigin(0, 0);
                let newObstacle2 = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrapVertical', 0).setOrigin(0, 0);

                let randomYPosition = Phaser.Math.Between(0, gameConfiguration.height - newObstacle.height);
                let randomYPosition2 = Phaser.Math.Between(0, gameConfiguration.height - newObstacle2.height);
                
                newObstacle.depth = 2;
                newObstacle2.depth = 2;

                newObstacle.x = gameConfiguration.width + newObstacle2.width;
                newObstacle.y = 0 + randomYPosition;

                newObstacle2.x = gameConfiguration.width;
                newObstacle2.y = 0 + randomYPosition2;

                this.obstacleArray.push(newObstacle);
                this.obstacleArray.push(newObstacle2);
            } else if (randomShape == 4) {
                let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrap', 0).setOrigin(0, 0);
                let newObstacle2 = new Obstacle(this, gameConfiguration.width * 2, 0, 'laserTrapVertical', 0).setOrigin(0, 0);

                let randomYPosition = Phaser.Math.Between(0, gameConfiguration.height - newObstacle.height);
                let randomYPosition2 = Phaser.Math.Between(0, gameConfiguration.height - newObstacle2.height);
                
                newObstacle.depth = 2;
                newObstacle2.depth = 2;

                newObstacle.x = gameConfiguration.width;
                newObstacle.y = 0 + randomYPosition;

                newObstacle2.x = gameConfiguration.width + newObstacle.width;
                newObstacle2.y = 0 + randomYPosition2;

                this.obstacleArray.push(newObstacle);
                this.obstacleArray.push(newObstacle2);
            }
        }

        // spawn a shield item every so often
        if (this.itemTimer >= 30) {
            this.itemTimer = 0;
            let newItem = new Obstacle(this, gameConfiguration.width, gameConfiguration.height / 2, 'powerupShieldPickup', 0).setOrigin(0, 0);

            newItem.type = 'help';

            newItem.depth = 2;

            this.obstacleArray.push(newItem);
        }

        // update each obstacle present in the game
        for (let obstacleArrayItem = 0; obstacleArrayItem < this.obstacleArray.length; obstacleArrayItem += 1) {
            let currentObstacleArrayItem = this.obstacleArray[obstacleArrayItem];
            currentObstacleArrayItem.update();

            // player collision and injury management
            if (this.playerSprite.stats.health > 0 && this.checkCollision(this.playerSprite, currentObstacleArrayItem)) {
                if (currentObstacleArrayItem.type == 'help') {
                    this.obstacleArray.splice(obstacleArrayItem, 1);
                    currentObstacleArrayItem.destroy();

                    this.sound.play('pickupShield');

                    if (this.playerSprite.stats.health <= 1) {
                        this.playerSprite.stats.health += 1;
                    }
                } else {
                    if (this.playerInjuredDebounce <= 0) {

                        this.hurtFlash.alpha = 1;
    
                        this.playerSprite.stats.health -= 1;
    
                        if (this.playerSprite.stats.health <= 0) {
                            this.sound.play('balloonDead');
    
                            this.playerSprite.lastAngleChange = this.playerSprite.angle * 10;
    
                            gameConfiguration.gameSpeed = 1 / 10;

                            this.gameMusic.volume = 0.25;
    
                            this.currentScoreText.alpha = 0;
                        } else {
                            this.sound.play('balloonInjured');
    
                            this.playerInjuredDebounce = 5;
                        }
                    }
                }
            }

            // delete obstacles after they move off the visible screen
            if (currentObstacleArrayItem.x <= 0 - currentObstacleArrayItem.width) {
                this.obstacleArray.splice(obstacleArrayItem, 1);
                currentObstacleArrayItem.destroy();
            }
        }
    }
}