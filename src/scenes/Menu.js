class Menu extends Phaser.Scene {
    constructor() {
        super("sceneMenu");
    }

    preload() {

        // load the menu background
        this.load.image('labBackground', './assets/labBackground.png');

        // load the menu music and interaction sound
        this.load.audio('menuMusic', './assets/feed-the-machine-classic-arcade-game-116846.mp3');
        this.load.audio('menuInteract', './assets/menuSound.wav');
    }

    create() {

        // play the menu music
        this.titleMusic = this.sound.add('menuMusic');
        this.titleMusic.setVolume(0.5);
        this.titleMusic.setLoop(true);
        this.titleMusic.play();

        // create the background
        this.background = this.add.tileSprite(0, 0, 1280, 720, 'labBackground').setOrigin(0, 0);
        this.background.depth = 1;

        // add a fade over the background
        this.fade = this.add.rectangle(0, 0, gameConfiguration.width, gameConfiguration.height, 0xFFFFFF, 1).setOrigin(0, 0);
        this.fade.alpha = 0.5;
        this.fade.depth = 2;

        // properties for the title text
        let titleTextProperties = {
            fontFamily: 'CourierBold',
            fontSize: '48px',
            backgroundColor: '#202020FF',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            // fixedWidth: 100,
            stroke: '#000000',
            strokeThickness: 0
        }

        // create text for the title, controls, credits, and play
        this.titleText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 4, 'BALLOON AIR RIDE', titleTextProperties).setOrigin(0.5, 0.5);
        this.titleText.depth = 3;
        this.titleText.alpha = 1;

        this.controlsText = this.add.text(gameConfiguration.width / 2 - (gameConfiguration.width / 4), gameConfiguration.height / 1.75, '(A) CONTROLS', titleTextProperties).setOrigin(0.5, 0.5);
        this.controlsText.depth = 3;
        this.controlsText.alpha = 1;

        this.creditsText = this.add.text(gameConfiguration.width / 2 + (gameConfiguration.width / 4), gameConfiguration.height / 1.75, 'CREDITS (D)', titleTextProperties).setOrigin(0.5, 0.5);
        this.creditsText.depth = 3;
        this.creditsText.alpha = 1;

        this.playText = this.add.text(gameConfiguration.width / 2, gameConfiguration.height / 1.25, '(SPACE) PLAY (SPACE)', titleTextProperties).setOrigin(0.5, 0.5);
        this.playText.depth = 3;
        this.playText.alpha = 1;

        // create keybinds
        keybinds.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keybinds.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keybinds.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // track the menu the player is currently in
        this.currentMenu = 'title';

        // text presets for each menu in the title scene
        this.textPresets = {
            title: {
                titleText: 'BALLOON AIR RIDE',
                controlsText: '(A) CONTROLS',
                creditsText: 'CREDITS (D)',
                playText: '(SPACE) PLAY (SPACE)'
            },
            controls: {
                titleText: 'CONTROLS',
                controlsText: '(W) FLY UP\n(R) RESTART\n(SPACE) RETURN TO MENU',
                creditsText: 'TITLE (D)',
                playText: 'Dodge obstacles and collect shields to get as far as you can.\n\nShields can block one source of damage, and cannot accumulate.'
            },
            credits: {
                titleText: 'CREDITS',
                controlsText: '(A) TITLE',
                creditsText: 'Artwork: Brannon Eakles\nSound effects: Brannon Eakles via jsfxr\nCoding: Brannon Eakles',
                playText: 'Sound effects created via jsfxr:\n"https://sfxr.me/"\nMenu music by Dream-Protocol from Pixabay:\n"https://pixabay.com/music/video-games-feed-the-machine-classic-arcade-game-116846/"\nGameplay music by Dream-Protocol from Pixabay:\n"https://pixabay.com/music/video-games-play-again-classic-arcade-game-116820/"\nPhaser API documentation extensively used for the project:\n"https://newdocs.phaser.io/docs/3.60.0"\nInspired by the game "Jetpack Joyride" developed by Halfbrick Studios'
            }
        }
    }

    update(time, delta) {

        // move to the game scene
        if (Phaser.Input.Keyboard.JustDown(keybinds.keySpace) && this.currentMenu == 'title') {
            this.titleMusic.stop();
            this.sound.play('menuInteract');
            this.scene.start('sceneGame');
        }

        // change the text on the screen based on what "menu" the player is currently in
        if (Phaser.Input.Keyboard.JustDown(keybinds.keyA)) {
            if (this.currentMenu == 'title') {
                this.sound.play('menuInteract');

                this.currentMenu = 'controls';

                this.titleText.text = this.textPresets.controls.titleText;
                this.controlsText.text = this.textPresets.controls.controlsText;
                this.controlsText.setFontSize('32px');
                this.creditsText.text = this.textPresets.controls.creditsText;
                this.creditsText.setFontSize('32px');
                this.playText.text = this.textPresets.controls.playText;
                this.playText.setFontSize('32px');
            } else if (this.currentMenu == 'credits') {
                this.sound.play('menuInteract');

                this.currentMenu = 'title';

                this.titleText.text = this.textPresets.title.titleText;
                this.controlsText.text = this.textPresets.title.controlsText;
                this.controlsText.setFontSize('48px');
                this.creditsText.text = this.textPresets.title.creditsText;
                this.creditsText.setFontSize('48px');
                this.creditsText.y += 100;
                this.playText.text = this.textPresets.title.playText;
                this.playText.setFontSize('48px');
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keybinds.keyD)) {
            if (this.currentMenu == 'controls') {
                this.sound.play('menuInteract');

                this.currentMenu = 'title';

                this.titleText.text = this.textPresets.title.titleText;
                this.controlsText.text = this.textPresets.title.controlsText;
                this.controlsText.setFontSize('48px');
                this.creditsText.text = this.textPresets.title.creditsText;
                this.creditsText.setFontSize('48px');
                this.playText.text = this.textPresets.title.playText;
                this.playText.setFontSize('48px');
            } else if (this.currentMenu == 'title') {
                this.sound.play('menuInteract');

                this.currentMenu = 'credits';

                this.titleText.text = this.textPresets.credits.titleText;
                this.controlsText.text = this.textPresets.credits.controlsText;
                this.controlsText.setFontSize('32px');
                this.creditsText.text = this.textPresets.credits.creditsText;
                this.creditsText.setFontSize('32px');
                this.creditsText.y -= 100;
                this.playText.text = this.textPresets.credits.playText;
                this.playText.setFontSize('24px');
            }
        }
    }
}