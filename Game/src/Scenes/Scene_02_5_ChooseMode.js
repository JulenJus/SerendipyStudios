class Scene_02_5_ChooseMode extends Phaser.Scene {
    constructor() {
        super("ChooseMode");
    }

    create() {
        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen_simple').setOrigin(0, 0);

        //Title
        this.rankingTitle = this.add.text(385, 200,
            'Elige un\n modo de juego',
            {
                fontFamily: 'Stencil',
                fontStyle: 'Bold',
                fontSize: '64px',
                stroke: "#143675",
                strokeThickness: 9,
                align: "center",
                fill: '#ffffff'
            }).setOrigin(0.5, 0.5).depth = 1;


        //Buttons
        this.buttons = []
        this.buttons.push(this.add.sprite(113, 439, 'chooseMode_buttonSinglePlayer_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(54, 1166, 'howToPlay_buttonBack_static').setOrigin(0, 0).setInteractive());
        this.buttonMultiplayer = this.add.sprite(113, 736, 'chooseMode_buttonMultiplayer').setOrigin(0, 0);

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttons.length; i++) {
            //console.log(this.buttons[i])
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }
        this.buttons[0].on('pointerup', () => this.goToLobby());
        this.buttons[1].on('pointerup', () => this.b_Exit());
    }

    b_ChangeSprite(buttonIndex, mode) {
        if (buttonIndex === 0) {
            this.buttons[0].setTexture('chooseMode_buttonSinglePlayer_' + mode);
        } else {
            this.buttons[1].setTexture('howToPlay_buttonBack_' + mode);
        }
    }

    goToLobby() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("Lobby", {pjId: 0});
    }

    b_Exit() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("MainMenu");
    }
}