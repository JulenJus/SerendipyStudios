class Scene_02_2_Tutorial extends Gen_Level {
    constructor() {
        super("Level_Tutorial");
        //console.log("Tutorial constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        //console.log("Tutorial create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 1600 , y: 1088 }, {x: 1600 , y: 1728 }));

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, this.levelWidth/2, this.levelHeight - 500));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 448 , 2816 ));
    }

    update() {
        //Render the power up if needed
        super.update();
    }
    //</editor-fold>

    winCallback(){
        this.scene.get("MusicManager").sfx_play_goal();
        this.scene.stop("InGameHUD");
        this.scene.start("MainMenu");
        this.scene.get("MusicManager").music_stop_InGame();
    }

    Exit(){
        this.scene.stop("InGameHUD");
        this.scene.start("MainMenu");
        this.scene.get("MusicManager").music_stop_InGame();
    }
}