class Scene_01_Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
        console.log("Preload constructor");
    }

    preload() {
        //<editor-fold desc="Preload animation">

        //Set the progress vars
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(game.config.width / 2 - 320 / 2, game.config.height / 2 - 50 / 2, 320, 50);

        //Set texts
        let loadingText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //Event listeners
        this.load.on('progress', function (value) {
            //console.log(value);

            //Set percent text
            percentText.setText(parseInt(value * 100) + '%');

            //Set progress bar
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(game.config.width / 2 - 300 / 2, game.config.height / 2 - 30 / 2, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            //Display the progress animation
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            //Destroy the bar and display the logo/animation
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        //</editor-fold>

        //<editor-fold desc="Load assets">

        this.loadGen();
        this.loadMainMenu();
        this.loadHowToPlay();
        this.loadTutorial();
        this.loadCredits();
        this.loadShop();
        this.loadLobby();
        this.loadLevels();
        this.loadRanking();

        //</editor-fold>

    }

    create() {
        //console.log("Preload");
        //this.scene.start("Level_01");
        this.scene.start("MainMenu");
    }

    //<editor-fold desc="Load functions">

    loadGen() {
        this.load.image('gen_mainscreen', '../assets/Sprites/Menus/Gen/gen_mainscreen.png');
        this.load.image('gen_buttonExit_static', '../assets/Sprites/Menus/Gen/gen_buttonExit_static.png');
        this.load.image('gen_buttonExit_over', '../assets/Sprites/Menus/Gen/gen_buttonExit_over.png');
    }

    loadMainMenu() {
        this.load.image('mainMenu_title', '../assets/Sprites/Menus/MainMenu/mainMenu_title.png');
        this.load.image('mainMenu_buttonPlay_static', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonPlay_static.png');
        this.load.image('mainMenu_buttonPlay_over', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonPlay_over.png');
        this.load.image('mainMenu_buttonHowToPlay_static', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonHowToPlay_static.png');
        this.load.image('mainMenu_buttonHowToPlay_over', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonHowToPlay_over.png');
        this.load.image('mainMenu_buttonCredits_static', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonCredits_static.png');
        this.load.image('mainMenu_buttonCredits_over', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonCredits_over.png');
        this.load.image('mainMenu_buttonExit_static', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonExit_static.png');
        this.load.image('mainMenu_buttonExit_over', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonExit_over.png');
        this.load.image('mainMenu_buttonShop_static', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonShop_static.png');
        this.load.image('mainMenu_buttonShop_over', '../assets/Sprites/Menus/MainMenu/mainMenu_buttonShop_over.png');
    }

    loadHowToPlay() {
        this.load.image('howToPlay_buttonBack_static', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonBack_static.png');
        this.load.image('howToPlay_buttonBack_over', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonBack_over.png');
        this.load.image('howToPlay_buttonNext_static', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonNext_static.png');
        this.load.image('howToPlay_buttonNext_over', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonNext_over.png');
        this.load.image('howToPlay_buttonPrevious_static', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonPrevious_static.png');
        this.load.image('howToPlay_buttonPrevious_over', '../assets/Sprites/Menus/HowToPlay/howToPlay_buttonPrevious_over.png');

        this.load.image('howToPlay_sgtoJack', '../assets/Sprites/Menus/HowToPlay/howToPlay_sgtoJack.png');

        //Tips
        for (let i = 1; i < 10; i++) {
            this.load.image('howToPlay_pc' + i, '../assets/Sprites/Menus/HowToPlay/howToPlay_pc' + i + '.png');
        }

        this.load.image('howToPlay_mobile2', '../assets/Sprites/Menus/HowToPlay/howToPlay_mobile2.png');
        this.load.image('howToPlay_mobile3', '../assets/Sprites/Menus/HowToPlay/howToPlay_mobile3.png');
        this.load.image('howToPlay_mobile6', '../assets/Sprites/Menus/HowToPlay/howToPlay_mobile6.png');
    }

    loadTutorial() {
        this.load.image('tilesheet_Tutorial', '../assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Tutorial', '../assets/Tilemaps/tutorial.json');
    }

    loadCredits() {
        this.load.image('credits_logs', '../assets/Sprites/Menus/Credits/credits_logs.png');
        this.load.image('credits_buttonTwitter_static', '../assets/Sprites/Menus/Credits/credits_buttonTwitter_static.png');
        this.load.image('credits_buttonTwitter_over', '../assets/Sprites/Menus/Credits/credits_buttonTwitter_over.png');
    }

    loadShop() {
        this.load.image('shop_background','../assets/Sprites/Menus/Shop/shop_background.png');
        this.load.image('shop_buttonMaps_static','../assets/Sprites/Menus/Shop/shop_buttonMaps_static.png');
        this.load.image('shop_buttonMaps_over','../assets/Sprites/Menus/Shop/shop_buttonMaps_over.png');
        this.load.image('shop_buttonSkins_static','../assets/Sprites/Menus/Shop/shop_buttonSkins_static.png');
        this.load.image('shop_buttonSkins_over','../assets/Sprites/Menus/Shop/shop_buttonSkins_over.png');
        this.load.image('shop_buttonExit_static','../assets/Sprites/Menus/Shop/shop_buttonExit_static.png');
        this.load.image('shop_buttonExit_over','../assets/Sprites/Menus/Shop/shop_buttonExit_over.png');
        this.load.image('shop_mapsScreen','../assets/Sprites/Menus/Shop/shop_mapsScreen.png');
        this.load.image('shop_skinsScreen','../assets/Sprites/Menus/Shop/shop_skinsScreen.png');
        this.load.image('shop_screensButtonExit_static','../assets/Sprites/Menus/Shop/shop_buttonExit_static.png');
        this.load.image('shop_screensButtonExit_over','../assets/Sprites/Menus/Shop/shop_buttonExit_over.png');
    }

    loadLobby() {
        this.load.image('lobby_background', '../assets/Sprites/Menus/Lobby/lobby_background.png');

        //Buttons
        this.load.image('lobby_buttonExit_static', '../assets/Sprites/Menus/Lobby/lobby_buttonExit_static.png');
        this.load.image('lobby_buttonPlay_static', '../assets/Sprites/Menus/Lobby/lobby_buttonPlay_static.png');
        this.load.image('lobby_buttonSalir_static', '../assets/Sprites/Menus/Lobby/lobby_buttonSalir_static.png');
        this.load.image('lobby_buttonJugar_static', '../assets/Sprites/Menus/Lobby/lobby_buttonJugar_static.png');
        this.load.image('lobby_buttonSelBack_static', '../assets/Sprites/Menus/Lobby/lobby_buttonSelBack_static.png');
        this.load.image('lobby_buttonSelNext_static', '../assets/Sprites/Menus/Lobby/lobby_buttonSelNext_static.png');

        //Colors
        let colors = ["Blue", "Green", "Orange", "Red"];
        for (let i = 0; i < colors.length; i++) {
            this.load.image('lobby_buttonAccept_' + colors[i], '../assets/Sprites/Menus/Lobby/lobby_buttonAccept_' + colors[i] + '.png');
            this.load.image('lobby_buttonBack_' + colors[i], '../assets/Sprites/Menus/Lobby/lobby_buttonBack_' + colors[i] + '.png');
            this.load.image('lobby_buttonBigSel_' + colors[i], '../assets/Sprites/Menus/Lobby/lobby_buttonBigSel_' + colors[i] + '.png');
            this.load.image('lobby_buttonLittleSel_' + colors[i], '../assets/Sprites/Menus/Lobby/lobby_buttonLittleSel_' + colors[i] + '.png');
            this.load.image('lobby_buttonNext_' + colors[i], '../assets/Sprites/Menus/Lobby/lobby_buttonNext_' + colors[i] + '.png');
        }
    }

    loadLevels() {
        this.loadGenLevel();
        this.loadInGameHUD();
        this.loadLevel01();
        this.loadLevel02();
    }

    //<editor-fold desc="Level load functions">

    loadGenLevel() {
        //Player sprites
        this.load.image('player', '../assets/Sprites/Characters/Armin/ArminScaled.png');

        //Players animations
        this.load.spritesheet('gen_player_animation_Idle_Armin', '../assets/Sprites/Animations/Armin/gen_player_animation_Idle_Armin.png', {frameWidth: 141, frameHeight: 119});
        this.load.spritesheet('gen_player_animation_Idle_Bob', '../assets/Sprites/Animations/Bob/gen_player_animation_Idle_Bob.png', {frameWidth: 153.74, frameHeight: 119});
        this.load.spritesheet('gen_player_animation_Idle_Karta', '../assets/Sprites/Animations/Karta/gen_player_animation_Idle_Karta.png', {frameWidth: 123.56, frameHeight: 119});
        this.load.spritesheet('gen_player_animation_Idle_Steve', '../assets/Sprites/Animations/Steve/gen_player_animation_Idle_Steve.png', {frameWidth: 128.8, frameHeight: 119});

        //Power up sprite assets
        this.load.image('gen_powerUpBox_sprite', '../assets/Sprites/Basic PowerUps/gen_powerUpBox_sprite.png');
        this.load.image('gen_powerUp_shield_sprite', '../assets/Sprites/Basic PowerUps/gen_powerUp_shield_sprite.png');

        //Power up box animations
        this.load.spritesheet('gen_powerUpBox_spriteAnimation_Idle', '../assets/Sprites/Animations/PowerUps/Box/gen_powerUpBox_spriteAnimation_Idle.png', {frameWidth: 400, frameHeight: 198});
      
        //RaceLine
        //this.load.image('genLevel_gen_finishLine_sprite', '../assets/Sprites/UI/gen_finishLine_sprite.png'); //Turn all the assets to this nommenclature
        this.load.image('gen_finishLine_sprite', '../assets/Sprites/UI/gen_finishLine_sprite.png');
    }

    loadInGameHUD() {
        //General UI
        this.load.image('UI_powerUpEmpty', '../assets/Sprites/UI/inGame_boostBase.png');
        this.load.image('UI_exitButton', '../assets/Sprites/UI/inGame_buttonExit.png');

        //MovementBar UI
        this.load.image('UI_bar', '../assets/Sprites/UI/barra.png'); //Jumping bar assets
        this.load.image('UI_blueMark', '../assets/Sprites/UI/hieloazul.png');
        this.load.image('UI_greenMark', '../assets/Sprites/UI/hieloverde.png');
        this.load.image('UI_yellowMark', '../assets/Sprites/UI/hieloamarillo.png');
        this.load.image('UI_redMark', '../assets/Sprites//UI/hielorojo.png');

        //Race progress UI
        this.load.image('UI_raceBar', '../assets/Sprites/UI/RaceBar.png'); //Race bar assets
        this.load.image('UI_playerMark', '../assets/Sprites/UI/PlayerMark.png');

        //Power ups
        this.load.image('UI_shieldPowerUp', '../assets/Sprites/UI/inGame_boostShield.png');
        this.load.image('UI_dashPowerUp1', '../assets/Sprites/UI/inGame_boostVel1.png');//Buttons assets
        this.load.image('UI_dashPowerUp2', '../assets/Sprites/UI/inGame_boostVel2.png');
        this.load.image('UI_dashPowerUp3', '../assets/Sprites/UI/inGame_boostVel3.png');
    }

    loadLevel01() {
        this.load.image('tilesheet_Level_01', '../assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Level_01', '../assets/Tilemaps/mapa1.json');
    }

    loadLevel02() {

    }

    //</editor-fold>

    loadRanking() {
        this.load.image('tilesheet_Ranking', '../assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap_Ranking', '../assets/Tilemaps/ranking.json');
    }

    //</editor-fold>

}


