//<editor-fold desc="Configure the game">

//Configure game

let config = {
    type: Phaser.AUTO,
    width: 1280,        //The FoV of our camera will be the width x height we write here
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
let i = 0;

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

    platforms.create(skySpr.width / 2 * scaledW, skySpr.height * scaledH - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    // platforms.create(config.width / 2 - levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();
    // platforms.create(config.width / 2 + levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();

    //Create player
    player = this.physics.add.sprite(skySpr.width / 2 * scaledW, skySpr.height * scaledH - 32 - 333 / 2, 'player').setScale(32 / 334, 32 / 333).refreshBody();
    player.setBounce(0.4, 0.2);
    player.setDrag(50, 0);
    player.setCollideWorldBounds(true);

    //Physics
    this.physics.add.collider(player, platforms);

    //Camera follow and bounds
    //this.cameras.main.setBounds(config.width, 0, config.width, skySpr.height * scaledH); //First two parameters are top left and the other two are bottom right corners
    this.physics.world.setBounds(config.width, 0, config.width, skySpr.height * scaledH); //The world bounds define where the world colliders are (its like a box for the player/s)
    this.cameras.main.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV
    this.cameras.main.scrollX = config.width; //scrollX is X coordinate of the top left corner of the FoV of our cam
}

function update() {
    if (gameOver) return;

    //Player Movement
    if (controls.up.isDown)
        player.setVelocityY(-525);
    if (controls.right.isDown)
        player.setVelocityX(250);
    if (controls.left.isDown)
        player.setVelocityX(-250);

    //Camera variation
    this.cameras.main.scrollY = player.y - config.height / 2; //scrollY is the Y coordinate top left corner of the FoV of our cam

    if (player.y < config.height * 6 && !zoomedOut) {
        zoomedOut = true;
        this.physics.world.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
        //this.cameras.main.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1/3, 2000);
    }
    if (player.y < config.height * 3 && !zoomedIn) {
        zoomedIn = true;
        this.physics.world.setBounds(config.width, 0, config.width, skySpr.height * scaledH);
        //this.cameras.main.setBounds(config.width, 0, config.width, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1, 2000);
    }
}

//</editor-fold>