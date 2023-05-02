class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {

    }

    create() {
        let menuFontConfiguration = {

        }
        
        keybinds.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keybinds.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keybinds.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keybinds.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
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