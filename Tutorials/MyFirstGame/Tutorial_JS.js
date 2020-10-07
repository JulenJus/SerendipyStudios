
//Configure the game
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    title: 'Tutorial',      //Optional
    version: '1.0',         //Optional
    pixelArt: true,         //If you make zoom, it does not blur the pixels, instead they remain scaled.

    //Let the physics config
    physics:{
        default: 'arcade',
        arcade:{
            gravity: { y: 300 },        //The units are ...?
            isPaused: false,            //Stops the physics or the game?
            debug: false                //Enables/Disables the debug mode
        }
    },

    //Let the game callbacks
    scene:{
        preload: preload,
        create: create,
        update: update
    }
};

//Global variables
let game = new Phaser.Game(config);
let platforms;
let skySpr;

//Game Loop functions
function preload(){
    //Load the resources
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('dude', 'assets/dude.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
}

function create(){
    //Create the sky
    skySpr= this.add.image(0,0,'sky').setOrigin(0, 0);      //The origin is in top left corner, so if you don't modify the sprite's center you'll only see the bottom right section.
    skySpr.setScale(config.width/ skySpr.width, config.height / skySpr.height); //Adjust to screen size

    //Create the ground group
    platforms = this.physics.add.staticGroup(); //The object will have collisions but won't be affected by gravity.
                                                // The groups are used to contain same objects with same behaviours.
    //Create the ground
    platforms.create(config.width/2, config.height -16, 'platform').setScale(config.width / 400, 1).refreshBody();  //Let the ground.
                                                // The refreshBody is to commit the changes over the object.

    //Create other platforms
    platforms.create(600,400, 'platform');
    platforms.create(50,550, 'platform');
    platforms.create(1100,220, 'platform');
}

function update(){

}