
//Global Variables
//<editor-fold desc="Global variables">

//General
let gameOver = false;

//Player
let player;
let controls;

//Movement bar
let movementBarText;
let movementBarValue = 0.0;
let movementBarIncrement = 1;

let movementBarSections = [0.0, 10.0, 30.0, 40.0, 50.0, 60.0, 70.0, 90.0, 100.0];
let movementBarTiers = [1, 0, 1, 2, 2, 1, 0, 1];
let movementBarImpulsePercentages = [0.2, 0.35, 1];

//Scene
let levelWide = 500;
let scaledW;
let scaledH;
let zoomedIn;
let zoomedOut;

//assets
let skySpr;
let platforms;
let i = 0;
//</editor-fold>


class Scene_Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }

//<editor-fold desc="Game Loop functions">

//Game Loop functions
    create() {
        //Create controls
        controls = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.E
        });
        this.input.keyboard.on('keydown_W', jump);
        this.input.keyboard.on('keydown_Q', jump);
        this.input.keyboard.on('keydown_E', jump);

        //Create background
        skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0);

        //We have to rescale the background scale to adapt its size to the device's
        scaledW = game.config.width / (skySpr.width / 3);
        scaledH = game.config.height / (skySpr.height / 10);
        skySpr.setScale(scaledW, scaledH);

        //Create grid
        this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 20, height: skySpr.height * scaledH , width: skySpr.width * scaledW});
        this.aGrid.showNumbers();

        //Create level
        platforms = this.physics.add.staticGroup();
        platforms.create(skySpr.width / 2 * scaledW, skySpr.height * scaledH - 16, 'platform').setScale(game.config.width / 400, 1).refreshBody();

        //Create player
        player = this.physics.add.sprite(skySpr.width / 2 * scaledW, skySpr.height * scaledH - 32 - 333 / 2, 'player');
        //player.setScale(0.3, 0.3).refreshBody();//.setScale(96 / 370, 96 / 368).refreshBody();
        player.setBounce(0.4, 0.2);
        player.setDrag(40, 0);
        player.setCollideWorldBounds(true);

        //Penguin animation
        // this.anims.create({
        //     key: 'idle',     //Animation alias
        //     frames: this.anims.generateFrameNumbers('penguin', {start: 0, end: 25}),
        //     frameRate: 10,
        //     repeat: -1       //The animation loops infinitely
        // });
        // player.anims.play('idle', true);

        //Physics
        this.physics.add.collider(player, platforms, collideCallback);

        //Camera follow and bounds
        this.physics.world.setBounds(game.config.width, 0, game.config.width, skySpr.height * scaledH); //The world bounds define where the world colliders are (its like a box for the player/s)
        this.cameras.main.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV
        this.cameras.main.startFollow(player);

        //Create score
        movementBarText = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, 'Bar Value: 0', {
            fontFamily: 'Gelato',
            fontStyle: 'Italic',
            fontSize: '32px',
            fill: '#000000'
        });
    }

    update() {
        if (gameOver) return;

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

        //Camera variation
        if (player.y < game.config.height * 6 && !zoomedOut) {
            zoomedOut = true;
            this.physics.world.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
            this.cameras.main.zoomTo(1 / 3, 2000);
        }
        if (player.y < game.config.height * 3 && !zoomedIn) {
            zoomedIn = true;
            this.physics.world.setBounds(game.config.width, 0, game.config.width, skySpr.height * scaledH);
            this.cameras.main.zoomTo(1, 2000);
        }
    }
//</editor-fold>
}
//<editor-fold desc="Methods">

//<editor-fold desc="Player movement methods">

function jump() {

    let impulsePercentage = getImpulsePercentage(movementBarValue);
    movementBarValue = 0;
    movementBarText.setText("Bar value: " + movementBarValue);

    player.setVelocityY(-400 * impulsePercentage); //It's like an instant acceleration

    if (controls.left.isDown)
        player.setVelocityX(-200 * impulsePercentage);

    else if (controls.right.isDown)
        player.setVelocityX(200 * impulsePercentage);
}

function getImpulsePercentage(movementBarValue) {
    for (let i = 0; i < movementBarSections.length - 1; i++) {
        if(movementBarValue >= movementBarSections[i] && movementBarValue < movementBarSections[i+1]){ //Check the section
            console.log("Impulse grade: " + movementBarTiers[i]);
            return movementBarImpulsePercentages[movementBarTiers[i]]; //Get the tier (color) of the section, and then its percentage
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