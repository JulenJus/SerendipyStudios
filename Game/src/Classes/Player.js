class Player extends Phaser.Physics.Arcade.Sprite{
    //Constructor
    constructor(scene, id, controllable, initPos){
        super(scene, initPos.x, initPos.y, 'gen_player');

        console.log("Player constructor")

        //Set object variables
        this.scene = scene;
        this.serverId = id;

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.body.setBounce(0.4, 0.2);
        this.body.setDrag(40, 0);
        this.body.setCollideWorldBounds(true);

        //Set controls
        this.controllable = controllable;
        if(this.controllable) {
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
        this.dashPowerUpAnimation = new Phaser.Physics.Arcade.Sprite(scene, initPos.x, initPos.y + 20, '');
        this.dashPowerUpAnimation.visible = false;
        scene.add.existing(this.dashPowerUpAnimation);

        //Set sprites sort
        this.depth = 2;
        this.dashPowerUpAnimation.depth = 1;

        //Set race variables
        this.racePosition = 1;

        //Player Animations //[HERE] Make it general
        this.scene.anims.create({
            key: 'Idle',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_player_animation_Idle_Armin', {start: 0, end: 14}),
            frameRate: 32,
            repeat: -1       //The animation loops infinitely
        });
        this.anims.play('Idle');

        this.scene.anims.create({
            key: 'Dash',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_powerUp_dash_animation', {start: 0, end: 14}),
            frameRate: 25,
            repeat: -1       //The animation loops infinitely
        });

        //Set hitbox size
        this.setSize(104, 119, true);
    }

    //<editor-fold desc="Methods">

    Move(direction){
        if (!this.isDamaged) {
            let impulsePercentage = this.movementBar.getImpulse();
            switch(direction){
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
    }

    Dash(impulsePercentage){
        this.body.velocity.y = (-400 * impulsePercentage);
        this.dashPowerUpAnimation.visible = true;
        this.dashPowerUpAnimation.anims.play('Dash');
        let thisDash = this.dashPowerUpAnimation; //Variable for the change of scope
        this.scene.time.addEvent({
            delay: 500,
            loop: false,
            callback: function(){
                thisDash.visible = false;
                thisDash.anims.pause();
            }
        });
    }

    DashPowerUpFollow(){
        this.dashPowerUpAnimation.x = this.x;
        this.dashPowerUpAnimation.y = this.y + 60;
    }

    TakeDamage(obstaclesCollider, sawCollider){
        if(this.isgen_powerUp_shield_spriteed) {
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
            callback: function(){
                thisPlayer.visible = !thisPlayer.visible;
            }
        });
        //Return to normal state
        this.scene.time.addEvent({
            delay: 750,
            loop: false,
            callback: function(){
                //Return to normal state
                thisPlayer.clearTint();
                thisPlayer.isDamaged = false;
                obstaclesCollider.active = true;
                sawCollider.active = true;
            }
        });
    };

    UsePowerUp(){
        console.log("Power up");

        //Use the power up if you have one
        if(this.powerUpObject_Boxed !== null){
            this.powerUpObject_Boxed.Use();
        }
    }

    Squawk(){
        console.log("squawk");

        //Reproduce squawk audio depending on your skin [HERE]
    }

    //</editor-fold>
}