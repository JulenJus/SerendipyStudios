class Player extends Phaser.GameObjects.Sprite{
    //Constructor
    constructor(scene, controllable){
        super(scene, level_01_Width / 2, level_01_Height - 252, 'player');
        this.thisScene = scene;

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.body.setBounce(0.4, 0.2);
        this.body.setDrag(40, 0);
        this.body.setCollideWorldBounds(true);

        //Set controls
        this.controllable = controllable;
        if(this.controllable) {
            this.movementBar = new MovementBar(this.thisScene);
            this.controls = new Controls(this.thisScene, this);
        }

        //Set appearance variables
        this.penguinType = 0;
        this.penguinSprite = 0;

        //Set state variables
        this.isDamaged = false;
        this.isShielded = false;

        //Set power up variables
        this.powerUpType = "none";
        this.powerUpObject_Boxed = null;
        this.powerUpObject_Used = null;
        this.onPaintPowerUpIcon = new Phaser.Events.EventEmitter();

        //Set race variables
        this.racePosition = 1;

        //this.powerUp_shield = null;
        //this.powerUp_dash = 0;
    }

    // NormalizeBar(){
    //     bar.clearTint();
    //     powerUpTime.setText('');
    // }

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
    }

    TakeDamage(obstacles){
        if(this.isShielded) {
            this.powerUpObject_Used.Destroy();
            return;
        }

        //Get a little bit slowed
        this.body.velocity.y = (-400 * this.movementBar.movementBarImpulsePercentages[0]);

        //Change to "damaged" state
        this.tint = 0xff0000;
        this.isDamaged = true;
        obstacles.active = false;

        let thisPlayer = this; //Reference for the change of scope

        this.thisScene.time.addEvent({ //Blink immunity effect
            delay: 150,
            repeat: 5,
            loop: false,
            callback: function(){
                thisPlayer.visible = !thisPlayer.visible;
            }
        });
        //Return to normal state
        this.thisScene.time.addEvent({
            delay: 750,
            loop: false,
            callback: function(){
                //Return to normal state
                thisPlayer.clearTint();
                thisPlayer.isDamaged = false;
                obstacles.active = true;
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