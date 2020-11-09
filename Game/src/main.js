let game;

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 768,        //The FoV of our camera will be the width x height we write here
        height: 1365,
        title: 'Fly penguin fly',
        version: '1.0',
        pixelArt: false,
        scene: [
            //Scene_Dummy,
            Scene_Preload,
            //Scene_LeftPanel,
            Scene_Level_01,
            Scene_InGameHUD
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
    }
    window.focus();

    // game.events.on('hidden',function(){
    //     console.log('hidden');
    //     console.log(game.time.elapsedTime);
    // },this);
    //
    // game.events.on('visible',function(){
    //     console.log('visible');
    // },this);

    //resizeScreen();
    //window.addEventListener("resize", resizeScreen);
}

function GetDeltaTime() {
    let time = new Date().getTime();
    let deltaTime = (time - game.global.lastTime);
    game.global.lastTime = time;
    console.log("DELTA TIME: " + deltaTime);
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
