class Scene_02_2_Tutorial extends Gen_Level {
    constructor() {
        super("Tutorial");
        console.log("Tutorial constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Tutorial create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, this.levelWidth/2, this.levelHeight - 500));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, this.levelWidth/2, this.levelHeight - 1200));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, this.levelWidth/2 - 200, this.levelHeight - 800));

        //Play power up boxes animation
        Phaser.Actions.Call(this.gen_powerUpBox_sprites.getChildren(), child => {
            child.anims.play('gen_powerUpBox_spriteAnimation_Idle');
        });

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
    }

    update() {
        //Render the power up if needed
        super.update();
    }
    //</editor-fold>

    winCallback(){
        this.scene.stop("InGameHUD");
        this.scene.start("MainMenu");
    }

    Exit(){
        this.winCallback();
        //this.scene.stop("InGameHUD")
        //this.scene.start("MainMenu");
    }

}