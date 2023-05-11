class Game extends Phaser.Scene {
    constructor() {
        super("sceneGame");
    }

    preload() {

    }

    create() {

        keybinds.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keybinds.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keybinds.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keybinds.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.playerSprite = new Player(this, gameConfiguration.width / 2, gameConfiguration.height / 2, '', 0);
        this.enemySprite = new Enemy(this, gameConfiguration.width / 4, gameConfiguration.height / 2, '', 0);

        this.obstacleArray = [];
        this.enemyArray = [];

        this.obstacleTimer = 0;
        this.enemyTimer = 0;
    }

    update(time, delta) {
        globalVariables.gameDelta = 1000 / delta;

        this.obstacleTimer += 1 * (gameConfiguration.gameSpeed / globalVariables.gameDelta);

        this.playerSprite.update();
        this.enemySprite.update();

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyA)) {
            // this.playerSprite.x = (gameConfiguration.width / 2) - (gameConfiguration.width / 4);//  - (gameConfiguration.height / 4);
        }

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyD)) {
            // this.playerSprite.x = (gameConfiguration.width / 2);//  + (gameConfiguration.height / 4);
        }

        if (this.obstacleTimer >= 1 / 10) {
            // console.log("spawn obstacle");
            this.obstacleTimer = 0;
            let newObstacle = new Enemy(this, gameConfiguration.width + 30, Phaser.Math.Between(0 + 30, gameConfiguration.height - 30), '', 0);
            this.obstacleArray.push(newObstacle);
            // console.log(this.obstacleArray);
        }

        for (let obstacleArrayItem = 0; obstacleArrayItem < this.obstacleArray.length; obstacleArrayItem += 1) {
            // console.log(this.obstacleArray[obstacleArrayItem].x);
            let currentObstacleArrayItem = this.obstacleArray[obstacleArrayItem];
            currentObstacleArrayItem.x -= 500  * (gameConfiguration.gameSpeed / globalVariables.gameDelta);
            if (currentObstacleArrayItem.x <= 0 - 30) {
                // console.log("destroy obstacle");
                // console.log("current array and array item:", this.obstacleArray, obstacleArrayItem);
                this.obstacleArray.splice(obstacleArrayItem, 1);
                currentObstacleArrayItem.destroy();
                // console.log("current array and array item after splice:", this.obstacleArray, obstacleArrayItem);
            }
            // this.obstacleArray[obstacleArrayItem].update();
        }

        /*
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyW)) {
            console.log("W key");
        }
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyA)) {
            console.log("A key");
        }
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyS)) {
            console.log("S key");
        }
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyD)) {
            console.log("D key");
        }
        */
    }
}