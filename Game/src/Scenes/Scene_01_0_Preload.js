class Scene_01_0_Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        //console.log("Preload constructor");
    }

    preload() {

        //Pass preload progress info to charge scene
        let thisScene = this.scene;
        this.load.on('progress', function (value) {
            thisScene.get('Charge').setProgress(value);
        });

        //<editor-fold desc="Load assets">

        this.loadMusic();
        this.loadGen();
        this.loadMainMenu();
        this.loadHowToPlay();
        this.loadTutorial();
        this.loadChooseMode();
        this.loadCredits();
        this.loadShop();
        this.loadSettings();
        this.loadLobby();
        this.loadLevels();
        this.loadRanking();

        //</editor-fold>
    }

    create() {
        //console.log("Create preload");
        this.scene.stop("Charge");
        this.scene.start("MusicManager");
        this.scene.start("MainMenu");
    }

    //<editor-fold desc="Load functions">

    loadMusic(){
        this.load.audio('music_inGame','./assets/Sounds/Music/music_inGame.mp3');
        this.load.audio('music_mainMenu','./assets/Sounds/Music/music_mainMenu.mp3');
    }

    loadGen() {
        this.load.image('gen_mainscreen', './assets/Sprites/Menus/Gen/gen_mainscreen.png');
        this.load.image('gen_mainscreen_simple', './assets/Sprites/Menus/Gen/gen_mainscreen_simple.png');
        this.load.image('gen_buttonExit_static', './assets/Sprites/Menus/Gen/gen_buttonExit_static.png');
        this.load.image('gen_buttonExit_over', './assets/Sprites/Menus/Gen/gen_buttonExit_over.png');

        //Audio
        this.load.audio('sfx_gen_button','./assets/Sounds/SFX/gen_button.mp3');
    }

    loadMainMenu() {
        this.load.image('mainMenu_title', './assets/Sprites/Menus/MainMenu/mainMenu_title.png');
        this.load.image('mainMenu_buttonPlay_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonPlay_static.png');
        this.load.image('mainMenu_buttonPlay_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonPlay_over.png');
        this.load.image('mainMenu_buttonHowToPlay_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonHowToPlay_static.png');
        this.load.image('mainMenu_buttonHowToPlay_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonHowToPlay_over.png');
        this.load.image('mainMenu_buttonCredits_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonCredits_static.png');
        this.load.image('mainMenu_buttonCredits_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonCredits_over.png');
        this.load.image('mainMenu_buttonExit_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonExit_static.png');
        this.load.image('mainMenu_buttonExit_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonExit_over.png');
        this.load.image('mainMenu_buttonShop_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonShop_static.png');
        this.load.image('mainMenu_buttonShop_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonShop_over.png');
        this.load.image('mainMenu_buttonSettings_static', './assets/Sprites/Menus/MainMenu/mainMenu_buttonSettings_static.png');
        this.load.image('mainMenu_buttonSettings_over', './assets/Sprites/Menus/MainMenu/mainMenu_buttonSettings_over.png');
    }

    loadHowToPlay() {
        this.load.image('howToPlay_buttonBack_static', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonBack_static.png');
        this.load.image('howToPlay_buttonBack_over', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonBack_over.png');
        this.load.image('howToPlay_buttonNext_static', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonNext_static.png');
        this.load.image('howToPlay_buttonNext_over', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonNext_over.png');
        this.load.image('howToPlay_buttonPrevious_static', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonPrevious_static.png');
        this.load.image('howToPlay_buttonPrevious_over', './assets/Sprites/Menus/HowToPlay/howToPlay_buttonPrevious_over.png');

        this.load.image('howToPlay_sgtoJack', './assets/Sprites/Menus/HowToPlay/howToPlay_sgtoJack.png');

        //Tips
        for (let i = 1; i < 10; i++) {
            this.load.image('howToPlay_pc' + i, './assets/Sprites/Menus/HowToPlay/howToPlay_pc' + i + '.png');
        }

        this.load.image('howToPlay_mobile2', './assets/Sprites/Menus/HowToPlay/howToPlay_mobile2.png');
        this.load.image('howToPlay_mobile3', './assets/Sprites/Menus/HowToPlay/howToPlay_mobile3.png');
        this.load.image('howToPlay_mobile6', './assets/Sprites/Menus/HowToPlay/howToPlay_mobile6.png');
    }

    loadTutorial() {
        this.load.image('tilesheet_Level_Tutorial', './assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Level_Tutorial', './assets/Tilemaps/tutorial.json');
    }

    loadChooseMode(){
        this.load.image('chooseMode_buttonSinglePlayer_static', './assets/Sprites/Menus/Prelobby/prelobby_buttonSinglePlayer_static.png');
        this.load.image('chooseMode_buttonSinglePlayer_over', './assets/Sprites/Menus/Prelobby/prelobby_buttonSinglePlayer_over.png');
        this.load.image('chooseMode_buttonMultiplayer', './assets/Sprites/Menus/Prelobby/prelobby_buttonMultiplayer.png');
    }

    loadCredits() {
        this.load.image('credits_logs', './assets/Sprites/Menus/Credits/credits_logs.png');
        this.load.image('credits_buttonTwitter_static', './assets/Sprites/Menus/Credits/credits_buttonTwitter_static.png');
        this.load.image('credits_buttonTwitter_over', './assets/Sprites/Menus/Credits/credits_buttonTwitter_over_2.png');
    }

    loadShop() {
        this.load.image('shop_background', './assets/Sprites/Menus/Shop/shop_background.png');
        this.load.image('shop_buttonMaps_static', './assets/Sprites/Menus/Shop/shop_buttonMaps_static.png');
        this.load.image('shop_buttonMaps_over', './assets/Sprites/Menus/Shop/shop_buttonMaps_over.png');
        this.load.image('shop_buttonSkins_static', './assets/Sprites/Menus/Shop/shop_buttonSkins_static.png');
        this.load.image('shop_buttonSkins_over', './assets/Sprites/Menus/Shop/shop_buttonSkins_over.png');
        this.load.image('shop_buttonExit_static', './assets/Sprites/Menus/Shop/shop_buttonExit_static.png');
        this.load.image('shop_buttonExit_over', './assets/Sprites/Menus/Shop/shop_buttonExit_over.png');
        this.load.image('shop_mapsScreen', './assets/Sprites/Menus/Shop/shop_mapsScreen.png');
        this.load.image('shop_skinsScreen', './assets/Sprites/Menus/Shop/shop_skinsScreen.png');
        this.load.image('shop_screensButtonExit_static', './assets/Sprites/Menus/Shop/shop_buttonExit_static.png');
        this.load.image('shop_screensButtonExit_over', './assets/Sprites/Menus/Shop/shop_buttonExit_over.png');
    }

    loadSettings(){
        this.load.image('settings_background', './assets/Sprites/Menus/Settings/settings_background.png');
        this.load.image('settings_barEdge', './assets/Sprites/Menus/Settings/settings_barEdge.png');
        this.load.image('settings_barFill', './assets/Sprites/Menus/Settings/settings_barFill.png');
        this.load.image('settings_littleIce', './assets/Sprites/Menus/Settings/settings_littleIce.png');
    }

    loadLobby() {
        this.load.image('lobby_background', './assets/Sprites/Menus/Lobby/lobby_background.png');

        //Buttons
        this.load.image('lobby_buttonExit_static', './assets/Sprites/Menus/Lobby/lobby_buttonExit_static.png');
        this.load.image('lobby_buttonPlay_static', './assets/Sprites/Menus/Lobby/lobby_buttonPlay_static.png');
        this.load.image('lobby_buttonSalir_static', './assets/Sprites/Menus/Lobby/lobby_buttonSalir_static.png');
        this.load.image('lobby_buttonSalir_over', './assets/Sprites/Menus/Lobby/lobby_buttonSalir_over.png');
        this.load.image('lobby_buttonJugar_static', './assets/Sprites/Menus/Lobby/lobby_buttonJugar_static.png');
        this.load.image('lobby_buttonJugar_over', './assets/Sprites/Menus/Lobby/lobby_buttonJugar_over.png');
        this.load.image('lobby_buttonJugar_deactivated', './assets/Sprites/Menus/Lobby/lobby_buttonJugar_deactivated.png');
        this.load.image('lobby_buttonSelBack_static', './assets/Sprites/Menus/Lobby/lobby_buttonSelBack_static.png');
        this.load.image('lobby_buttonSelBack_over', './assets/Sprites/Menus/Lobby/lobby_buttonSelBack_over.png');
        this.load.image('lobby_buttonSelNext_static', './assets/Sprites/Menus/Lobby/lobby_buttonSelNext_static.png');
        this.load.image('lobby_buttonSelNext_over', './assets/Sprites/Menus/Lobby/lobby_buttonSelNext_over.png');

        this.load.image('lobby_buttonBigSel_Blue', './assets/Sprites/Menus/Lobby/lobby_buttonsingleBigSelBlue.png');
        this.load.image('lobby_buttonAccept_Blue_static', './assets/Sprites/Menus/Lobby/lobby_buttonAccept_Blue_static.png');
        this.load.image('lobby_buttonAccept_Blue_over', './assets/Sprites/Menus/Lobby/lobby_buttonAccept_Blue_over.png');
        this.load.image('lobby_buttonBack_Blue_static', './assets/Sprites/Menus/Lobby/lobby_buttonBack_Blue_static.png');
        this.load.image('lobby_buttonBack_Blue_over', './assets/Sprites/Menus/Lobby/lobby_buttonBack_Blue_over.png');
        this.load.image('lobby_buttonNext_Blue_static', './assets/Sprites/Menus/Lobby/lobby_buttonNext_Blue_static.png');
        this.load.image('lobby_buttonNext_Blue_over', './assets/Sprites/Menus/Lobby/lobby_buttonNext_Blue_over.png');

        //Characters
        let chars = [
            "Armin",
            "Bob",
            "Karta",
            "Steve"
        ];
        for (let i = 0; i < chars.length; i++) {
            this.load.image('lobby_char_' + chars[i] + 'Big', './assets/Sprites/Menus/Lobby/lobby_char_' + chars[i] + 'Big.png');
            this.load.image(chars[i] +'Plush', './assets/Sprites/Menus/Lobby/Plushes/' + chars[i] + 'Plush.png'); //Sofa penguins
        }

        //Done ticks
        this.load.image('lobby_ready_bigTick', './assets/Sprites/Menus/Lobby/lobby_ready_bigTick.png');
        this.load.image('lobby_ready_littleTick', './assets/Sprites/Menus/Lobby/lobby_ready_littleTick.png');
    }

    loadLevels() {
        this.loadGenLevel();
        this.loadInGameHUD();
        this.loadLevel01();
        this.loadLevel02();
        this.loadLevel03();
    }

    //<editor-fold desc="Level load functions">

    loadGenLevel() {
        //Player sprites
        this.load.image('gen_player', './assets/Sprites/Characters/Steve/SteveScaled.png');

        //Player animations
        this.load.spritesheet('gen_player_animation_Idle_Armin', './assets/Sprites/Animations/Armin/gen_player_animation_Idle_Armin.png', {
            frameWidth: 141,
            frameHeight: 119
        });
        this.load.spritesheet('gen_player_animation_Idle_Bob', './assets/Sprites/Animations/Bob/gen_player_animation_Idle_Bob.png', {
            frameWidth: 153.74,
            frameHeight: 119
        });
        this.load.spritesheet('gen_player_animation_Idle_Karta', './assets/Sprites/Animations/Karta/gen_player_animation_Idle_Karta.png', {
            frameWidth: 123.56,
            frameHeight: 119
        });
        this.load.spritesheet('gen_player_animation_Idle_Steve', './assets/Sprites/Animations/Steve/gen_player_animation_Idle_Steve.png', {
            frameWidth: 128.8,
            frameHeight: 119
        });

        //Enemies animations
        this.load.spritesheet('gen_saw_animation', './assets/Sprites/Animations/Enemies/gen_saw_animation.png', {
            frameWidth: 128,
            frameHeight: 128
        });
        this.load.image('gen_saw_path', './assets/Sprites/Animations/Enemies/gen_saw_path.png');

        //Power up sprite assets
        this.load.image('gen_powerUpBox_sprite', './assets/Sprites/Basic PowerUps/gen_powerUpBox_sprite.png');
        this.load.image('gen_powerUp_shield_sprite', './assets/Sprites/Basic PowerUps/gen_powerUp_shield_sprite.png');

        //Power ups animations
        this.load.spritesheet('gen_powerUp_dash_animation', './assets/Sprites/Animations/PowerUps/Dash/gen_powerUp_dash_animation.png', {
            frameWidth: 65,
            frameHeight: 100
        });

        //Power up box animations
        this.load.spritesheet('gen_powerUpBox_spriteAnimation_Idle', './assets/Sprites/Animations/PowerUps/Box/gen_powerUpBox_spriteAnimation_Idle.png', {
            frameWidth: 120,
            frameHeight: 59
        });

        //RaceLine
        this.load.image('gen_finishLine_sprite', './assets/Sprites/UI/gen_finishLine_sprite.png');

        //Audio
        this.load.audio('sfx_genLvl_box','./assets/Sounds/SFX/genLvl_box.mp3');
        this.load.audio('sfx_genLvl_powerUp_shield','./assets/Sounds/SFX/genLvl_powerUp_shield.mp3');
        this.load.audio('sfx_genLvl_powerUp_shield_broken','./assets/Sounds/SFX/genLvl_powerUp_shield_broken.mp3');
        this.load.audio('sfx_genLvl_powerUp_dash','./assets/Sounds/SFX/genLvl_powerUp_dash.mp3');
        this.load.audio('sfx_genLvl_collision','./assets/Sounds/SFX/genLvl_collision.mp3');
        this.load.audio('sfx_genLvl_squawk','./assets/Sounds/SFX/genLvl_squawk.mp3');
        this.load.audio('sfx_genLvl_flap','./assets/Sounds/SFX/genLvl_flap.mp3');
        this.load.audio('sfx_genLvl_goal','./assets/Sounds/SFX/genLvl_goal.mp3');
        this.load.audio('sfx_genLvl_damage','./assets/Sounds/SFX/genLvl_damage.mp3');
        this.load.audio('sfx_genLvl_countdown_short','./assets/Sounds/SFX/genLvl_countdown_short.mp3');
        this.load.audio('sfx_genLvl_countdown_long','./assets/Sounds/SFX/genLvl_countdown_long.mp3');
    }

    loadInGameHUD() {
        //General UI
        this.load.image('UI_powerUpEmpty', './assets/Sprites/UI/inGame_boostBase.png');
        this.load.image('UI_exitButton', './assets/Sprites/UI/inGame_buttonExit.png');
        this.load.image('UI_exitConfirmationScreen', './assets/Sprites/Menus/Preexit/preexit_background.png');
        this.load.image('UI_exitConfirmationScreen_NoButton_over', './assets/Sprites/Menus/Preexit/preexit_buttonNo_over.png');
        this.load.image('UI_exitConfirmationScreen_NoButton_static', './assets/Sprites/Menus/Preexit/preexit_buttonNo_static.png');
        this.load.image('UI_exitConfirmationScreen_YesButton_over', './assets/Sprites/Menus/Preexit/preexit_buttonYes_over.png');
        this.load.image('UI_exitConfirmationScreen_YesButton_static', './assets/Sprites/Menus/Preexit/preexit_buttonYes_static.png');

        //MovementBar UI
        this.load.image('UI_bar', './assets/Sprites/UI/barra.png'); //Jumping bar assets
        this.load.image('UI_blueMark', './assets/Sprites/UI/hieloazul.png');
        this.load.image('UI_greenMark', './assets/Sprites/UI/hieloverde.png');
        this.load.image('UI_yellowMark', './assets/Sprites/UI/hieloamarillo.png');
        this.load.image('UI_redMark', './assets/Sprites//UI/hielorojo.png');

        //Race progress UI
        this.load.image('UI_raceBar', './assets/Sprites/UI/RaceBar1.png'); //Race bar assets
        this.load.image('UI_playerMark', './assets/Sprites/UI/PlayerMark2.png');

        //Power ups
        this.load.image('UI_shieldPowerUp', './assets/Sprites/UI/inGame_boostShield.png');
        this.load.image('UI_dashPowerUp1', './assets/Sprites/UI/inGame_boostVel1.png');//Buttons assets
        this.load.image('UI_dashPowerUp2', './assets/Sprites/UI/inGame_boostVel2.png');
        this.load.image('UI_dashPowerUp3', './assets/Sprites/UI/inGame_boostVel3.png');
    }

    loadLevel01() {
        this.load.image('tilesheet_Level_01', './assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Level_01', './assets/Tilemaps/mapa1.json');
    }

    loadLevel02() {
        this.load.image('tilesheet_Level_02', './assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Level_02', './assets/Tilemaps/mapa2.json');
    }

    loadLevel03() {
        this.load.image('tilesheet_Level_03', './assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Level_03', './assets/Tilemaps/mapa3.json');
    }

    //</editor-fold>

    loadRanking() {
        //Cheer penguins animations
        this.load.spritesheet('cheerPenguin_animation_Glove_Left', './assets/Sprites/Animations/Pingu/Cheer/cheerPenguin_animation_Glove_Left.png', {
            frameWidth: 82.533,
            frameHeight: 60
        });
        this.load.spritesheet('cheerPenguin_animation_Glove_Right', './assets/Sprites/Animations/Pingu/Cheer/cheerPenguin_animation_Glove_Right.png', {
            frameWidth: 82.533,
            frameHeight: 60
        });
        this.load.spritesheet('cheerPenguin_animation_Pompoms', './assets/Sprites/Animations/Pingu/Cheer/cheerPenguin_animation_Pompoms.png', {
            frameWidth: 94.944,
            frameHeight: 60
        });
        this.load.image('tilesheet_Ranking', './assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Ranking', './assets/Tilemaps/ranking.json');

        //Audio
        this.load.audio('sfx_ranking_clap', './assets/Sounds/SFX/ranking_clap.mp3');
    }

    //</editor-fold>

}


