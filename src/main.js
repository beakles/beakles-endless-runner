/*
Name: Brannon Eakles
Game Title: Balloon Air Ride
Approximate hours spent on the project: ~24 hours or so
Creative Tilt Justification:
I feel really proud of the difficulty scaling coupled with the "shield" powerup that spawns every so often to help the player out as the game gets more difficult.
It's not so difficult as to be frustrating, but not so easy as to become boring very quickly. I think it's a very solid gameplay loop.
I also enjoy the "death effect" where time slows down for a brief moment to highlight where the player died and made a mistake before showing their score.
The player movement also feels really smooth and fluid, and I am quite satisfied with it.
I didn't really use the class examples as much as I thought I would (more as little guidance where I wasn't sure where to start with a particular aspect of the game),
I just wanted to see what I could do with the knowledge I had in creating an endless runner game.

The above features I mentioned can be found in Game.js (line 253) and Player.js (the update() function).

I think the visual style works well enough for what I wanted to accomplish. I originally wanted to create a person with a gun that must dodge the obstacles while also shooting enemies approaching from behind,
but I wasn't really sure how to implement it in a way that would be fun and engaging and not frustrating and overwhelming. In the end, I settled on having a sentient balloon having escaped from an experiment and is now trying
to find a way to reach the outside without perishing. I think the pixel-art style works well for the theme I am trying to go for,
just some flash game you find on the internet that you play around with for a bit before moving on to something else.


CREDITS

Artwork: Brannon Eakles
Sound effects: Brannon Eakles via jsfxr
Coding: Brannon Eakles
Sound effects created via jsfxr: "https://sfxr.me/"
Menu music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-feed-the-machine-classic-arcade-game-116846/"
Gameplay music by Dream-Protocol from Pixabay: "https://pixabay.com/music/video-games-play-again-classic-arcade-game-116820/"
Phaser API documentation extensively used for the project: "https://newdocs.phaser.io/docs/3.60.0"
Inspired by the game "Jetpack Joyride" developed by Halfbrick Studios
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