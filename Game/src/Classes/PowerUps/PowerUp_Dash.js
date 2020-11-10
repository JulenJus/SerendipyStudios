class PowerUp_Dash extends Gen_PowerUp/*extends Phaser.GameObjects.Sprite*/{
    //Constructor
    constructor(player/*, scene, posX, posY*/){
        //super(scene, posX, posY, 'powerUpBox');
        //this.thisScene = scene;

        //scene.add.existing(this);

        //General variables
        // this.player = player;
        // this.icon = null;
        // this.sprite = null;
        super(player);

        //Setup power up variables
        this.numDashes = 3;
        this.dashImpulsePercentage = 1.0;
    }

    //This method is used to show the powerUp on the box
    Pick(){
        //Assign it to the player
        this.player.powerUpObject_Boxed = this;

        //Display it in the box
        console.log("Power up: Dash.");
        this.ShowIcon();
    }

    ShowIcon(){
        //[HERE] put the sprite on the box
        switch(this.numDashes) {
            case 0:
                //this.icon.destroy();
                break;
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
        }

    }

    //This method is used to describe what the powerUp functionality
    Use(){
        //Set the object
        //this.player.powerUpObject_Used = this;

        //Display it on screen
        powerUpTime.setText(this.numDashes);

        //Use one charge of the powerUp
        this.player.Dash(this.dashImpulsePercentage);
        this.numDashes--;

        //Update the icon
        this.ShowIcon();

        //If all the uses have been used, destroy the object
        if(this.numDashes === 0)
            this.Destroy();
    }

    //This method is used to show constantly an action on screen while the power up is used
    Render(){

    }

    //This method is used to cleanly destroy the power up.
    Destroy(){
        powerUpTime.setText('');
        this.player.powerUpObject_Boxed = null;
        //this.player.powerUpObject_Used = null;
        delete this;
    }
}