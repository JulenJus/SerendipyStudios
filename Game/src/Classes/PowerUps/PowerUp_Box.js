class PowerUp_Box extends Phaser.Physics.Arcade.Sprite {
    //Constructor
    constructor(scene, posX, posY) {
        super(scene, posX, posY, 'gen_powerUpBox_sprite');
        this.scene = scene;
        //this.gen_powerUp_shield_spriteTime = 5; //Time to control the power up's duration

        scene.add.existing(this);
        this.setScale(0.3, 0.3);

        //Power ups animations
        this.scene.anims.create({ //Shaking animation
            key: 'gen_powerUpBox_spriteAnimation_Idle',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_powerUpBox_spriteAnimation_Idle', {start: 0, end: 17}),
            frameRate: 20,
            repeat: -1       //The animation loops infinitely
        });
        this.anims.play('gen_powerUpBox_spriteAnimation_Idle');
    }

    //Methods
    PickBox(player) {
        //Give the player a random power Up [HERE]
        //this.GetDashPowerUp();
        // if(!player.isgen_powerUp_shield_spriteed)
        //     this.Getgen_powerUp_shield_spritePowerUp();

        this.scene.scene.get("MusicManager").sfx_play_box();

        if (player.powerUpObject_Boxed === null) {
            switch (Phaser.Math.Between(0, 1)) {
                case 0:
                    new PowerUp_gen_powerUp_shield_sprite(player, this.scene).Pick();
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

    // Getgen_powerUp_shield_spritePowerUp(){
    //     //Set the object
    //     player.powerUpObject = this;
    //
    //     //Show it on screen
    //     powerUpTime.setText(this.gen_powerUp_shield_spriteTime);
    //
    //     //Create the gen_powerUp_shield_sprite
    //     player.isgen_powerUp_shield_spriteed = true;
    //     player.powerUp_gen_powerUp_shield_sprite = this.thisScene.add.sprite(player.x, player.y, 'gen_powerUp_shield_sprite').setScale(0.1);
    //
    //     //Disable damages
    //     //obstacles.active = false;
    //
    //     //Reference for the change of scope
    //     let thisgen_powerUp_shield_spriteTime = this.gen_powerUp_shield_spriteTime;
    //
    //     this.thisScene.time.addEvent({
    //         delay: 1000,
    //         repeat: 5,
    //         loop: false,
    //         callback: function(){
    //
    //             if(thisgen_powerUp_shield_spriteTime > 1){
    //                 powerUpTime.setText(--thisgen_powerUp_shield_spriteTime);
    //             }else{
    //                 if(player.isgen_powerUp_shield_spriteed)
    //                     this.Destroygen_powerUp_shield_spritePowerUp();
    //                 /*
    //                 //Destroy gen_powerUp_shield_sprite
    //                 powerUpTime.setText('');
    //                 player.isgen_powerUp_shield_spriteed = false;
    //                 player.powerUp_gen_powerUp_shield_sprite.destroy();
    //
    //                 //Reactive damage
    //                 obstacles.active = true;
    //                 */
    //             }
    //         }
    //     });
    // }
    //
    // Destroygen_powerUp_shield_spritePowerUp(){
    //     powerUpTime.setText('');
    //     player.isgen_powerUp_shield_spriteed = false;
    //     player.powerUp_gen_powerUp_shield_sprite.destroy();
    // }
}