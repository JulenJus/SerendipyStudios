class Scene_02_6_Settings extends Phaser.Scene {
    constructor() {
        super("Settings");
        console.log("Settings constructor");
    }

    create() {
        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen_simple').setOrigin(0, 0);
        this.add.sprite(0, 0, 'settings_background').setOrigin(0, 0);

        this.add.sprite(97, 469, 'settings_barEdge').setOrigin(0, 0);
        this.musicFill = this.add.sprite(97, 469, 'settings_barFill').setOrigin(0, 0);
        this.musicFill.setCrop(0, 0, 0, 50);
        this.musicSlider = this.add.sprite(97, 456, 'settings_littleIce').setOrigin(0, 0).setInteractive({draggable: true});

        this.add.sprite(97, 721, 'settings_barEdge').setOrigin(0, 0);
        this.sfxFill = this.add.sprite(97, 721, 'settings_barFill').setOrigin(0, 0);
        this.sfxFill.setCrop(0, 0, 0, 50);
        this.sfxSlider = this.add.sprite(97, 708, 'settings_littleIce').setOrigin(0, 0).setInteractive({draggable: true});

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(54, 1155, 'gen_buttonExit_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.musicSlider);
        this.buttons.push(this.sfxSlider);

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    //<editor-fold desc="Callbacks">

    b_ChangeSprite(buttonIndex, mode) {
        switch (buttonIndex) {
            case 0:
                //console.log("HowToPlay change sprite: " + mode);
                this.buttons[0].setTexture('gen_buttonExit_' + mode);
                break;
            case 1:
                //console.log("HowToPlay change sprite: " + mode);
                //this.buttons[1].setTexture('gen_littleIce_' + mode);
                break;
            case 2:
                //console.log("HowToPlay change sprite: " + mode);
                //this.buttons[2].setTexture('gen_littleIce_' + mode);
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

        //Interactivity
        this.buttons[0].on('pointerup', () => this.b_Exit());

        //Sliders
        this.musicSlider.on('drag', (pointer, dragX) => this.b_updateBar(this.musicSlider, pointer, dragX));
        this.sfxSlider.on('drag', (pointer, dragX) => this.b_updateBar(this.sfxSlider, pointer, dragX));

    }

    b_updateBar(slider, pointer, dragX){
        slider.x = Phaser.Math.Clamp(dragX, this.musicFill.x, this.musicFill.x + 498);

        switch(slider){
            case this.musicSlider:
                this.b_changeProgress(this.musicFill, (slider.x - this.musicFill.x)/498);
                this.setupMusicVolume();
                break;
            case this.sfxSlider:
                this.b_changeProgress(this.sfxFill, (slider.x - this.sfxFill.x)/498);
                this.setupSfxVolume();
                break;
        }
    }

    b_changeProgress(bar, progress) {
        //Set the progress bar fill
        //console.log(progress);
        bar.setCrop(0, 0, 498 * progress, 50);

        return;

    }

    setupMusicVolume(){

    }

    setupSfxVolume(){

    }

    b_Exit() {
        this.scene.start("MainMenu");
    }

    //</editor-fold>
}