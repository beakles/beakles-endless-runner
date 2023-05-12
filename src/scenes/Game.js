class Game extends Phaser.Scene {
    constructor() {
        super("sceneGame");
    }

    preload() {
        this.load.image('laserTrap', './assets/laserTrap.png');
        this.load.image('playerCharacterMidRun', './assets/playerCharacter.png');
        this.load.image('playerCharacterRunLeft', './assets/playerCharacterRunLeft.png');
        this.load.image('playerCharacterRunRight', './assets/playerCharacterRunRight.png');
        this.load.image('playerCharacterDead', './assets/playerCharacterDead.png');
        this.load.image('playerCharacterRise', './assets/playerCharacterRise.png');
        this.load.image('playerCharacterFall', './assets/playerCharacterFall.png');
        this.load.image('powerupShield', './assets/playerShield.png');
    }

    create() {

        this.background = this.add.rectangle(0, 0, gameConfiguration.width, gameConfiguration.height, 0x404040, 1).setOrigin(0, 0);
        this.background.depth = 0;

        this.deathFlash = this.add.rectangle(0, 0, gameConfiguration.width, gameConfiguration.height, 0xFFFFFF, 1).setOrigin(0, 0);
        this.deathFlash.alpha = 0;
        this.deathFlash.depth = 3;

        keybinds.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keybinds.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keybinds.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keybinds.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.playerSprite = new Player(this, gameConfiguration.width / 2, gameConfiguration.height / 2, 'playerCharacterMidRun', 0).setOrigin(0.5, 0.5);

        this.obstacleArray = [];
        this.enemyArray = [];

        this.obstacleTimer = 0;
        this.enemyTimer = 0;
    }

    checkCollision(object1, object2) {
        if (object1.x < object2.x + object2.width / 2 && object1.x + object1.width / 2 > object2.x && object1.y < object2.y + object2.height / 2 && object1.height / 2 + object1.y > object2.y) {
            return true;
        }
        return false;
    }

    update(time, delta) {
        globalVariables.gameDelta = 1000 / delta;

        console.log(gameConfiguration.gameSpeed);

        this.obstacleTimer += 1 * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);

        if (this.deathFlash.alpha > 0) {
            this.deathFlash.alpha -= 2 * (1 / globalVariables.gameDelta);
        } else {
            this.deathFlash.alpha = 0;
        }

        if (this.playerSprite.stats.health > 0) {
            if (gameConfiguration.gameSpeed < 2) {
                gameConfiguration.gameSpeed += 1 / 1 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
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
        // this.enemySprite.update();

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyA)) {
            // this.playerSprite.x = (gameConfiguration.width / 2) - (gameConfiguration.width / 4);//  - (gameConfiguration.height / 4);
        }

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyR)) {
            // this.playerSprite.x = (gameConfiguration.width / 2);//  + (gameConfiguration.height / 4);
        }

        if (this.obstacleTimer >= 2) {
            this.obstacleTimer = 0;
            let newObstacle = new Obstacle(this, gameConfiguration.width * 2, 0, '', 0).setOrigin(0.5, 0.5);
            let randomRotation = Phaser.Math.Between(0, 3);
            if (randomRotation == 0) {
                newObstacle.angle = 0;
                newObstacle.y = Phaser.Math.Between(0 + newObstacle.height, gameConfiguration.height - newObstacle.height);
            } else if (randomRotation == 1) {
                newObstacle.angle = -45;
                newObstacle.y = Phaser.Math.Between(0 + newObstacle.width / 2 - newObstacle.height / 2, gameConfiguration.height - newObstacle.width / 2 + newObstacle.height / 2);
            } else if (randomRotation == 2) {
                newObstacle.angle = 45;
                newObstacle.y = Phaser.Math.Between(0 + newObstacle.width / 2 - newObstacle.height / 2, gameConfiguration.height - newObstacle.width / 2 + newObstacle.height / 2);
            } else {
                newObstacle.angle = 90;
                newObstacle.y = Phaser.Math.Between(0 + newObstacle.width / 2, gameConfiguration.height - newObstacle.width / 2);
            }
            newObstacle.x = gameConfiguration.width + newObstacle.width / 2;
            this.obstacleArray.push(newObstacle);
        }

        for (let obstacleArrayItem = 0; obstacleArrayItem < this.obstacleArray.length; obstacleArrayItem += 1) {
            // console.log(this.obstacleArray[obstacleArrayItem].x);
            let currentObstacleArrayItem = this.obstacleArray[obstacleArrayItem];
            currentObstacleArrayItem.x -= 500  * (gameConfiguration.gameSpeed * gameConfiguration.scrollSpeed / globalVariables.gameDelta);
            if (this.checkCollision(this.playerSprite, currentObstacleArrayItem)) {
                console.log('hit something');
            }
            /*
            if (this.playerSprite.stats.health > 0) {
                this.playerSprite.stats.health = 0;

                gameConfiguration.gameSpeed = 1 / 10;
                this.deathFlash.alpha = 1;
            }
            */
            if (currentObstacleArrayItem.x <= 0 - currentObstacleArrayItem.width / 2) {
                this.obstacleArray.splice(obstacleArrayItem, 1);
                currentObstacleArrayItem.destroy();

            }
        }
    }
}