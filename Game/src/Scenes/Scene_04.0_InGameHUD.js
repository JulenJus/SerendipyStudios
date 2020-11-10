//Global variables
let powerUpTime;

class Scene_040_InGameHUD extends Phaser.Scene {

    constructor() {
        super("InGameHUD");
        //console.log("Ingame hud constructor");
        //this.movementBarText = 0;
    }

    init(player) {
        this.player = player;
        //console.log("Ingame hud init");
    }

    create() {
        //Show the scene
        //this.scene.start("InGameHUD");    //[HERE] YOU ARE SUCH AN ASSHOLE JULEN!
        //console.log("Ingame hud create");

        //Create score
        // this.movementBarText = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, '', {
        //     fontFamily: 'Gelato',
        //     fontStyle: 'Italic',
        //     fontSize: '32px',
        //     fill: '#ffffff'
        // });
        powerUpTime = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, '', {
            fontFamily: 'Gelato',
            fontStyle: 'Italic',
            fontSize: '64px',
            fill: '#000000'
        });
        this.bar = this.add.sprite(game.config.width / 2, game.config.height - 70, 'bar');
        this.barMark = this.add.sprite(game.config.width / 2 - 238, game.config.height - 77.5, 'blueMark');
        this.ghostBarMark = this.add.sprite(-500, -500, 'blueMark');
        // this.barMark.body.setAllowGravity(false)
        // this.barMark.body.setDrag(40, 0);

        //Initialize bar
        this.player.movementBar.onMovementBarPressed.on('onMovementBarPressed', this.movementBarPressed, this);
        this.player.movementBar.setIsRunning(true);
    }

    update() {
        if (this.player.controllable) {
            this.player.movementBar.update();
            //this.movementBarText.text = 'JUMP BAR VALUE: ' + player.movementBar.movementBarValue;
        }

        //Update sprite positions
        this.barMark.x =
            this.bar.x                                                                          //Center the sprite
            - (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) / 2 +    //Put it at the beginning
            Phaser.Math.Clamp(                                                                  //Update the position depending on the barValue
                (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) * (this.player.movementBar.movementBarValue / 100),
                0,
                this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth
            );
        //movementBarValue += 0.5 * movementBarIncrement;
        //this.movementBarText.text = 'JUMP BAR VALUE: ' + movementBarValue;
        //this.barMark.body.velocity.x += 1.5 * movementBarIncrement;
        //this.movementBarText.text = 'JUMP BAR VALUE: ' + this.registry.get('movementBarVal');
    }

    movementBarPressed(movementBarValue, tier) {
        let sprite;

        switch (tier) {
            case 0:
                sprite = 'redMark';
                break;
            case 1:
                sprite = 'yellowMark';
                break;
            case 2:
                sprite = 'greenMark';
                break;
        }

        this.ghostBarMark.destroy();
        this.ghostBarMark = this.add.sprite(
            this.bar.x - (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) / 2 +
            (this.player.movementBar.barSpriteWidth - this.player.movementBar.markSpriteWidth) * (movementBarValue / 100),
            game.config.height - 77.5,
            sprite);

        this.barMark.destroy();
        this.barMark = this.add.sprite(game.config.width / 2 - 238, game.config.height - 77.5, 'blueMark');
    }
}