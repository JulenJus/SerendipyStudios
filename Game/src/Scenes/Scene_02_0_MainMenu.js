class Scene_02_0_MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
        console.log("MainMenu constructor")
    }

    create() {
        this.scene.get("MusicManager").music_play_MainMenu();

        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen').setOrigin(0, 0);
        this.add.sprite(35, 133, 'mainMenu_title').setOrigin(0, 0);

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(106, 460, 'mainMenu_buttonPlay_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 702, 'mainMenu_buttonHowToPlay_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 878, 'mainMenu_buttonCredits_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 1059, 'mainMenu_buttonExit_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(25, 13, 'mainMenu_buttonShop_static').setOrigin(0, 0).setScale(0.9).setInteractive());
        this.buttons.push(this.add.sprite(640, 13, 'mainMenu_buttonSettings_static').setOrigin(0, 0).setScale(0.65).setInteractive());

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    //<editor-fold desc="Callbacks">

    b_ChangeSprite(buttonIndex, mode) {
        switch (buttonIndex) {
            case 0:
                //console.log("Play change sprite: " + mode);
                this.buttons[0].setTexture('mainMenu_buttonPlay_' + mode);
                break;
            case 1:
                //console.log("HowToPlay change sprite: " + mode);
                this.buttons[1].setTexture('mainMenu_buttonHowToPlay_' + mode);
                break;
            case 2:
                this.buttons[2].setTexture('mainMenu_buttonCredits_' + mode);
                break;
            case 3:
                this.buttons[3].setTexture('mainMenu_buttonExit_' + mode);
                break;
            case 4:
                this.buttons[4].setTexture('mainMenu_buttonShop_' + mode);
                break;
            case 5:
                this.buttons[5].setTexture('mainMenu_buttonSettings_' + mode);
                break;
            default:
                break;
        }
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttons.length; i++) {
            //console.log(this.buttons[i])
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }

        this.buttons[0].on('pointerup', () => this.b_Play());
        this.buttons[1].on('pointerup', () => this.b_HowToPlay());
        this.buttons[2].on('pointerup', () => this.b_Credits());
        this.buttons[3].on('pointerup', () => this.b_Exit());
        this.buttons[4].on('pointerup', () => this.b_Shop());
        this.buttons[5].on('pointerup', () => this.b_Settings());
    }

    b_Play() {
        this.scene.get("MusicManager").sfx_play_button();
        //this.scene.start("Lobby", {pjId: 0, color: "Red"});
        this.scene.start("ChooseMode");
    }

    b_HowToPlay() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("HowToPlay");
    }

    b_Credits() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("Credits");
    }

    b_Exit() {
        this.scene.get("MusicManager").sfx_play_button();

        // window.open('https://serendipystudios.itch.io',
        //     '_parent', '', true);

        if(this.sys.game.device.os.chromeOS
            || this.sys.game.device.os.webApp
            || this.sys.game.device.os.macOS
            || this.sys.game.device.os.desktop)
            window.history.back();
        else
            window.open('https://serendipystudios.itch.io/flyguins',
                '_parent', '', true);

        // if (window.history.length > 1) {
        //     window.history.back();
        // } else {
        //     let thisWindow = window.open('','_self', '', true);
        //     //window.close(thisWindow);
        //     //game.close();
        // }
    }

    b_Shop() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("Shop");
    }

    b_Settings() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("Settings");
    }

    //</editor-fold>

}