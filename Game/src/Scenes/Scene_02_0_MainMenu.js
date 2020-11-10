class Scene_02_0_MainMenu extends Phaser.Scene{
    constructor() {
        super("MainMenu");
        console.log("MainMenu constructor")
    }

    create(){
        //Show the background
        this.add.sprite(0,0,'mainMenu_background').setOrigin(0,0);
        this.add.sprite(35,133,'mainMenu_title').setOrigin(0,0);

        //Show the buttons
        this.buttonPlay = this.add.sprite(106, 460, 'mainMenu_buttonPlay_static').setOrigin(0,0).setInteractive();
        this.buttonHowToPlay = this.add.sprite(114, 702, 'mainMenu_buttonHowToPlay_static').setOrigin(0,0);
        this.buttonCredits = this.add.sprite(114, 878, 'mainMenu_buttonCredits_static').setOrigin(0,0);
        this.buttonExit = this.add.sprite(114, 1059, 'mainMenu_buttonExit_static').setOrigin(0,0);
        this.buttonShop = this.add.sprite((game.config.width - 22) -8, (game.config.height- 7) - 13, 'mainMenu_shop').setOrigin(1,1).setScale(0.4);

        //Initialize button callbacks
        this.buttonPlay.on('pointerover', () => this.b_ChangeSprite("Play", "over"));
        this.buttonPlay.on('pointerout', () => this.b_ChangeSprite("Play", "static"));
        this.buttonPlay.on('pointerup', () => this.b_Play());
    }

    //<editor-fold desc="Callbacks">

    b_ChangeSprite(button, mode){
        switch(button){
            case "Play":
                console.log("Play change sprite: " + mode);
                break;
            case "HowToPlay":
                break;
            case "Credits":
                break;
            case "Exit":
                break;
        }
    }

    b_Play(){
        console.log("Play");
    }

    b_HowToPlay(){

    }

    b_Credits(){
        
    }

    b_Exit(){

    }

    //</editor-fold>

}