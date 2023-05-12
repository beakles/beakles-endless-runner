/*
Brannon Eakles
Endless Joyride
Notes:
    - endless runner but you also have to shoot bad guys i guess
    - use the gun to both shoot obstacles and launch yourself

Menu music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-feed-the-machine-classic-arcade-game-116846/"
Gameplay music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-play-again-classic-arcade-game-116820/"
*/

let gameConfiguration = {
    type: Phaser.AUTO,
    gameSpeed: 1,
    gravity: 1000,
    scrollSpeed: 1,
    width: 1280,
    height: 720,
    scene: [Menu, Game],
    /*
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
    */
}

let globalVariables = {
    highScore: 0,       // tracks the highest score achieved by the player.
    currentScore: 0,    // tracks the current score of the player.
    // gameState: "Menu",  // tracks the current state of the game.
    // framerate: 60       // the framerate the game will run at.
    gameDelta: 0
}

let keybinds = {
    keyW: null,
    keyR: null,
    keyM: null
}

let phaserGame = new Phaser.Game(gameConfiguration);