//Global variables
let raceTimeCount = 30;

class Scene_04_0_InGameHUD extends Phaser.Scene {

    constructor() {
        super("InGameHUD");

        //Power up icons
        this.dashIcon = null;
        this.gen_powerUp_shield_spritIcon = null;

        //console.log("Ingame hud constructor");
    }

    init(args) {
        console.log("HUD");
        this.player = args.player;
        this.level = args.level;
        //console.log("Ingame hud init");
    }

    create() {
        //Show the scene
        //this.scene.start("InGameHUD");    //[HERE] YOU ARE SUCH AN ASSHOLE JULEN!
        //console.log("Ingame hud create");

        //Create score
        // this.movementBarText = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, '', {
        //     fontFamily: 'Gelato',
        //     fontStyle: 'Italic',
        //     fontSize: '32px',
        //     fill: '#ffffff'
        // });

        // powerUpTime = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, '', {
        //     fontFamily: 'Gelato',
        //     fontStyle: 'Italic',
        //     fontSize: '64px',
        //     fill: '#000000'
        // });

        //Event Listeners
        this.player.onPaintPowerUpIcon.on('onPaintPowerUpIcon', this.onPaintPowerUpIcon, this);
        this.player.controls.onExitLevel.on('onExitLevel', this.onExitLevel, this);

        //Movement bar
        this.bar = this.add.sprite(game.config.width / 2, game.config.height - 70, 'UI_bar');
        this.barMark = this.add.sprite(game.config.width / 2 - 238, game.config.height - 77.5, 'UI_blueMark');
        this.ghostBarMark = this.add.sprite(-500, -500, 'UI_blueMark');

        //Initialize bar
        this.player.movementBar.onMovementBarPressed.on('onMovementBarPressed', this.movementBarPressed, this);
        this.player.movementBar.setIsHudSetUp(true);

        //PowerUp stuff
        this.gen_powerUpBox_sprite = this.add.sprite(80, 80, 'UI_powerUpEmpty').setScale(0.5);

        //Exit confirmation screen
        this.mapsScreen = this.add.sprite(0, 0, "UI_exitConfirmationScreen").setOrigin(0, 0);
        this.mapsScreen.depth = 2;
        this.mapsScreen.visible = false;

        //Buttons
        this.buttons = [];
        this.buttons.push(this.add.sprite(156, 476, 'UI_exitConfirmationScreen_NoButton_static').setOrigin(0, 0));
        this.buttons.push(this.add.sprite(459, 476, 'UI_exitConfirmationScreen_YesButton_static').setOrigin(0, 0));
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].depth = 3
            this.buttons[i].visible = false;
        }

        //Initialize button callbacks
        this.b_InitializeCallbacks();

        //Race bar
        this.raceBar = this.add.sprite(60, 700, 'UI_raceBar');
        this.playerMark = this.add.sprite(45, 1085, 'UI_playerMark');

        //Texts
        //Race time
        this.raceTime = this.add.text(game.config.width / 2, 100, '', {
            fontFamily: 'Stencil',
            fontStyle: 'Bold',
            fontSize: '64px',
            stroke: "#143675",
            strokeThickness: 9,
            align: "center",
            fill: '#ffffff'
        }).setOrigin(0.5, 0);

        this.countDownDisplay = this.add.text(game.config.width / 2, game.config.height / 2,
            '',
            {
                fontFamily: 'Stencil',
                fontStyle: 'Bold',
                fontSize: '108px',
                stroke: "#143675",
                strokeThickness: 9,
                align: "center",
                fill: '#ffffff'
                //fill: '#143675'
                //fill: '#db6a00'
            }).setOrigin(0.5, 0.5);

        //Race position
        // this.racePosition = this.add.text(60, 230, '1st', {
        //     fontFamily: 'Gelato',
        //     fontStyle: 'Italic',
        //     fontSize: '48px',
        //     fill: '#000000'
        // }).setOrigin(0.5, 0);

        //Exit button
        this.add.sprite(700, 70, 'UI_exitButton').setScale(0.6);

        //Notify the level that all is ready to start
        this.level.setPlayerReady();
    }

    update() {
        this.raceTime.setText(`${(this.registry.get('timer')).toFixed(2)}`); //Update the text every time the 'timer' variable from the registry changes

        if (this.player.controllable) {
            this.player.movementBar.update();
            this.playerMark.y =
                (this.raceBar.y + this.raceBar.height / 2)
                - Phaser.Math.Clamp(
                this.raceBar.height * (1 - ((this.player.y / this.level.levelHeight))),
                0,
                this.raceBar.height);
        }

        //Update sprite positions
        this.barMark.x =
            this.bar.x                                                                          //Center the sprite
            - (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) / 2 +    //Put it at the beginning
            Phaser.Math.Clamp(                                                                  //Update the position depending on the barValue
                (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) * (this.player.movementBar.movementBarValue / 100),
                0,
                this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth
            );
    }

    setCountdown(countdown){
        this.countDownDisplay.setText(countdown);

        if(countdown === 0){
            this.countDownDisplay.setText("YA!");
            let countdownDisplay = this.countDownDisplay;

            this.time.addEvent({
                delay: 1000,
                repeat: 0,
                loop: false,
                callback: function () {
                    countdownDisplay.visible = false;
                }
            });
        }
    }

    movementBarPressed(movementBarValue, tier) {
        let sprite;

        switch (tier) {
            case 0:
                sprite = 'UI_redMark';
                break;
            case 1:
                sprite = 'UI_yellowMark';
                break;
            case 2:
                sprite = 'UI_greenMark';
                break;
        }

        this.ghostBarMark.destroy();
        this.ghostBarMark = this.add.sprite(
            this.bar.x - (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) / 2 +
            (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) * (movementBarValue / 100),
            game.config.height - 77.5,
            sprite);

        this.barMark.destroy();
        this.barMark = this.add.sprite(game.config.width / 2 - 238, game.config.height - 77.5, 'UI_blueMark');
    }

    onExitLevel() {
        this.mapsScreen.visible = true;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].visible = true;
            this.buttons[i].setInteractive();
        }
        game.scene.pause('Level_' + currentScene);
    }

    onPaintPowerUpIcon(type, enable, args) {
        switch (type) {
            case "dash":
                switch (args.numDashes) {
                    case 0:
                        this.dashIcon.destroy();
                        this.dashIcon = null;
                        break;
                    case 1:
                        this.dashIcon.setTexture('UI_dashPowerUp1').setScale(0.5);
                        break;
                    case 2:
                        this.dashIcon.setTexture('UI_dashPowerUp2').setScale(0.5);
                        break;
                    case 3:
                        this.dashIcon = this.add.sprite(80, 60, 'UI_dashPowerUp3').setScale(0.5);
                        break;
                }
                break;
            case "shield":
                if (enable) {
                    this.gen_powerUp_shield_spritIcon = this.add.sprite(80, 65, 'UI_shieldPowerUp').setScale(0.45);
                } else {
                    this.gen_powerUp_shield_spritIcon.destroy();
                    this.gen_powerUp_shield_spritIcon = null;
                }
                break;
        }
    }

    b_InitializeCallbacks() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].on('pointerover', () => this.b_ChangeSprite(i, "over"));
            this.buttons[i].on('pointerout', () => this.b_ChangeSprite(i, "static"));
        }

        this.buttons[0].on('pointerup', () => this.resumeGame());
        this.buttons[1].on('pointerup', () => this.goToRanking());
    }

    b_ChangeSprite(buttonIndex, mode) {
        if (buttonIndex === 0) {
            this.buttons[0].setTexture('UI_exitConfirmationScreen_NoButton_' + mode);
        } else {
            this.buttons[1].setTexture('UI_exitConfirmationScreen_YesButton_' + mode);
        }
    }

    goToRanking(){
        this.scene.get("MusicManager").sfx_play_button();
        this.scene.get('Level_' + currentScene).goToRanking();
        this.scene.get("MusicManager").music_stop_InGame();
    }

    resumeGame(){
        this.scene.get("MusicManager").sfx_play_button();
        this.mapsScreen.visible = false;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].visible = false;
            this.buttons[i].disableInteractive();
        }
        game.scene.resume('Level_' + currentScene);
    }

    StartCountdown() {
        //While the player has not finished the race, count the time it is taking
        let thisRaceTime = this.raceTime; //Reference for the change of scope

        this.raceTimer = this.time.addEvent({ //Blink immunity effect
            delay: 1000,
            loop: true,
            callback: function () {
                raceTimeCount -= 1;
                thisRaceTime.setText(raceTimeCount);
            }
        });
    }

    UpdateRacePosition(spot) {
        this.player.racePosition += spot;
        this.racePosition.setText(this.player.racePosition + "º");
    }

}