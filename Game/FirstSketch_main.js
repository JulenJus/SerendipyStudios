//<editor-fold desc="Configure the game">

//Configure game
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,        //[HERE] We have to make it responsive!
    title: 'First Sketch',
    version: '1.0',
    pixerlArt: true,    //[HERE] Do we want this value either be true or false?

    //Let the physics config
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            isPaused: false,
            debug: false
        }
    },

    //Let the game callbacks
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//</editor-fold>

//<editor-fold desc="Global variables">

//Global variables

//General
let game = new Phaser.Game(config);
let gameOver;

//Player
let player;
let controls;

//Scene
let levelWide = 500;

//Assets
let skySpr;
let platforms;

//</editor-fold>

//<editor-fold desc="Game Loop functions">

//Game Loop functions

function preload() {
    //Load the resources
    this.load.image('player', 'Assets/Sprites/Player_Placeholder.png');
    this.load.image('sky', 'Assets/Sprites/Background_Sky.png');
    this.load.image('platform', 'Assets/Sprites/Background_Platform.png');
}

function create() {
    //Create controls
    controls = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.space,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D
    });

    //Create assets
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height);

    //Create level
    platforms = this.physics.add.staticGroup();

    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    platforms.create(config.width / 2 - levelWide/2, config.height / 2, 'platform').setScale(1/400 * 32, config.height / 32).refreshBody();
    platforms.create(config.width / 2 + levelWide/2, config.height / 2, 'platform').setScale(1/400 * 32, config.height / 32).refreshBody();
}

function update() {

}

//</editor-fold>