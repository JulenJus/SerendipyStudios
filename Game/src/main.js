window.onload = function(){
    var config= {
        type: Phaser.AUTO,
        width: 1080,        //The FoV of our camera will be the width x height we write here
        height: 720,        //[HERE] We have to make it responsive!
        title: 'Fly penguin fly',
        version: '1.0',
        pixelArt: false,
        scene: [
            //Scene_Dummy,
            Scene_Preload,
            Scene_Level_01
        ],

        //Let the physics config
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 300},
                isPaused: false,
                debug: false
            }
        },

        scale: {
            autoCenter: Phaser.Scale.CENTER_BOTH,
            mode: Phaser.Scale.FIT,
            parent: 'mainCanvas'
        }
    }

    game = new Phaser.Game(config);
    window.focus();
    //resizeScreen();
    //window.addEventListener("resize", resizeScreen);
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
