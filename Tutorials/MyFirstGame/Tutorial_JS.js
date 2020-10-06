let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    title: 'Tutorial',
    version: '1.0',
    pixelArt: true,
    physics:{
        default: 'arcade',
        arcade:{
            gravity: { y: 300 },
            isPaused: false,
            debug: false
        }
    },
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

//Global variables
let game = new Phaser.Game(config);
let platforms;
let skySpr

function preload(){
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dude', 'assets/dude.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
}

function create(){
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0); //if we dont change the origin of the image to (0, 0) we would write: let sprite = this.add.image(config.width / 2, config.height / 2, 'sky');
    skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height); //the sky will have the size of the screen

    platforms = this.physics.add.staticGroup();
    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 550, 'platform');
    platforms.create(1100, 220, 'platform');
}

function update(){

}