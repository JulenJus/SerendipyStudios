class Scene_04_2_Level_02 extends Gen_Level {
    constructor() {
        super("Level_02");
        this.levelName = "Simetría sinuosa";
        console.log("Level_02 constructor");
    }

    //<editor-fold desc="Game Loop functions">
    create() {
        console.log("Level_02 create");
        super.create();
        super.createPlayer(this, 0, true);

        //Add saws
        this.gen_saw_sprites.add(new Saw(this, {x: 6016 , y: 11136 }, {x: 6016 , y: 11584 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 6656 , y: 10944 }, {x: 6656 , y: 11392 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 5696 , y: 9856 }, {x: 5696 , y: 10368 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3584 , y: 9536 }, {x: 3584 , y: 10240 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4800 , y: 7168 }, {x: 4800 , y: 8128 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4800 , y: 6336 }, {x: 4800 , y: 7424 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2496 , y: 7488 }, {x: 2496 , y: 7936 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2496 , y: 7488 }, {x: 2496 , y: 8000 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 2944 , y: 6848 }, {x: 2944 , y: 7424 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4416 , y: 5056 }, {x: 4416 , y: 6080 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4736 , y: 5056 }, {x: 4736 , y: 6080 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 3072 , y: 4352 }, {x: 3072 , y: 4928 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 6272 , y: 4352 }, {x: 6272 , y: 4928 }));
        this.gen_saw_sprites.add(new Saw(this, {x: 4544 , y: 1984 }, {x: 4544 , y: 2368 }));

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
        // Phaser.Actions.Call(this.gen_powerUpBox_sprites.getChildren(), child => {
        //     child.anims.play('gen_powerUpBox_spriteAnimation_Idle');
        // });
    }

    update() {
        //Render the power up if needed
        super.update();
    }
}