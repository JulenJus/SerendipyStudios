class PowerUp_Box extends Phaser.Physics.Arcade.Sprite {
    //Constructor
    constructor(scene, posX, posY) {
        super(scene, posX, posY, 'gen_powerUpBox_sprite');
        this.scene = scene;

        scene.add.existing(this);

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
}