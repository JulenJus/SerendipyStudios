class Player extends Phaser.GameObjects.Sprite{
    //Constructor
    constructor(scene, controllable){
        super(scene, level_01_Width / 2, level_01_Height - 252, 'player');

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.body.setBounce(0.4, 0.2);
        this.body.setDrag(40, 0);
        this.body.setCollideWorldBounds(true);

        //Set controls
        this.controllable = controllable;
        if(this.controllable) {
            this.movementBar = new MovementBar(scene);
            this.controls = new Controls(scene, this);
        }

        //Set appearance variables
        this.penguinType = 0;
        this.penguinSprite = 0;
        this.playerTint = this.tint;

        //Set state variables
        this.isDamaged = false;
    }

    //Methods
    TakeDamage(obstacles){
        //Get a little bit slowed
        this.body.velocity.y = (-400 * this.movementBar.movementBarImpulsePercentages[0]);

        //Change to "damaged" state
        this.tint = 0xff0000;
        this.isDamaged = true;
        obstacles.active = false;

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
                thisPlayer.tint = this.playerTint ;
                thisPlayer.isDamaged = false;
                obstacles.active = true;
            }
        });
    };
}