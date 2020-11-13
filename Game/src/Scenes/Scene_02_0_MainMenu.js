class Scene_02_0_MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");
        console.log("MainMenu constructor")
    }

    create() {
        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen_simple').setOrigin(0, 0);
        this.add.sprite(35, 133, 'mainMenu_title').setOrigin(0, 0);

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(106, 460, 'mainMenu_buttonPlay_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 702, 'mainMenu_buttonHowToPlay_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 878, 'mainMenu_buttonCredits_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(114, 1059, 'mainMenu_buttonExit_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(22, 13, 'mainMenu_buttonShop_static').setOrigin(0, 0).setScale(0.9).setInteractive());
        //this.buttons.push(this.add.sprite((game.config.width - 22) - 8, (game.config.height - 7) - 13, 'mainMenu_buttonShop_static').setOrigin(1, 1).setScale(1).setInteractive());

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
            default:
                break;
        }
    }

    b_InitializeCallbacks() {
        for(let i=0; i<this.buttons.length; i++){
            //console.log(this.buttons[i])
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }

        this.buttons[0].on('pointerup', () => this.b_Play());
        this.buttons[1].on('pointerup', () => this.b_HowToPlay());
        this.buttons[2].on('pointerup', () => this.b_Credits());
        this.buttons[3].on('pointerup', () => this.b_Exit());
        this.buttons[4].on('pointerup', () => this.b_Shop());
    }

    b_Play() {
        this.scene.start("Lobby", {pjId: 0, color: "Red"});
    }

    b_HowToPlay() {
        this.scene.start("HowToPlay");
    }

    b_Credits() {
        this.scene.start("Credits");
    }

    b_Exit() {
        window.close();
    }

    b_Shop(){
        this.scene.start("Shop");
    }

    //</editor-fold>

}