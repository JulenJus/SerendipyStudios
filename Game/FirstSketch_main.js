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
let controlMode = 'Impulse';

//Player
let player;
let controls;

//Movement bar
let movementBarText;
let movementBarValue = 0.0;
let movementBarIncrement = true;

let movementBarSections = [0.0, 10.0, 30.0, 40.0, 50.0, 60.0, 70.0, 90.0, 100.0];
let movementBarSectionPercentages = [1, 0, 1, 2, 2, 1, 0, 1];
let movementBarImpulsePercentages = [0.2, 0.35, 1];

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
        up: Phaser.Input.Keyboard.KeyCodes.SPACE,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D
    });

    //Create assets
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0);
    skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height);

    //Create level
    platforms = this.physics.add.staticGroup();

    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    platforms.create(config.width / 2 - levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();
    platforms.create(config.width / 2 + levelWide / 2, config.height / 2, 'platform').setScale(1 / 400 * 32, config.height / 32).refreshBody();

    //Create player
    player = this.physics.add.sprite(config.width / 2, config.height - (32 + 32 / 2), 'player')
        .setScale(32 / 334, 32 / 333).refreshBody();
    player.setBounce(0.4, 0.2);
    player.setDrag(40, 0);
    player.setCollideWorldBounds(true);

    if (controlMode === 'Impulse') {
        this.input.keyboard.on('keydown_SPACE', jump);
    }

    //Physics
    this.physics.add.collider(player, platforms, collideCallback);

    //Create score
    movementBarText = this.add.text(16, 16, 'Bar Value: 0', {
        fontFamily: 'Gelato',
        fontStyle: 'Italic',
        fontSize: '32px',
        fill: '#000000'
    });
}

function update() {
    //if(gameOver) return;

    //Movement bar
    if (movementBarValue >= 100) {
        movementBarIncrement = -1;  //False -> Decrement
    }
    if (movementBarValue <= 0) {
        movementBarIncrement = 1;   //True -> Increment
    }

    movementBarValue += 0.5 * movementBarIncrement;
    movementBarText.setText("Bar value: " + movementBarValue);
    //console.log("Bar value: " + movementBarValue);

    //Player movement
    switch (controlMode) {
        case 'Impulse':
            /*if (controls.up.isDown) {
                console.log("Up");

                let impulsePercentage = getImpulsePercentage(movementBarValue);
                movementBarValue = 0;
                movementBarText.setText("Bar value: " + movementBarValue);

                player.setVelocityY(-225 * impulsePercentage);      //It's like an instant acceleration

                if (controls.left.isDown) {
                    //console.log("Left");
                    player.setVelocityX(-150 * impulsePercentage);
                }

                if (controls.right.isDown) {
                    //console.log("Right");
                    player.setVelocityX(150 * impulsePercentage);
                }
            }*/
            break;

        case 'Constant':
            if (controls.up.isDown) {
                //console.log("Up");
                player.setVelocityY(-225);      //It's like an instant acceleration
            }

            if (controls.left.isDown) {
                //console.log("Left");
                player.setVelocityX(-150);
            }

            if (controls.right.isDown) {
                //console.log("Right");
                player.setVelocityX(150);
            }

            break;
    }
}

//</editor-fold>

//<editor-fold desc="Methods">

//<editor-fold desc="Player movement methods">

function jump() {
    console.log("Up");

    let impulsePercentage = getImpulsePercentage(movementBarValue);
    movementBarValue = 0;
    movementBarText.setText("Bar value: " + movementBarValue);

    player.setVelocityY(-225 * impulsePercentage);      //It's like an instant acceleration

    if (controls.left.isDown) {
        //console.log("Left");
        player.setVelocityX(-150 * impulsePercentage);
    }

    if (controls.right.isDown) {
        //console.log("Right");
        player.setVelocityX(150 * impulsePercentage);
    }
}

function getImpulsePercentage(movementBarValue) {
    for (let i = 0; i < movementBarSections.length - 1; i++) {
        if(movementBarValue >= movementBarSections[i] && movementBarValue < movementBarSections[i+1]){
            console.log("Impulse grade: " + movementBarSectionPercentages[i]);
            return movementBarImpulsePercentages[movementBarSectionPercentages[i]];
        }
    }

    //Should never arrive this much
    console.log("Impulse grade: FAILED.");
    console.log("MovementBarValue: " + movementBarValue);
    return 0;
}

//</editor-fold>

function collideCallback() {
    //console.log("Collided");
}

//</editor-fold>