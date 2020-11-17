class Scene_02_1_HowToPlay extends Phaser.Scene {
    constructor() {
        super("HowToPlay");
        console.log("HowToPlay constructor")
    }

    create() {
        //Show the background
        this.add.sprite(0, 0, 'gen_mainscreen_simple').setOrigin(0, 0);
        this.add.sprite(0, 0, 'howToPlay_sgtoJack').setOrigin(0, 0);

        //Init the tips
        this.currentTip = 1;

        this.tipsPc = [];
        this.tipsPc.push(this.add.sprite(27, 863, 'howToPlay_pc1').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(30, 67, 'howToPlay_pc2').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(38, 110, 'howToPlay_pc3').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(44, 116, 'howToPlay_pc4').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(15, 116, 'howToPlay_pc5').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(60, 102, 'howToPlay_pc6').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(16, 102, 'howToPlay_pc7').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(39, 102, 'howToPlay_pc8').setOrigin(0, 0));
        this.tipsPc.push(this.add.sprite(26, 854, 'howToPlay_pc9').setOrigin(0, 0));

        this.tipsMobile = [];
        this.tipsMobile.push(this.add.sprite(31, 77, 'howToPlay_mobile2').setOrigin(0, 0));
        this.tipsMobile.push(this.add.sprite(20, 116, 'howToPlay_mobile3').setOrigin(0, 0));
        this.tipsMobile.push(this.add.sprite(11, 102, 'howToPlay_mobile6').setOrigin(0, 0));

        //Show the first tip
        for (let i = 0; i < this.tipsPc.length; i++) {
            this.tipsPc[i].visible = false;
        }

        for (let i = 0; i < this.tipsMobile.length; i++) {
            this.tipsMobile[i].visible = false;
        }

        this.tipsPc[0].visible = true;

        //Show the buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(54, 1166, 'howToPlay_buttonBack_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(556, 1166, 'howToPlay_buttonNext_static').setOrigin(0, 0).setInteractive());
        this.buttons.push(this.add.sprite(356, 1166, 'howToPlay_buttonPrevious_static').setOrigin(0, 0).setInteractive());

        //Initialize button callbacks
        this.b_InitializeCallbacks();
    }

    //<editor-fold desc="Callbacks">

    b_ChangeSprite(buttonIndex, mode) {
        switch (buttonIndex) {
            case 0:
                //console.log("Play change sprite: " + mode);
                this.buttons[0].setTexture('howToPlay_buttonBack_' + mode);
                break;
            case 1:
                //console.log("HowToPlay change sprite: " + mode);
                this.buttons[1].setTexture('howToPlay_buttonNext_' + mode);
                break;
            case 2:
                //console.log("HowToPlay change sprite: " + mode);
                this.buttons[2].setTexture('howToPlay_buttonPrevious_' + mode);
                break;
        }
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttons.length; i++) {
            //console.log(this.buttons[i])
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }

        this.buttons[0].on('pointerup', () => this.b_Exit());
        this.buttons[1].on('pointerup', () => this.b_Next());
        this.buttons[2].on('pointerup', () => this.b_Back());
    }

    b_Exit() {
        this.scene.start("MainMenu");
    }

    b_Next() {
        if (this.sys.game.device.os.android ||
            this.sys.game.device.os.iPad) {
            console.log("Mobile")
            this.currentTip++;
            if (this.currentTip <= this.tipsPc.length - 1) {
                switch (this.currentTip) {
                    case 2:
                        this.tipsMobile[0].visible = true;
                        this.tipsPc[this.currentTip - 2].visible = false;
                        break;
                    case 3:
                        this.tipsMobile[1].visible = true;
                        this.tipsMobile[0].visible = false;
                        break;
                    case 4:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsMobile[1].visible = false;
                        break;
                    case 6:
                        this.tipsMobile[2].visible = true;
                        this.tipsPc[this.currentTip - 2].visible = false;
                        break;
                    case 7:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsMobile[2].visible = false;
                        break;
                    case 8:
                        this.tipsPc[this.currentTip].visible = true;
                        this.tipsPc[this.currentTip - 2].visible = false;
                        break;
                    default:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsPc[this.currentTip - 2].visible = false;
                        break;
                }
            } else {
                this.scene.start("Level_Tutorial", {skin: "Steve"});
            }
        } else {
            console.log("Pc")
            this.currentTip++;
            if (this.currentTip <= this.tipsPc.length) {
                this.tipsPc[this.currentTip - 1].visible = true;
                this.tipsPc[this.currentTip - 2].visible = false;
            } else {
                this.scene.start("Level_Tutorial", {skin: "Steve"});
            }
        }
    }

    b_Back() {
        if (this.sys.game.device.os.android ||
            this.sys.game.device.os.iPad) {
            console.log("Mobile")
            if (this.currentTip > 1) {
                this.currentTip--;
                switch (this.currentTip) {
                    case 1:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsMobile[0].visible = false;
                        break;
                    case 2:
                        this.tipsMobile[0].visible = true;
                        this.tipsMobile[1].visible = false;
                        break;
                    case 3:
                        this.tipsMobile[1].visible = true;
                        this.tipsPc[this.currentTip].visible = false;
                        break;
                    case 5:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsMobile[2].visible = false;
                        break;
                    case 6:
                        this.tipsMobile[2].visible = true;
                        this.tipsPc[this.currentTip].visible = false;
                        break;
                    case 7:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsPc[this.currentTip + 1].visible = false;
                    default:
                        this.tipsPc[this.currentTip - 1].visible = true;
                        this.tipsPc[this.currentTip].visible = false;
                        break;
                }
            }
        } else {
            console.log("Pc")
            if (this.currentTip > 1) {
                this.currentTip--;
                this.tipsPc[this.currentTip - 1].visible = true;
                this.tipsPc[this.currentTip].visible = false;
            }
        }
    }

    //</editor-fold>
}