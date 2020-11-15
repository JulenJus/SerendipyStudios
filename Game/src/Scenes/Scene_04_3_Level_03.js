class Scene_04_3_Level_03 extends Gen_Level {
    constructor() {
        super("Level_03");
        console.log("Level_03 constructor");
    }

//<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_03 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 1216 , y: 20608 }, {x: 1216 , y: 21056 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1856 , y: 20032 }, {x: 1856 , y: 20608 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1280 , y: 16768 }, {x: 1280 , y: 17664 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1920 , y: 9536 }, {x: 1920 , y: 17280 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1408 , y: 13504 }, {x: 1408 , y: 13696 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2368 , y: 11840 }, {x: 2368 , y: 12224 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2496 , y: 7488 }, {x: 2496 , y: 7936 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 640 , y: 11584 }, {x: 640 , y: 11968 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1600 , y: 9344 }, {x: 1600 , y: 9920 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1024 , y: 6976 }, {x: 1024 , y: 8128 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2176 , y: 6976 }, {x: 2176 , y: 8192 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1280 , y: 5888 }, {x: 1280 , y: 6400 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1600 , y: 5120 }, {x: 1600 , y: 5248 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1600 , y: 2560 }, {x: 1600 , y: 4224 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 1600 , y: 512 }, {x: 1600 , y: 512 }));

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1536 , 19776 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1152 , 16128 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1152 , 12992 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1536 , 9856 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1536 , 6272 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1536 , 2048 ));

        //Play power up boxes animation
        Phaser.Actions.Call(this.gen_powerUpBox_sprites.getChildren(), child => {
            child.anims.play('gen_powerUpBox_spriteAnimation_Idle');
        });
    }

    update() {
        //Render the power up if needed
        super.update();
    }
}