class PowerUp_Shield extends Gen_PowerUp/*extends Phaser.GameObjects.Sprite*/ {
    //Constructor
    constructor(player, scene/*, posX, posY*/) {
        //super(scene, posX, posY, 'powerUpBox');
        super(player);
        this.scene = scene;

        scene.add.existing(this);
        //this.setScale(0.3, 0.3);

        //General variables
        // this.player = player;
        // this.icon = null;
        // this.sprite = null;

        //Setup power up variables
        this.shieldTime = 5; //Time to control the power up's duration
        this.isActive = false; //Variable used to control whether the timer should or not destroy the sprite.
    }

    Pick() {
        //Assign it to the player
        this.player.powerUpObject_Boxed = this;

        //Display it in the box
        console.log("Power up: Shield.");
        //[HERE] put the sprite on the box

    }

    Use() {
        this.isActive = true;

        //If you already have a shield, then destroy it and create a new one
        if (this.player.isShielded) {
            this.player.powerUpObject_Used.Destroy();
        }

        //Remove it from the box
        this.player.powerUpObject_Boxed = null;
        delete this.icon;
        //player.powerUpObject_Boxed.destroy();
        //this.icon.destroy();

        //Assign it to the player
        this.player.powerUpObject_Used = this;

        //Display it on screen
        powerUpTime.setText(this.shieldTime);

        //Create the shield
        this.player.isShielded = true;
        this.sprite = this.scene.add.sprite(this.player.x, this.player.y, 'shield').setScale(0.1);

        //Set the timer
        let thisObj = this;
        let thisShieldTime = this.shieldTime;

        this.scene.time.addEvent({
            delay: 1000,
            repeat: 5,
            loop: false,
            callback: function () {
                if (thisShieldTime > 1) {
                    powerUpTime.setText(--thisShieldTime);
                } else {
                    if (thisObj.isActive)
                        thisObj.Destroy();
                }
            }
        });

    }

    Render() {
        this.sprite.x = this.player.x
        this.sprite.y = this.player.y;
    }

    Destroy() {
        this.isActive = false;

        powerUpTime.setText('');
        this.player.isShielded = false;
        this.sprite.destroy();

        this.player.powerUpObject_Used = null;
        delete this;
    }
}