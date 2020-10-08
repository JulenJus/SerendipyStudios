let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    title: 'Tutorial',
    version: '1.0',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            isPaused: false,
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

//Global variables
let game = new Phaser.Game(config);
let platforms;
let skySpr;
let player;
let cursors_arrows;
let cursors_wasd;
let stars;
let bombs;
let score = 0;
let scoreText;
let gameOver;
let gameMode = 'difficult';

function preload() {
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {frameWidth: 32, frameHeight: 48});
    this.load.image('platform', 'assets/platform.png');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
}

function create() {
    //Create sky
    skySpr = this.add.image(0, 0, 'sky').setOrigin(0, 0); //if we dont change the origin of the image to (0, 0) we would write: let sprite = this.add.image(config.width / 2, config.height / 2, 'sky');
    skySpr.setScale(config.width / skySpr.width, config.height / skySpr.height); //the sky will have the size of the screen

    //Create platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(config.width / 2, config.height - 16, 'platform').setScale(config.width / 400, 1).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 550, 'platform');
    platforms.create(1100, 220, 'platform');

    //Create player
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounceY(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(0); //we can change a concrete body's gravity

    //Create stars
    stars = this.physics.add.group({
        key: 'star',
        repeat: 5,
        setXY: {x: 12, y: 0, stepX: 70}
    });
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Create bombs
    bombs = this.physics.add.group();

    //Create all player animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: '8',
        repeat: '-1'
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: '8',
        repeat: '-1'
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 4}),
        frameRate: '12'
    });

    //Create controls
    cursors_arrows = this.input.keyboard.createCursorKeys();
    cursors_wasd = this.input.keyboard.addKeys({
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    //Create texts
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontFamily: 'Gelato',
        fontStyle: 'Italic',
        fontSize: '32px',
        fill: '#5bff00'
    });

    //Collisions
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, bombs, bombHit, null, this);
}

function update() {
    if (gameOver) {
        return;
    }
    if (cursors_arrows.left.isDown || cursors_wasd.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors_arrows.right.isDown || cursors_wasd.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if ((cursors_arrows.up.isDown || cursors_wasd.up.isDown) && player.body.touching.down) {
        player.setVelocityY(-330);

    }
}

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);


    switch (gameMode) {
        case 'easy':
            if (stars.countActive(true) === 0) { //If there are no active stars (all have been collected)
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true); //reset all stars
                });
                let x = (player.x < config.width / 2) ? Phaser.Math.Between(config.width / 2, config.width) : Phaser.Math.Between(0, config.width / 2);
                let bomb = bombs.create(x, 0, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        case 'difficult':
            if (stars.countActive(true) === 0) { //If there are no active stars (all have been collected)
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true); //reset all stars
                });
            }
            let x = (player.x < config.width / 2) ? Phaser.Math.Between(config.width / 2, config.width) : Phaser.Math.Between(0, config.width / 2);
            let bomb = bombs.create(x, 0, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

function bombHit(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');
    gameOver = true;
}