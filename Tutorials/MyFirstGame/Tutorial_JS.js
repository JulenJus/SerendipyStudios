//Configure the game
let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    title: 'Tutorial',      //Optional
    version: '1.0',         //Optional
    pixelArt: true,         //If you make zoom, it does not blur the pixels, instead they remain scaled.

    //Let the physics config
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},          //The units are pixels/second
            isPaused: false,            //Stops the physics or the game?
            debug: false                //Enables/Disables the debug mode
        }
    },

    //Let the game callbacks
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//Global variables
//General
let game = new Phaser.Game(config);
let gameOver;
let gameMode = 'difficult';

//Player
let player;
let control_cursors;
let control_wasd;

//World assets
let skySpr;
let platforms;
let stars;
let bombs;

//Score
let score = 0;
let scoreText;

//Game Loop functions
function preload() {
    //Load the resources
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');

    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

function create() {
    //Create controls
    control_cursors = this.input.keyboard.createCursorKeys();
    control_wasd = this.input.keyboard.addKeys({
        up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D
    });


    //Create assets
        //Create the sky
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0);      //The origin is in top left corner, so if you don't modify the sprite's center you'll only see the bottom right section.
    skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height); //Adjust to screen size

        //Create the ground group
    platforms = this.physics.add.staticGroup(); //The object will have collisions but won't be affected by gravity.
                                                // The groups are used to contain same objects with same behaviours.
        //Create the ground
    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();  //Let the ground.
    // The refreshBody is to commit the changes over the object.

        //Create other platforms
    platforms.create(600, 400, 'platform');
    platforms.create(50, 550, 'platform');
    platforms.create(1100, 220, 'platform');

        //Create player
            //Instance
    player = this.physics.add.sprite(100, 450, 'dude'); //Init location/object

            //Config physics
    player.setBounce(0.2);              //The rebound force when colliding with a physic object
    player.setCollideWorldBounds(true); //Set the player not to be able to trespass the limits of the screen.
                                        //They act as a physic object too, so that the pj rebounds against them.

    //player.body.setGravityY(-310);       //This function does not set a different gravity,
    // but it sums the given amount to the world's gravity.

            //Create animations
    this.anims.create({
        key: 'left',     //Animation alias
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1       //The animation loops infinitely
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 20
        //Does not have repeat because it launches once.
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1       //The animation loops infinitely
    });

            //Create colliders
    this.physics.add.collider(player, platforms, collideCallback);
    //Detects if the player and the platforms are touching against each other.
    // It is also able to invoke a callback function defined by the user to trigger a different behaviour -> Super useful!!

        //Create stars
            //Create instances
    stars = this.physics.add.group({
        key: 'star',     //Sprite id
        repeat: 11,     //Number of instances
        setXY: {x: 12, y: 0, stepX: 70}    //Initial pos, the space between them
    });

            //Set collisions
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(stars, platforms);

            //Set relation with pj
    this.physics.add.overlap(player, stars, collectStar, null, this);
    //overlap(object1, object2, collideCallback, processCallback, callbackContext);
    //The processCallback can be used to do additional checks that determine
    // whether the collideCallback is called or not.

        //Create bombs
            //Set group
    bombs = this.physics.add.group();

            //Config collisions
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(player, bombs, hitBomb, null, this);


    //Create score
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontFamily: 'Gelato',
        fontStyle: 'Italic',
        fontSize: '32px',
        fill: '#000000'
    });
    //location, default string, style
}

function update() {
    if(gameOver) return;

    //Player movement
        //Sides
    if (control_cursors.left.isDown || control_wasd.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (control_cursors.right.isDown || control_wasd.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

        //Jump
    if ((control_cursors.up.isDown || control_wasd.up.isDown) && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

//Methods
function collideCallback() {
    console.log("Collided");
}

function collectStar(player, star) {
    console.log("Overlapped");
    star.disableBody(true, true);   //Hide obj, disable obj

    score += 10;
    scoreText.setText('Score: ' + score);

    switch(gameMode){
        case 'easy':
            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true)
                    //enableBody(reset, x, y, enable, show)
                });

                let x = (player.x > config.width / 2) ?
                    Phaser.Math.Between(config.width / 2, config.width) :
                    Phaser.Math.Between(0, config.width / 2);

                let bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);    //In which axis?
            }
            break;


        case 'difficult':
            if (stars.countActive(true) === 0) {
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true)
                    //enableBody(reset, x, y, enable, show)
                });
            }

            let x = (player.x < config.width / 2) ?
                Phaser.Math.Between(config.width / 2, config.width) :
                Phaser.Math.Between(0, config.width / 2);
            let bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);    //In which axis?
            break;
    }
}

function hitBomb(player, bomb) {
    //You died
    console.log("You died");

    this.physics.pause();   //The game stops
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}

//<editor-fold desc="Region">
//</editor-fold>