//<editor-fold desc="Global variables">

//General
let gameOver = false;

//Player
let player;

//Scene
let level_01_Width = 0;
let level_01_Height = 0;

//</editor-fold>

class Scene_Level_01 extends Phaser.Scene {
    constructor() {
        super("Level_01");
    }

//<editor-fold desc="Game Loop functions">
    create() {
        //<editor-fold desc="Create the map">

        //Create grid
        //this.aGrid = new AlignGrid({scene: this, rows: 20, cols: 20, height: skySpr.height * scaledH , width: skySpr.width * scaledW});
        //this.aGrid.showNumbers();

        //Create tilemap
        this.map = this.make.tilemap({key: 'tilemap'});
        this.tiles = this.map.addTilesetImage('tilesheet', 'tilesheet', 64, 64, 1, 2);

        //Set level height and width according to the json's
        level_01_Height = this.map.height * this.map.tileHeight;
        level_01_Width = this.map.width * this.map.tileWidth;

        //Create layers from tilemap layers
        this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.map.createStaticLayer('decoration', this.tiles, 0, 0);
        this.wallsLayer = this.map.createStaticLayer('walls', this.tiles, 0, 0);
        this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);

        //Enable colissions with layers
        this.wallsLayer.setCollisionByProperty({collide: true});
        this.obstaclesLayer.setCollisionByProperty({collide_obstacle: true});

        //</editor-fold>

        //Create player
        player = new Player(this, true);
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

        //Create zoom blocks
        //this.zoomBlocks = this.physics.add.staticGroup();
        //this.zoomBlocks.create(skySpr.width / 2 * scaledW, game.config.height * 12, 'platform').setScale(game.config.width * 2 / 400, 1).refreshBody();

        //Penguin animation
        // this.anims.create({
        //     key: 'idle',     //Animation alias
        //     frames: this.anims.generateFrameNumbers('penguin', {start: 0, end: 25}),
        //     frameRate: 10,
        //     repeat: -1       //The animation loops infinitely
        // });
        // player.anims.play('idle', true);

        //Physics and collisions (triggers)
        //this.physics.add.overlap(player, zoomBlocks, overlapCallback, null, this);
        this.physics.add.collider(player, this.wallsLayer, null, null, this);
        this.physics.add.collider(player, this.obstaclesLayer, null, null, this);

        //Create finish line
        this.winLine = new WinLine(this, player);

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, level_01_Width, level_01_Height);
        this.cameras.main.setBounds(0, 0, level_01_Width, level_01_Height); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV
        this.cameras.main.startFollow(player);
    }

    update() {
    }

//</editor-fold>
}

//<editor-fold desc="Methods">

//<editor-fold desc="Callbacks">


//</editor-fold>

function overlapCallback() {
    if (player.body.velocity.y < 0) {
        this.physics.world.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1 / 3, 2000, "Linear", true);
    } else if (player.body.velocity.y > 0) {
        this.physics.world.setBounds(game.config.width * 2, 0, game.config.width * 2, skySpr.height * scaledH);
        this.cameras.main.zoomTo(1, 2000, "Linear", true);
    }
}

//</editor-fold>