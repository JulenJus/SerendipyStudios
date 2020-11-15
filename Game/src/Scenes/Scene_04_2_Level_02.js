class Scene_04_2_Level_02 extends Gen_Level {
    constructor() {
        super("Level_02");
        console.log("Level_02 constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_02 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 5888 , y: 11008 }, {x: 5888 , y: 11456 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 6528 , y: 10816 }, {x: 6528 , y: 11264 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 5568 , y: 9728 }, {x: 5568 , y: 10240 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3456 , y: 9408 }, {x: 3456 , y: 10112 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4672 , y: 7040 }, {x: 4672 , y: 8000 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4672 , y: 6208 }, {x: 4672 , y: 7296 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2368 , y: 7360 }, {x: 2368 , y: 7808 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2368 , y: 7360 }, {x: 2368 , y: 7872 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2816 , y: 6720 }, {x: 2816 , y: 7296 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4288 , y: 4928 }, {x: 4288 , y: 5952 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4608 , y: 4928 }, {x: 4608 , y: 5952 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2944 , y: 4224 }, {x: 2944 , y: 4800 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 6144 , y: 4224 }, {x: 6144 , y: 4800 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4416 , y: 1856 }, {x: 4416 , y: 2240 }));

        //Add power ups
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3584 , 12864 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 5504 , 12864 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 1664 , 9344 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 3584 , 9344 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 7168 , 9344 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 8960 , 9344 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 576 , 5632 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 4544 , 3712 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 8576 , 5632 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 4544 , 3712 ));
        this.gen_powerUpBox_sprites.add(new PowerUp_Box(this, 4544 , 1664 ));

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