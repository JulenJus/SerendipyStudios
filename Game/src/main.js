
let config = {
    type: Phaser.AUTO,
    width: 1080,        //The FoV of our camera will be the width x height we write here
    height: 720,        //[HERE] We have to make it responsive!
    title: 'First Sketch',
    version: '1.0',
    pixelArt: true,
    scene: [Scene1, Scene2],

    //Let the physics config
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            isPaused: false,
            debug: false
        }
    },
    //Scale the game (taking the aspect ratio into account)
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        parent: 'mainCanvas'
    }
};

let game = new Phaser.Game(config);