class Scene_Level_01 extends Gen_Level {
    constructor() {
        super("Level_01");
        console.log("Level_01 constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_01 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add power ups
        this.powerUpBoxes.add(new PowerUp_Box(this, this.levelWidth/2, this.levelHeight - 500));
        this.powerUpBoxes.add(new PowerUp_Box(this, this.levelWidth/2, this.levelHeight - 1200));
        this.powerUpBoxes.add(new PowerUp_Box(this, this.levelWidth/2 - 200, this.levelHeight - 800));

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

        //Power Ups
        this.powerUpBoxes = this.physics.add.staticGroup();
        this.powerUpBoxes.add(new PowerUp_Box(this, player.x, player.y - 300));
        this.powerUpBoxes.add(new PowerUp_Box(this, player.x, player.y - 700));
        this.powerUpBoxes.add(new PowerUp_Box(this, player.x - 200, player.y - 500));

        //Physics and collisions (triggers)
        //this.physics.add.overlap(player, zoomBlocks, overlapCallback, null, this);
        //this.physics.add.overlap(player, this.backgroundLayer, null, null, this);       //[HERE] For what is used this overlap?
        this.physics.add.collider(player, this.wallsLayer, null, null, this);
        this.physics.add.overlap(player, this.backgroundLayer.finishLine, winCallback, null, this); //[HERE] it does not work!
        this.physics.add.collider(player, this.obstaclesLayer, takeDamageCallback, null, this);
        this.physics.add.overlap(player, this.powerUpBoxes, pickPowerUpCallback, null, this);

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, level_01_Width, level_01_Height);
        this.cameras.main.setBounds(0, 0, level_01_Width, level_01_Height); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV
        this.cameras.main.startFollow(player);
    }

    update() {
        //Render the power up if needed
        super.update();
    }
    //</editor-fold>

}