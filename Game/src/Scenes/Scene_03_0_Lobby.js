class Scene_03_0_Lobby extends Phaser.Scene {
    constructor() {
        super("Lobby");
        //console.log("Lobby constructor");

        this.LEVELS = [
            "Nvl 1: Diagonales dolorosas",
            "Nvl 2: Simetría sinuosa",
            "Nvl 3: Trayecto tortuoso"
        ]

        this.CHARS = [
            "Steve",
            "Armin",
            "Bob",
            "Karta"
        ];
    }

    init(args) {
        this.numPlayers = 4;
        this.readyPlayers = 3;  //[HERE] Configure this for the online!

        this.pjId = args.pjId;
        this.ready = false;

        //this.color = args.color;
        this.level = 0;

        this.pjsIds = [0, 3, 1, 2]      //Different players may contain different orders
        this.pjsSkin = [0, 0, 0, 0]
        this.pjSkinSofa = 0
    }

    create() {
        this.add.sprite(0, 0, 'lobby_background').setOrigin(0, 0);
        this.add.sprite(96, 194, 'lobby_buttonBigSel_Blue').setOrigin(0, 0);
        //this.add.sprite(0, 194, 'lobby_buttonBigSel_' + this.color).setOrigin(0, 0);

        //Level
        this.levelName = this.LEVELS[this.level];
        this.levelNameDisplay = this.add.text(this.game.config.width / 2, 85,
            this.levelName,
            {
                fontFamily: 'Stencil',
                fontStyle: 'Bold',
                fontSize: '24px',
                stroke: "#143675",
                strokeThickness: 9,
                align: "center",
                fill: '#ffffff'
            }).setOrigin(0.5, 0.5);

        //Buttons
        this.buttonsUI = [];
        this.buttonsUI.push(this.add.sprite(13, 33, 'lobby_buttonSelBack_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(655, 33, 'lobby_buttonSelNext_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(36, 1200, 'lobby_buttonSalir_static').setOrigin(0, 0).setInteractive());
        this.buttonsUI.push(this.add.sprite(230, 1200, 'lobby_buttonJugar_deactivated').setOrigin(0, 0).setInteractive());

        //Colors
        this.buttonsColors = [];
        this.buttonsColors.push(this.add.sprite(181, 572, 'lobby_buttonBack_Blue_static').setOrigin(0, 0).setInteractive());
        this.buttonsColors.push(this.add.sprite(336, 572, 'lobby_buttonAccept_Blue_static').setOrigin(0, 0).setInteractive());
        this.buttonsColors.push(this.add.sprite(493, 572, 'lobby_buttonNext_Blue_static').setOrigin(0, 0).setInteractive());

        //Characters
        this.pjsSkinTexs = [];
        this.pjsSkinTexs.push(
            this.add.sprite(170, 247, 'lobby_char_' + this.CHARS[this.pjsSkin[this.pjsIds[0]]] + 'Big')
                .setOrigin(0, 0));

        //Sofa little penguins
        this.pjsSofa = []
        for (let i = 0; i < 4; i++) {
            this.pjsSofa.push(
                this.add.sprite(300, 800, this.CHARS[i] + 'Plush')
                    .setOrigin(0, 0).setScale(0.6));
        }
        for (let i = 0; i < 4; i++) {
            this.pjsSofa[i].visible = false;
        }


        //Ticks
        this.readyTick = this.add.sprite(469, 198, 'lobby_ready_bigTick').setOrigin(0, 0);
        this.readyTick.visible = false;

        //Init callbacks
        this.b_InitializeCallbacks();
    }

    b_ChangeSprite(buttonType, buttonIndex, mode) {
        if (buttonType === "UI") {
            switch (buttonIndex) {
                case 0:
                    //console.log("Play change sprite: " + mode);
                    this.buttonsUI[0].setTexture('lobby_buttonSelBack_' + mode);
                    break;
                case 1:
                    //console.log("HowToPlay change sprite: " + mode);
                    this.buttonsUI[1].setTexture('lobby_buttonSelNext_' + mode);
                    break;
                case 2:
                    this.buttonsUI[2].setTexture('lobby_buttonSalir_' + mode);
                    break;
                case 3:
                    if (this.numPlayers === this.readyPlayers)
                        this.buttonsUI[3].setTexture('lobby_buttonJugar_' + mode);
                    break;
                default:
                    break;
            }
        } else { //For Color buttons
            switch (buttonIndex) {
                case 0:
                    //this.buttonsColors[0].setTexture('lobby_buttonBack_' + this.color + "_" + mode);
                    this.buttonsColors[0].setTexture('lobby_buttonBack_Blue_' + mode);
                    break;
                case 1:
                    //this.buttonsColors[1].setTexture('lobby_buttonAccept_' + this.color + "_" + mode);
                    this.buttonsColors[1].setTexture('lobby_buttonAccept_Blue_' + mode);
                    break;
                case 2:
                    //this.buttonsColors[2].setTexture('lobby_buttonNext_' + this.color + "_" + mode);
                    this.buttonsColors[2].setTexture('lobby_buttonNext_Blue_' + mode);
                    break;
                default:
                    break;
            }
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
        this.scene.get("MusicManager").sfx_play_button();
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

        this.levelNameDisplay.setText(this.levelName);
        //console.log(this.levelName);
    }

    b_Play() {
        if (this.numPlayers === this.readyPlayers){
            this.scene.get("MusicManager").sfx_play_button();
            this.scene.start("Level_0" + (this.level + 1).toString(), {skin: this.CHARS[this.pjsSkin[this.pjId]]});
            this.scene.get("MusicManager").music_stop_MainMenu();
        }
    }

    b_Exit() {
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.start("MainMenu");
    }

    //Colors callbacks

    b_PreviousSkin() {
        if (this.ready) return;

        this.scene.get("MusicManager").sfx_play_button();
        //console.log("Previous skin")
        this.pjsSkin[this.pjId] = this.pjsSkin[this.pjId] === 0 ? this.CHARS.length - 1 : this.pjsSkin[this.pjId] - 1;
        this.pjSkinSofa = this.pjSkinSofa === 0 ? this.CHARS.length - 1 : this.pjSkinSofa - 1;
        this.ShowSkin(this.pjId);
    }

    b_SelectSkin() {
        this.scene.get("MusicManager").sfx_play_button();
        this.ready = !this.ready;
        //console.log("Skin selected: " + this.ready);

        //[HERE] Show the mark
        this.ShowMark(this.pjId, this.ready);
        this.pjsSofa[this.pjSkinSofa].visible = this.ready;//Show the sofa penguin
    }

    b_NextSkin() {
        if (this.ready) return;

        this.scene.get("MusicManager").sfx_play_button();
        //console.log("Next skin");
        this.pjsSkin[this.pjId] = this.pjsSkin[this.pjId] === this.CHARS.length - 1 ? 0 : this.pjsSkin[this.pjId] + 1;
        this.pjSkinSofa = this.pjSkinSofa === this.CHARS.length - 1 ? 0 : this.pjSkinSofa + 1;
        this.ShowSkin(this.pjId);
    }

    ShowSkin(pjId) {
        //Change the texture of the pj
        let pjLocalIndex = this.pjsIds.find((ele) => ele === pjId);
        this.pjsSkinTexs[pjLocalIndex].setTexture(
            'lobby_char_' + this.CHARS[this.pjsSkin[pjLocalIndex]] + 'Big'
        );
    }

    ShowMark(pjId, isEnabled) {
        //Enable/disable the mark
        this.readyTick.visible = isEnabled;

        if (isEnabled)
            this.readyPlayers++;
        else
            this.readyPlayers--;

        if (this.numPlayers !== this.readyPlayers)
            this.buttonsUI[3].setTexture('lobby_buttonJugar_deactivated');
        else
            this.buttonsUI[3].setTexture('lobby_buttonJugar_static');
    }

}