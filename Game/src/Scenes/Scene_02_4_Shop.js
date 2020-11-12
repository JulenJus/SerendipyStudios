class Scene_02_4_Shop extends Phaser.Scene{
    constructor() {
        super("Shop");
        console.log("Shop constructor")
    }

    create(){
        //Show the background
        this.add.sprite(0,0,'shop_background').setOrigin(0,0);

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(400, 450, 'shop_buttonMaps_static').setOrigin(0,0).setInteractive());
        this.buttons.push(this.add.sprite(50, 450, 'shop_buttonSkins_static').setOrigin(0,0).setInteractive());
        this.buttons.push(this.add.sprite(10, 1160, 'shop_buttonExit_static').setOrigin(0,0).setInteractive()); //Shop exit button

        //Create maps and skins screens (not shown yet)
        this.mapsScreen = this.add.sprite(0, 0, "shop_mapsScreen").setOrigin(0,0);
        this.mapsScreen.visible = false;
        this.skinsScreen = this.add.sprite(0, 0, "shop_skinsScreen").setOrigin(0,0);
        this.skinsScreen.visible = false;

        //Exit button for the maps and skins screens (not shown yet)
        this.buttons.push(this.add.sprite(550, 80, 'shop_screensButtonExit_static').setOrigin(0,0)); //Maps and skins screens exit button
        this.buttons[this.buttons.length - 1].visible = false;

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttons.length; i++) {
            //console.log(this.buttons[i])
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }

        this.buttons[0].on('pointerup', () => this.b_ShowMaps());
        this.buttons[1].on('pointerup', () => this.b_ShowSkins());
        this.buttons[2].on('pointerup', () => this.b_Exit());
        this.buttons[3].on('pointerup', () => this.b_CloseScreen());
    }

    b_ChangeSprite(buttonIndex, mode){
        switch(buttonIndex){
            case 0:
                this.buttons[0].setTexture('shop_buttonMaps_' + mode);
                break;
            case 1:
                this.buttons[1].setTexture('shop_buttonSkins_' + mode);
                break;
            case 2:
                this.buttons[2].setTexture('shop_buttonExit_' + mode);
                break;
            case 3:
                this.buttons[3].setTexture('shop_screensButtonExit_' + mode);
                break;
        }
    }

    b_ShowMaps(){
        this.mapsScreen.visible = true;
        this.manageInteractiveButtons(false);
    }

    b_ShowSkins(){
        this.skinsScreen.visible = true;
        this.manageInteractiveButtons(false);
    }

    b_CloseScreen(){
        if(this.skinsScreen.visible){
            this.skinsScreen.visible = false;
        }else{
            this.mapsScreen.visible = false;
        }
        this.manageInteractiveButtons(true);
    }

    b_Exit(){
        this.scene.start("MainMenu");
    }

    manageInteractiveButtons(interactive) {
        if(interactive){
            for (let i = 0; i < this.buttons.length - 1; i++) {
                this.buttons[i].setInteractive();
            }
            this.buttons[this.buttons.length - 1].disableInteractive();
            this.buttons[this.buttons.length - 1].visible = false;
        }else{
            for (let i = 0; i < this.buttons.length - 1; i++) {
                this.buttons[i].disableInteractive();
            }
            this.buttons[this.buttons.length - 1].setInteractive();
            this.buttons[this.buttons.length - 1].visible = true;
        }
    }
}