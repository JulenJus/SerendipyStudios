class PowerUp extends Phaser.GameObjects.Sprite{
    //Constructor
    constructor(scene, posX, posY){
        super(scene, posX, posY, 'powerUpBox');
        this.thisScene = scene;
        this.shieldTime = 5; //Time to control the power up's duration

        scene.add.existing(this);
        this.setScale(0.3, 0.3);
    }

    //Methods
    DestroyBox(obstacles){
        this.destroy();
        //this.GetDashPowerUp();
        if(!player.isShielded)
            this.GetShieldPowerUp(obstacles);
    }

    GetDashPowerUp(){
        player.canDash = true;
        player.numDashes = 3;
        //bar.tint = 0x00FF00;
        powerUpTime.setText(player.numDashes);
    }

    GetShieldPowerUp(obstacles){
        //Shield the player
        player.isShielded = true;
        player.playerShield = this.thisScene.add.sprite(player.x, player.y, 'shield').setScale(0.1);
        obstacles.active = false;
        powerUpTime.setText(this.shieldTime);

        //Reference for the change of scope
        let thisShieldTime = this.shieldTime;

        this.thisScene.time.addEvent({
            delay: 1000,
            repeat: 5,
            loop: false,
            callback: function(){
                if(thisShieldTime > 1){
                    powerUpTime.setText(--thisShieldTime);
                }else{
                    powerUpTime.setText('');
                    player.isShielded = false;
                    player.playerShield.destroy();
                    obstacles.active = true;
                }

            }
        });
    }
}