class Scene_02_4_Shop extends Phaser.Scene{
    constructor() {
        super("Shop");
        console.log("Shop constructor")
    }

    create(){
        //Show the background
        this.add.sprite(0,0,'shop_background').setOrigin(0,0);
        this.add.sprite(35,133,'shop_title').setOrigin(0,0);

        //Show the buttons
        this.exitButton = this.add.sprite(10, 1200, 'shop_buttonExit_static').setOrigin(0,0).setInteractive();

        //Initialize button callbacks
        this.exitButton.on('pointerover', () => this.b_ChangeSprite("Play", "over"));
        this.exitButton.on('pointerout', () => this.b_ChangeSprite("Play", "static"));
        this.exitButton.on('pointerup', () => this.b_Play());
    }

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
}