/*
Brannon Eakles
Endless Joyride
Notes:
    - endless runner but you also have to shoot bad guys i guess
    - use the gun to both shoot obstacles and launch yourself

Menu music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-feed-the-machine-classic-arcade-game-116846/"
Gameplay music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-play-again-classic-arcade-game-116820/"
*/

// configuration for the game
let gameConfiguration = {
    type: Phaser.AUTO,
    gameSpeed: 1, // how fast the game runs independently of the delta
    gravity: 1000, // how fast the player approaches the ground
    scrollSpeed: 1, // how fast the game obstacles will approach the player
    width: 1280, // width of the game in pixels
    height: 720, // height of the game in pixels
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

// global variables to track through the game's scenes
let globalVariables = {
    highScore: 0,           // tracks the highest score achieved by the player.
    currentScore: 0,        // tracks the current score of the player.
    // gameState: "Menu",   // tracks the current state of the game.
    // framerate: 60        // the framerate the game will run at.
    gameDelta: 0            // ensures that the game's runtime is not negatively affected by the system's performance (refresh rate, etc)
}

// keybinds for the game
let keybinds = {
    keySpace: null,
    keyA: null,
    keyD: null,

    keyW: null,
    keyR: null,
}

let phaserGame = new Phaser.Game(gameConfiguration);