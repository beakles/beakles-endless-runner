class Game extends Phaser.Scene {
    constructor() {
        super("sceneGame");
    }

    preload() {
        this.load.image('labBackground', './assets/labBackground.png');
        this.load.image('playerCharacterMidRun', './assets/playerCharacter.png');
        this.load.image('playerCharacterRunLeft', './assets/playerCharacterRunLeft.png');
        this.load.image('playerCharacterRunRight', './assets/playerCharacterRunRight.png');
        this.load.image('playerCharacterDead', './assets/playerCharacterDead.png');
        this.load.image('playerCharacterRise', './assets/playerCharacterRise.png');
        this.load.image('playerCharacterFall', './assets/playerCharacterFall.png');

        this.load.image('powerupShield', './assets/playerShield.png');

        this.load.image('laserTrap', './assets/laserTrap.png');
        this.load.image('laserTrapVertical', './assets/laserTrapVertical.png');

        this.load.audio('balloonStep', './assets/balloonStep.wav');
        this.load.audio('balloonInjured', './assets/balloonInjured.wav');
        this.load.audio('balloonDead', './assets/balloonDead.wav');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'labBackground').setOrigin(0, 0);
        this.background.depth = 1;

        this.deathFlash = this.add.rectangle(0, 0, gameConfiguration.width, gameConfiguration.height, 0xFFFFFF, 1).setOrigin(0, 0);
        this.deathFlash.alpha = 0;
        this.deathFlash.depth = 4;

        keybinds.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keybinds.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keybinds.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keybinds.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keybinds.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.playerSprite = new Player(this, gameConfiguration.width / 2, gameConfiguration.height / 2, 'playerCharacterMidRun', 0).setOrigin(0, 0);

        this.playerSprite.x -= this.playerSprite.width / 2;

        this.playerSprite.depth = 3;

        this.obstacleArray = [];
        this.enemyArray = [];

        this.obstacleTimer = 0;
        this.enemyTimer = 0;
    }

    checkCollision(object1, object2) {
        return object1.x + 20 < object2.x + object2.width
        && object1.x + object1.width - 40 > object2.x
        && object1.y + 20 < object2.y + object2.height
        && object1.y + object1.height - 20 > object2.y;
    }

    update(time, delta) {
        globalVariables.gameDelta = 1000 / delta;

        this.obstacleTimer += 1 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        this.background.tilePositionX += 300 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        if (this.deathFlash.alpha > 0) {
            this.deathFlash.alpha -= 2 * (1 / globalVariables.gameDelta);
        } else {
            this.deathFlash.alpha = 0;
        }

        if (this.playerSprite.stats.health > 0) {
            if (gameConfiguration.gameSpeed < 2) {
                gameConfiguration.gameSpeed += 1 / 100 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
            } else {
                gameConfiguration.gameSpeed = 2;
            }
        } else {
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
        }

        this.playerSprite.update();

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

        for (let obstacleArrayItem = 0; obstacleArrayItem < this.obstacleArray.length; obstacleArrayItem += 1) {
            let currentObstacleArrayItem = this.obstacleArray[obstacleArrayItem];
            currentObstacleArrayItem.update();

            if (this.playerSprite.stats.health > 0 && this.checkCollision(this.playerSprite, currentObstacleArrayItem)) {
                this.deathFlash.alpha = 1;

                this.playerSprite.stats.health -= 1;
                this.playerSprite.lastAngleChange = this.playerSprite.angle * 10;

                gameConfiguration.gameSpeed = 1 / 10;
            }

            if (currentObstacleArrayItem.x <= 0 - currentObstacleArrayItem.width) {
                this.obstacleArray.splice(obstacleArrayItem, 1);
                currentObstacleArrayItem.destroy();
            }
        }
    }
}