class Menu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }

    preload() {

    }

    create() {
        let menuFontConfiguration = {

        }
    }

    update(time, delta) {
        // this.currentFramesPerSecond = framerate / delta;
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
    }
}