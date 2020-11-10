class Scene_02_4_Shop extends Phaser.Scene{
    constructor() {
        super("Shop");
        console.log("Shop constructor")
    }

    create(){
        //Show the background
        this.add.sprite(0,0,'shop_background').setOrigin(0,0);

        //Show the buttons
        this.mapsButton = this.add.sprite(400, 450, 'shop_buttonMaps_static').setOrigin(0,0).setInteractive();
        this.skinsButton = this.add.sprite(50, 450, 'shop_buttonSkins_static').setOrigin(0,0).setInteractive();
        this.exitButton = this.add.sprite(10, 1160, 'shop_buttonExit_static').setOrigin(0,0).setInteractive();

        //Initialize button callbacks
        this.mapsButton.on('pointerover', () => this.b_ChangeSprite("Maps", "over"));
        this.mapsButton.on('pointerout', () => this.b_ChangeSprite("Maps", "static"));
        this.mapsButton.on('pointerup', () => this.b_GoToMainMenu());

        this.skinsButton.on('pointerover', () => this.b_ChangeSprite("Skins", "over"));
        this.skinsButton.on('pointerout', () => this.b_ChangeSprite("Skins", "static"));
        this.skinsButton.on('pointerup', () => this.b_GoToMainMenu());

        this.exitButton.on('pointerover', () => this.b_ChangeSprite("Exit", "over"));
        this.exitButton.on('pointerout', () => this.b_ChangeSprite("Exit", "static"));
        this.exitButton.on('pointerup', () => this.b_GoToMainMenu());
    }

    b_ChangeSprite(button, mode){
        switch(button){
            case "Maps":
                this.mapsButton.setTexture('shop_buttonMaps_' + mode);
                break;
            case "Skins":
                this.skinsButton.setTexture('shop_buttonSkins_' + mode);
                break;
            case "Exit":
                this.exitButton.setTexture('shop_buttonExit_' + mode);
                break;
        }
    }

    b_GoToMainMenu(){
        this.scene.start("MainMenu");
    }

    b_GoTo(){
        this.scene.start("MainMenu");
    }

    b_GoToMainMenu(){
        this.scene.start("MainMenu");
    }
}