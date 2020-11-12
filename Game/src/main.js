let game;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 768,        //The FoV of our camera will be the width x height we write here
        height: 1365,
        title: 'Flyguins',
        version: '1.0',
        pixelArt: false,
        scene: [
            //Scene_00_Dummy,
            // Scene_01_Preload,
            // Scene_02_0_MainMenu,
            // Scene_02_1_HowToPlay,
            // Scene_02_2_Tutorial,
            // Scene_02_3_Credits,
            // Scene_02_4_Shop,
            // Scene_03_0_Lobby,
            // Scene_04_1_Level_01,
            // Scene_04_2_Level_02,
            // Scene_04_0_InGameHUD,
            // Scene_05_0_Ranking

            Scene_01_Preload,
            Scene_02_2_Tutorial,
            Scene_04_1_Level_01,
            Scene_04_2_Level_02,
            Scene_04_0_InGameHUD,
            Scene_02_0_MainMenu,
            Scene_02_1_HowToPlay,
            Scene_02_3_Credits,
            Scene_02_4_Shop,
            Scene_03_0_Lobby,
            Scene_05_0_Ranking
        ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                isPaused: false,
                debug: false
            },
        },
        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
            mode: Phaser.Scale.FIT,
            parent: 'mainCanvas'
        },
    };

    game = new Phaser.Game(config);
    game.global = {
        lastTime: new Date().getTime()
    };

    window.focus();

    //resizeScreen();
    //window.addEventListener("resize", resizeScreen);
}

function GetDeltaTime() {
    let time = new Date().getTime();
    let deltaTime = (time - game.global.lastTime);
    game.global.lastTime = time;

    return deltaTime / 1000;
}

/*
function resizeScreen(){
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}*/
