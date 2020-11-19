class PowerUp_Dash extends Gen_PowerUp/*extends Phaser.GameObjects.Sprite*/{
    //Constructor
    constructor(player){
        super(player);

        //Setup power up variables
        this.numDashes = 3;
        this.onDasdPicked = new Phaser.Events.EventEmitter();
        this.dashImpulsePercentage = 1.0;
    }

    //This method is used to show the powerUp on the box
    Pick(){
        //Assign it to the player
        this.player.powerUpObject_Boxed = this;

        //Display it in the box
        //console.log("Power up: Dash.");
        this.player.onPaintPowerUpIcon.emit('onPaintPowerUpIcon', "dash", null, {numDashes: this.numDashes}); //Show the icon in the powerU  up box
    }

    //This method is used to describe what the powerUp functionality
    Use(){
        if(this.player.isDamaged) return;

        this.player.scene.scene.get("MusicManager").sfx_play_powerUp_dash();

        //Use one charge of the powerUp
        this.player.Dash(this.dashImpulsePercentage);
        this.numDashes--;

        //Update the icon
        this.player.onPaintPowerUpIcon.emit('onPaintPowerUpIcon', "dash", null, {numDashes: this.numDashes});

        //If all the uses have been used, destroy the object
        if(this.numDashes === 0)
            this.Destroy();
    }

    //This method is used to show constantly an action on screen while the power up is used
    Render(){

    }

    //This method is used to cleanly destroy the power up.
    Destroy(){
        this.player.powerUpObject_Boxed = null;
        delete this;
    }
}