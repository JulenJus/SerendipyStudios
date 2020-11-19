class Scene_04_1_Level_01 extends Gen_Level {
    constructor() {
        super("Level_01");
        this.levelName = "Diagonales dolorosas";
        console.log("Level_01 constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_01 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 2432 , y: 15296 }, {x: 2432 , y: 15744 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2816 , y: 16128 }, {x: 2816 , y: 16448 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3648 , y: 13824 }, {x: 3648 , y: 14208 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3648 , y: 11200 }, {x: 3648 , y: 11648 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3008 , y: 11200 }, {x: 3008 , y: 11648 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3264 , y: 6016 }, {x: 3264 , y: 6336 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3392 , y: 3840 }, {x: 3392 , y: 4224 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3200 , y: 1792 }, {x: 3200 , y: 2304 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3584 , y: 1152 }, {x: 3584 , y: 1792 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3136 , y: 832 }, {x: 3136 , y: 1152 }));

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 2496 , 15424 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 13760 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 2944 , 8128 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 4928 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3328 , 2688 ));

        //Add cheer penguins
        this.gen_cheerPenguins.add(new CheerPenguin(this, 'Pompoms',{x: this.levelWidth / 2 + 255 , y: this.levelHeight - 1025}));

        //Play power up boxes animation
        // Phaser.Actions.Call(this.gen_powerUpBox_sprites.getChildren(), child => {
        //     child.anims.play('gen_powerUpBox_spriteAnimation_Idle');
        // });

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