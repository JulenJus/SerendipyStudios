class Scene_04_1_Level_01 extends Gen_Level {
    constructor() {
        super("Level_01");
        console.log("Level_01 constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_01 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 2304 , y: 15168 }, {x: 2304 , y: 15616 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2688 , y: 16000 }, {x: 2688 , y: 16320 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3456 , y: 13696 }, {x: 3456 , y: 14080 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3456 , y: 17536 }, {x: 3456 , y: 11520 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3072 , y: 17536 }, {x: 3072 , y: 11520 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3136 , y: 5888 }, {x: 3136 , y: 6208 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3264 , y: 3712 }, {x: 3264 , y: 4096 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3072 , y: 1664 }, {x: 3072 , y: 2176 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3456 , y: 1024 }, {x: 3456 , y: 1664 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3072 , y: 704 }, {x: 3072 , y: 1024 }));

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 2496 , 15424 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 13760 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 2944 , 8128 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 4928 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 2688 ));

        //Play power up boxes animation
        Phaser.Actions.Call(this.gen_powerUpBox_sprites.getChildren(), child => {
            child.anims.play('gen_powerUpBox_spriteAnimation_Idle');
        });

        // //<editor-fold desc="Tilemap visual debugging">
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
        // //</editor-fold>

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
    }

    update() {
        //Render the power up if needed
        super.update();
    }
    //</editor-fold>
}