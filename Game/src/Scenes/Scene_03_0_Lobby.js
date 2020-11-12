class Scene_03_0_Lobby extends Phaser.Scene {
    constructor() {
        super("Lobby");
        console.log("Lobby constructor");

        this.LEVELS = [
            "Level_01",
            "Level_02"
        ]

        this.SKINS = [
            "Steve",
            "Joe",
            "Rurtha"
        ]
    }

    init(args) {
        this.pjId = args.pjId;
        this.ready = false;

        this.color = args.color;
        this.level = 0;

        this.pjsSkin = [0, 0, 0, 0]
    }

    create() {
        this.add.sprite(0, 0, 'lobby_background').setOrigin(0, 0);
        this.add.sprite(0, 194, 'lobby_buttonBigSel_' + this.color).setOrigin(0, 0);

        let numInstantiatedLittleSel = 0;
        let colors = ["Blue", "Green", "Orange", "Red"];
        let cursedIndex = colors.find((value) => value === this.color);
        for (let i = 0; i < colors.length; i++) {
            if (i !== cursedIndex) {
                switch (numInstantiatedLittleSel) {
                    case 0:
                        this.add.sprite(575, 194, 'lobby_buttonLittleSel_' + colors[i]).setOrigin(0, 0);
                        break;
                    case 1:
                        this.add.sprite(575, 354, 'lobby_buttonLittleSel_' + colors[i]).setOrigin(0, 0);
                        break;
                    case 2:
                        this.add.sprite(575, 514, 'lobby_buttonLittleSel_' + colors[i]).setOrigin(0, 0);
                        break;
                }
                numInstantiatedLittleSel++;
            }
        }

        //Buttons
        this.buttonsUI = [];
        this.buttonsUI.push(this.add.sprite(13, 33, 'lobby_buttonSelBack_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(655, 33, 'lobby_buttonSelNext_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(36, 1200, 'lobby_buttonSalir_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(230, 1200, 'lobby_buttonJugar_static').setOrigin(0, 0).setInteractive());

        //Colors
        this.buttonsColors = [];
        this.buttonsColors.push(this.add.sprite(85, 572, 'lobby_buttonBack_' + this.color).setOrigin(0, 0).setInteractive());
        this.buttonsColors.push(this.add.sprite(240, 572, 'lobby_buttonAccept_' + this.color).setOrigin(0, 0).setInteractive());
        this.buttonsColors.push(this.add.sprite(397, 572, 'lobby_buttonNext_' + this.color).setOrigin(0, 0).setInteractive());

        //Level
        this.levelName = this.LEVELS[this.level];

        //Init callbacks
        this.b_InitializeCallbacks();
    }

    b_ChangeSprite(buttonType, buttonIndex, mode) {
        if (buttonType === "UI") {
            switch (buttonIndex) {
                case 0:
                    //console.log("Play change sprite: " + mode);
                    //this.buttons[0].setTexture('lobby_buttonSelBack_' + mode);
                    break;
                case 1:
                    //console.log("HowToPlay change sprite: " + mode);
                    //this.buttons[1].setTexture('lobby_buttonSelNext_' + mode);
                    break;
                case 2:
                    //this.buttons[2].setTexture('lobby_buttonSalir_' + mode);
                    break;
                case 3:
                    //this.buttons[3].setTexture('lobby_buttonJugar_' + mode);
                    break;
                default:
                    break;
            }
        } else {
            /*
            switch (buttonIndex) {
                case 0:
                    //console.log("Play change sprite: " + mode);
                    this.buttons[0].setTexture('lobby_buttonSelBack_' + mode);
                    break;
                case 1:
                    //console.log("HowToPlay change sprite: " + mode);
                    this.buttons[1].setTexture('lobby_buttonSelNext_' + mode);
                    break;
                case 2:
                    this.buttons[2].setTexture('lobby_buttonSalir_' + mode);
                    break;
                default:
                    break;
            }
             */
        }
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttonsUI.length; i++) {
            //console.log(this.buttons[i])
            this.buttonsUI[i].on('pointerover', () => this.b_ChangeSprite("UI", i, "over"));
            this.buttonsUI[i].on('pointerout', () => this.b_ChangeSprite("UI", i, "static"));
        }

        for (let i = 0; i < this.buttonsColors.length; i++) {
            //console.log(this.buttons[i])
            this.buttonsColors[i].on('pointerover', () => this.b_ChangeSprite("Color", i, "over"));
            this.buttonsColors[i].on('pointerout', () => this.b_ChangeSprite("Color", i, "static"));
        }

        this.buttonsUI[0].on('pointerup', () => this.b_changeLevel(false));
        this.buttonsUI[1].on('pointerup', () => this.b_changeLevel(true));
        this.buttonsUI[2].on('pointerup', () => this.b_Exit());
        this.buttonsUI[3].on('pointerup', () => this.b_Play());

        this.buttonsColors[0].on('pointerup', () => this.b_PreviousSkin());
        this.buttonsColors[1].on('pointerup', () => this.b_SelectSkin());
        this.buttonsColors[2].on('pointerup', () => this.b_NextSkin());
    }

    //UI callbacks

    b_changeLevel(isNext) {
        if (!isNext) {
            if (this.level != 0) {
                this.level--;
                this.levelName = this.LEVELS[this.level];
            }
        } else {
            if (this.level != this.LEVELS.length - 1) {
                this.level++;
                this.levelName = this.LEVELS[this.level];
            }
        }

        console.log(this.levelName);
    }

    b_Play() {
        this.scene.start(this.levelName);
    }

    b_Exit() {
        this.scene.start("MainMenu");
    }

    //Colors callbacks

    b_PreviousSkin() {
        if(this.ready) return;

        console.log("Previous skin")
        this.pjsSkin[this.pjId] = this.pjsSkin[this.pjId] === 0 ? this.SKINS.length - 1 : this.pjsSkin[this.pjId] - 1;
        this.ShowSkin(this.pjId);
    }

    b_SelectSkin() {
        this.ready = !this.ready;
        console.log("Skin selected: " + this.ready);

        //[HERE] Show the mark

    }

    b_NextSkin() {
        if(this.ready) return;

        console.log("Next skin");
        this.pjsSkin[this.pjId] = this.pjsSkin[this.pjId] === this.SKINS.length - 1 ? 0 : this.pjsSkin[this.pjId] + 1;
        this.ShowSkin(this.pjId);
    }

    ShowSkin(pjId) {
        //Change the texture of the pj
        console.log("Player " + pjId + ": Skin " + this.SKINS[this.pjsSkin[pjId]]);
    }

}