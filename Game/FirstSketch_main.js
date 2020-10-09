//<editor-fold desc="Configure the game">

//Configure game

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,        //[HERE] We have to make it responsive!
    title: 'First Sketch',
    version: '1.0',
    pixelArt: true,    //[HERE] Do we want this value either be true or false?

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
let gameOver = false;

//Player
let player;
let controls;

//Scene
let levelWide = 500;
let scaledW;
let scaledH;
let zoomedIn;
let zoomedOut;

//Assets
let skySpr;
let platforms;

//</editor-fold>

//<editor-fold desc="Game Loop functions">

//Game Loop functions

function preload() {
    //Load the resources
    this.load.image('player', 'Assets/Sprites/Player_Placeholder.png');
    this.load.image('sky', 'Assets/Sprites/Background_Sky_Long2.png');
    this.load.image('platform', 'Assets/Sprites/Background_Platform.png');
}

function create() {
    //Create controls
    controls = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.SPACE,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    //Create assets
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    //skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height);

    //We have to rescale the background scale to adapt its size to the device's
    scaledW = config.width / (skySpr.width / 3);
    scaledH = config.height / (skySpr.height / 10);
    skySpr.setScale(scaledW, scaledH);

    //Create level
    platforms = this.physics.add.staticGroup();

    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    platforms.create(config.width / 2 - levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();
    platforms.create(config.width / 2 + levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();

    //Create player
    player = this.physics.add.sprite(skySpr.width / 2 * scaledW, skySpr.height * scaledH - 32 - 333 / 2, 'player').setScale(32 / 334, 32 / 333).refreshBody();
    player.setBounce(0.4, 0.2);
    player.setDrag(50, 0);
    //player.setCollideWorldBounds(true);

    //Physics
    this.physics.add.collider(player, platforms);

    //Camera follow
    //this.cameras.main.setBounds(0, 0, config.width, 2160); //First two parameters are an offset
    this.cameras.main.setBounds(config.width, 0, config.width, skySpr.height * scaledH); //First two parameters are an offset
    this.cameras.main.startFollow(player);
    //The camera's size must be adapted to the device's (config.width and config.height)
}

function update() {
    if (gameOver) return;

    //Player Movement
    if (controls.up.isDown)
        player.setVelocityY(-225);
    if (controls.right.isDown)
        player.setVelocityX(150);
    if (controls.left.isDown)
        player.setVelocityX(-150);

    //Map variation
    // if (player.y < skySpr.height * scaledH - config.height / 2) {
    //     this.cameras.main.startFollow(player);
    // }

    if (player.y < config.height * 6 && !zoomedOut) {
        zoomedOut = true;
        this.cameras.main.zoomTo(0.35, zoomOut(this.cameras.main, 0, 0, 0));
    }
    if (player.y < config.height * 3 && !zoomedIn) {
        zoomedIn = true;
        this.cameras.main.zoomTo(1, zoomIn(this.cameras.main, 0, 0, 0));
    }
}

function zoomOut(camera, progress, x, y){
    //this.cameras.main.centerOn(player.x, player.y);
    camera.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
}
function zoomIn(camera, progress, x, y){
    //this.cameras.main.centerOn(player.x, player.y);
    camera.setBounds(config.width, 0, config.width, skySpr.height * scaledH);
}

//</editor-fold>