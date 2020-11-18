class Player extends Phaser.Physics.Arcade.Sprite {
    //Constructor
    constructor(scene, id, controllable, initPos, skin) {
        super(scene, initPos.x, initPos.y, 'gen_player');

        console.log("Player constructor")

        //Set object variables
        this.scene = scene;
        this.serverId = id;
        this.skin = skin;

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.body.setBounce(0.4, 0.2);
        this.body.setDrag(40, 0);
        this.body.setCollideWorldBounds(true);

        //Set controls
        this.controllable = controllable;
        if (this.controllable) {
            this.movementBar = new MovementBar(this.scene);
            this.controls = new Controls_InGame(this.scene, this);
        }

        //Set appearance variables
        this.penguinType = 0;
        this.penguinSprite = 0;

        //Set state variables
        this.isDamaged = false;
        this.isgen_powerUp_shield_spriteed = false;

        //Set power up variables
        this.powerUpType = "none";
        this.powerUpObject_Boxed = null;
        this.powerUpObject_Used = null;
        this.onPaintPowerUpIcon = new Phaser.Events.EventEmitter();
        this.dashPowerUpAnimation =
            new Phaser.Physics.Arcade.Sprite(scene, initPos.x - 50, initPos.y - 1500, '')
                .setScale(1.5, 1.5);
        this.dashPowerUpAnimation.visible = false;
        scene.add.existing(this.dashPowerUpAnimation);

        //Set sprites sort
        this.depth = 2;
        this.dashPowerUpAnimation.depth = 1;

        //Set race variables
        this.racePosition = 1;

        //Player Animations //[HERE] Make it general
        this.on('animationcomplete', this.animComplete, this);

        this.scene.anims.create({
            key: 'gen_player_animation_Idle_' + this.skin,     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_player_animation_Idle_' + this.skin, {
                start: 0,
                end: 14
            }),
            frameRate: 96,
            repeat: 1       //The animation repeats 1 time
        });

        this.scene.anims.create({
            key: 'gen_player_animation_Dash_' + this.skin,     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_player_animation_Idle_' + this.skin, {
                start: 0,
                end: 14
            }),
            frameRate: 128,
            repeat: 4       //The animation repeats 4 times
        });

        this.scene.anims.create({
            key: 'gen_powerUp_dash_animation',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_powerUp_dash_animation', {start: 0, end: 14}),
            frameRate: 25,
            repeat: -1       //The animation loops infinitely
        });

        //Set hitbox size
        this.anims.play('gen_player_animation_Idle_' + this.skin);
        this.anims.stop();
        this.setSize(104, 119, true);
    }

    //<editor-fold desc="Methods">

    //Animation methods

    animComplete(animation, frame) {
        if (animation.key === 'gen_player_animation_Idle_' + this.skin) {
            //console.log("Player Idle animation finished");
        }
    }

    //Functional methods

    Move(direction) {
        if (!this.scene.isRaceStarted) return;
        if (this.isDamaged) return;

        this.scene.scene.get("MusicManager").sfx_play_flap();

        this.anims.play('gen_player_animation_Idle_' + this.skin);
        let impulsePercentage = this.movementBar.getImpulse();
        switch (direction) {
            case "up":
                this.body.velocity.y = (-400 * impulsePercentage);
                break;
            case "left":
                this.body.velocity.y = (-400 * impulsePercentage);
                this.body.velocity.x = (-200 * impulsePercentage);
                break;
            case "right":
                this.body.velocity.y = (-400 * impulsePercentage);
                this.body.velocity.x = (200 * impulsePercentage);
                break;
        }
    }

    Dash(impulsePercentage) {
        if (!this.scene.isRaceStarted) return;
        if (this.isDamaged) return;

        this.scene.scene.get("MusicManager").sfx_play_flap();

        this.body.velocity.y = (-400 * impulsePercentage);

        this.anims.play('gen_player_animation_Dash_' + this.skin);

        this.dashPowerUpAnimation.visible = true;
        this.dashPowerUpAnimation.anims.play('gen_powerUp_dash_animation');
        let thisDash = this.dashPowerUpAnimation; //Variable for the change of scope

        this.scene.time.addEvent({
            delay: 1000,
            loop: false,
            callback: function () {
                thisDash.visible = false;
                thisDash.anims.pause();
            }
        });
    }

    DashPowerUpFollow() {
        this.dashPowerUpAnimation.x = this.x;
        this.dashPowerUpAnimation.y = this.y + 60;
    }

    TakeDamage(obstaclesCollider, sawCollider) {
        if (this.isgen_powerUp_shield_spriteed) {
            this.powerUpObject_Used.Destroy();
            return;
        }

        //Get a little bit slowed
        this.body.velocity.y = (-400 * this.movementBar.movementBarImpulsePercentages[0]);

        //Change to "damaged" state
        this.tint = 0xff0000;
        this.isDamaged = true;
        obstaclesCollider.active = false;
        sawCollider.active = false;

        let thisPlayer = this; //Reference for the change of scope

        this.scene.time.addEvent({ //Blink immunity effect
            delay: 150,
            repeat: 5,
            loop: false,
            callback: function () {
                thisPlayer.visible = !thisPlayer.visible;
            }
        });
        //Return to normal state
        this.scene.time.addEvent({
            delay: 750,
            loop: false,
            callback: function () {
                //Return to normal state
                thisPlayer.clearTint();
                thisPlayer.isDamaged = false;
                obstaclesCollider.active = true;
                sawCollider.active = true;
            }
        });
    };

    UsePowerUp() {
        if (!this.scene.isRaceStarted) return;

        console.log("Power up");

        //Use the power up if you have one
        if (this.powerUpObject_Boxed !== null) {
            this.powerUpObject_Boxed.Use();
        }
    }

    Squawk() {
        console.log("squawk");

        //Reproduce squawk audio depending on your skin
        this.scene.scene.get("MusicManager").sfx_play_squawk();
    }

    //</editor-fold>
}