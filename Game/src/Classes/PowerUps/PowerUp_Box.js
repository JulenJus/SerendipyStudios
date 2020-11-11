class PowerUp_Box extends Phaser.GameObjects.Sprite {
    //Constructor
    constructor(scene, posX, posY) {
        super(scene, posX, posY, 'powerUpBox');
        this.scene = scene;
        //this.shieldTime = 5; //Time to control the power up's duration

        scene.add.existing(this);
        this.setScale(0.3, 0.3);
    }

    //Methods
    PickBox(player) {
        //Give the player a random power Up [HERE]
        //this.GetDashPowerUp();
        // if(!player.isShielded)
        //     this.GetShieldPowerUp();

        if (player.powerUpObject_Boxed === null) {
            switch (Phaser.Math.Between(0, 1)) {
                case 0:
                    new PowerUp_Shield(player, this.scene).Pick();
                    break;
                case 1:
                    new PowerUp_Dash(player).Pick();
                    break;
                default:
                    console.log("An error has occurred when assigning Gen_PowerUp.");
                    break;
            }
        }

        this.destroy();
    }

    Respawn(){
        //[HERE] Respawn the box
    }

    // GetDashPowerUp(){
    //     player.numDashes = 3;
    //     //bar.tint = bar.tint = 0x00FF00;
    //     powerUpTime.setText(player.numDashes);
    // }

    // GetShieldPowerUp(){
    //     //Set the object
    //     player.powerUpObject = this;
    //
    //     //Show it on screen
    //     powerUpTime.setText(this.shieldTime);
    //
    //     //Create the shield
    //     player.isShielded = true;
    //     player.powerUp_shield = this.thisScene.add.sprite(player.x, player.y, 'shield').setScale(0.1);
    //
    //     //Disable damages
    //     //obstacles.active = false;
    //
    //     //Reference for the change of scope
    //     let thisShieldTime = this.shieldTime;
    //
    //     this.thisScene.time.addEvent({
    //         delay: 1000,
    //         repeat: 5,
    //         loop: false,
    //         callback: function(){
    //
    //             if(thisShieldTime > 1){
    //                 powerUpTime.setText(--thisShieldTime);
    //             }else{
    //                 if(player.isShielded)
    //                     this.DestroyShieldPowerUp();
    //                 /*
    //                 //Destroy shield
    //                 powerUpTime.setText('');
    //                 player.isShielded = false;
    //                 player.powerUp_shield.destroy();
    //
    //                 //Reactive damage
    //                 obstacles.active = true;
    //                 */
    //             }
    //         }
    //     });
    // }
    //
    // DestroyShieldPowerUp(){
    //     powerUpTime.setText('');
    //     player.isShielded = false;
    //     player.powerUp_shield.destroy();
    // }
}