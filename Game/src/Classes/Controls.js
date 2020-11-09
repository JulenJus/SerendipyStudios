class Controls /*extends Phaser.Input.InputPlugin */{
    //Constructor
    constructor(scene, player) {
        //super(scene);
        this.player = player;
        this.scene = scene;
        //this.impulsePercentage = 0;
        this.keyboardInput = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'left': Phaser.Input.Keyboard.KeyCodes.Q,
            'right': Phaser.Input.Keyboard.KeyCodes.E,
            'object': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'squawk': Phaser.Input.Keyboard.KeyCodes.S,
            'scape': Phaser.Input.Keyboard.KeyCodes.ESC
        });

        if (scene.sys.game.device.os.android) {
            console.log("OS: Android");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.iPad) {
            console.log("OS: iPad");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.chromeOS) {
            console.log("OS: Chrome");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.webApp) {
            console.log("OS: WebApp");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.desktop) {
            console.log("OS: Desktop");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.macOS) {
            console.log("OS: macOS");
            this.setControlsPc();
        }
    }

    setControlsPc() {
        this.controlType = "Pc";
        let player = this.player;
        let keyboardInput = this.keyboardInput;

        //Movement
        this.scene.input.keyboard.on('keydown_W', function () {
            if (keyboardInput.up.isDown && !player.isDamaged) {
                //this.impulsePercentage = player.movementBar.getImpulse();
                player.Move("up");
            }
        });
        this.scene.input.keyboard.on('keydown_Q', function () {
            if (keyboardInput.left.isDown && !player.isDamaged) {
                //this.impulsePercentage = player.movementBar.getImpulse();
                player.Move("left");
            }
        });

        this.scene.input.keyboard.on('keydown_E', function () {
            if (keyboardInput.right.isDown && !player.isDamaged) {
                //this.impulsePercentage = player.movementBar.getImpulse();
                player.Move("right");
            }
        });

        //Use power up
        this.scene.input.keyboard.on('keydown_SPACE', function () {
            player.UsePowerUp();
        });

        //Squawk
        this.scene.input.keyboard.on('keydown_S', function () {
            player.Squawk();
        });

        //Escape
        this.scene.input.keyboard.on("keydown_ESC", function () {
            console.log("Escape");
        });

        this.scene.input.on('pointerdown', function (pointer) {
            if (pointer.y < 125 && pointer.x > 650) {
                console.log("Escape");
            }
        });
    }

    setControlsMobile() {
        this.controlType = "Mobile";
        let p = this.player;
        this.scene.input.on('pointerdown', function (pointer) {
            console.log("Pointerdown. x: " + pointer.x + "; y: " + pointer.y);

            let xVelocity;

            //Movement
            if (pointer.y >= 550 && !p.isDamaged) {
                if (pointer.x <= game.config.width / 3) { //Left third of the screen
                    player.Move("left");
                } else if (pointer.x >= (game.config.width / 3) * 2) { //Right third of the screen
                    player.Move("right");
                } else { //Middle third of the screen
                    player.Move("up");
                }
                // this.impulsePercentage = p.movementBar.getImpulse();
                // p.body.velocity.y = (-400 * this.impulsePercentage);
                // p.body.velocity.x = (xVelocity * this.impulsePercentage);
            }

            //Use object
            if (pointer.y < 125 && pointer.x < 125) {
                player.UsePowerUp();
            }

            //Squawk
            if (pointer.y < 200 &&
                pointer.x > 200 && pointer.x < 600) {
                player.Squawk();
            }

            //Escape
            if (pointer.y < 125 && pointer.x > 650) {
                console.log("Escape");
            }
        });
    }

    // Jump(){
    //     let impulsePercentage = this.player.movementBar.getImpulse();
    //
    //     //[HERE]
    //     this.player.body.velocity.y = (-400 * impulsePercentage); //It's like an instant acceleration
    //
    //     if (this.keyboardInputs.left.isDown)
    //         this.player.body.velocity.x = (-200 * impulsePercentage);
    //
    //     else if (this.keyboardInputs.right.isDown)
    //         this.player.body.velocity.x = (200 * impulsePercentage);
    //  }
}