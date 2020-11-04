//<editor-fold desc="Global variables">

//General
let gameOver = false;
let matterEngine;
let rectangle;

//Player
let player;
let controls;

//Scene
let levelWide = 500;
let scaledW;
let scaledH;
let zoomedIn;
let zoomedOut;
let levelWidth = 2432;
let levelHeight = 5120;

//assets
let skySpr;
let platforms;
let zoomInBlocks;
let zoomOutBlocks;
let i = 0;
//</editor-fold>

class Scene_Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }

//<editor-fold desc="Game Loop functions">
    create() {
        //Create controls
        let player = new Player(this);

        //Create grid
        //this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 20, height: skySpr.height * scaledH , width: skySpr.width * scaledW});
        //this.aGrid.showNumbers();

        //Create tilemap
        let map = this.make.tilemap({key: 'tilemap'});
        let tiles = map.addTilesetImage('tilesheet', 'tilesheet', 64, 64, 1, 2);

        //Create layers from tilemap layers
        map.createStaticLayer('background', tiles, 0, 0);
        map.createStaticLayer('decoration', tiles, 0, 0);
        const wallsLayer = map.createStaticLayer('walls', tiles, 0, 0);
        const obstaclesLayer = map.createStaticLayer('obstacles', tiles, 0, 0);

        //Enable colissions with layers
        wallsLayer.setCollisionByProperty({ collide: true });
        obstaclesLayer.setCollisionByProperty({ collide_obstacle: true });

        //<editor-fold desc="Tilemap visual debugging">
        // const debugWalls = this.add.graphics().setAlpha(0.7);
        // wallsLayer.renderDebug(debugWalls, {
        //    tileColor: null,
        //    collidingTileColor: new Phaser.Display.Color(243, 234, 48),
        //    faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        //
        // const debugObstacles = this.add.graphics().setAlpha(0.7);
        // obstaclesLayer.renderDebug(debugObstacles, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        //</editor-fold>

        //Create player
        //player = this.physics.add.sprite(levelWidth / 2, levelHeight - 32, 'player');
        //player.setBounce(0.4, 0.2);
        //player.setDrag(40, 0);

        //Create zoom blocks
        //zoomOutBlocks = this.physics.add.staticGroup();
        //zoomOutBlocks.create(skySpr.width / 2 * scaledW, game.config.height * 12, 'platform').setScale(game.config.width * 2 / 400, 1).refreshBody();

        //Penguin animation
        // this.anims.create({
        //     key: 'idle',     //Animation alias
        //     frames: this.anims.generateFrameNumbers('penguin', {start: 0, end: 25}),
        //     frameRate: 10,
        //     repeat: -1       //The animation loops infinitely
        // });
        // player.anims.play('idle', true);

        //Physics and collisions (triggers)
        //player.setCollideWorldBounds(true)
        // this.physics.add.collider(player, platforms, collideCallback);
        // this.physics.add.overlap(player, zoomOutBlocks, overlapCallback, null, this);
        // this.physics.add.collider(player, wallsLayer, null, null, this);
        // this.physics.add.collider(player, obstaclesLayer, null, null, this);

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, levelWidth, levelHeight);
        this.cameras.main.setBounds(0, 0, levelWidth, levelHeight); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV
        this.cameras.main.startFollow(player);

        //Create score
        /*
        movementBarText = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, 'Bar Value: 0', {
            fontFamily: 'Gelato',
            fontStyle: 'Italic',
            fontSize: '32px',
            fill: '#000000'
        });
        */
    }

    update() {
    }
//</editor-fold>
}
//<editor-fold desc="Methods">

//<editor-fold desc="Player movement methods">


//</editor-fold>

function collideCallback() {
    //console.log("Collided");
}
function overlapCallback() {
    if(player.body.velocity.y < 0) {
        this.physics.world.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1 / 3, 2000, "Linear", true);
    }else if (player.body.velocity.y > 0){
        this.physics.world.setBounds(game.config.width * 2, 0, game.config.width * 2, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1, 2000, "Linear", true);
    }
}
//</editor-fold>