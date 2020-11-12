class Scene_02_3_Credits extends Phaser.Scene {
    constructor() {
        super("Credits");
        console.log("Credits constructor");
    }

    create() {
        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen').setOrigin(0, 0);
        this.add.sprite(0, 0, 'credits_logs').setOrigin(0, 0);
        //[HERE] Create the title

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(274, 1159, 'credits_buttonTwitter_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(54, 1155, 'gen_buttonExit_static').setOrigin(0, 0).setInteractive());

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    //<editor-fold desc="Callbacks">

    b_ChangeSprite(buttonIndex, mode) {
        switch (buttonIndex) {
            case 0:
                //console.log("Tw change sprite: " + mode);
                this.buttons[0].setTexture('credits_buttonTwitter_' + mode);
                break;
            case 1:
                //console.log("HowToPlay change sprite: " + mode);
                this.buttons[1].setTexture('gen_buttonExit_' + mode);
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

        this.buttons[0].on('pointerup', () => this.b_Twitter());
        this.buttons[1].on('pointerup', () => this.b_Exit());
    }

    b_Twitter() {
        //Create a tab with twitter account url
        window.open("https://twitter.com/SerendipyStudio");
    }

    b_Exit() {
        this.scene.start("MainMenu");
    }

    //</editor-fold>
}