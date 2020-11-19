class Controls_InGame {
    constructor(scene, player) {
        this.player = player;
        this.scene = scene;
        this.onExitLevel = new Phaser.Events.EventEmitter();

        this.keyboardInput = scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'left': Phaser.Input.Keyboard.KeyCodes.Q,
            'right': Phaser.Input.Keyboard.KeyCodes.E,
            'object': Phaser.Input.Keyboard.KeyCodes.SPACE,
            'squawk': Phaser.Input.Keyboard.KeyCodes.S,
            'scape': Phaser.Input.Keyboard.KeyCodes.ESC
        });

        if (scene.sys.game.device.os.android) {
            //console.log("OS: Android");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.iPad) {
            //console.log("OS: iPad");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.chromeOS) {
            //console.log("OS: Chrome");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.webApp) {
            //console.log("OS: WebApp");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.desktop) {
            //console.log("OS: Desktop");
            this.setControlsPc();
        } else if (scene.sys.game.device.os.macOS) {
            //console.log("OS: macOS");
            this.setControlsPc();
        }
    }

    setControlsPc() {
        this.controlType = "Pc";
        let player = this.player;
        let keyboardInput = this.keyboardInput;
        let exitLevelEvent = this.onExitLevel;

        //Movement
        this.scene.input.keyboard.on('keydown_W', function () {
            if (keyboardInput.up.isDown && !player.isDamaged) {
                player.Move("up");
            }
        });
        this.scene.input.keyboard.on('keydown_Q', function () {
            if (keyboardInput.left.isDown && !player.isDamaged) {
                player.Move("left");
            }
        });

        this.scene.input.keyboard.on('keydown_E', function () {
            if (keyboardInput.right.isDown && !player.isDamaged) {
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
            exitLevelEvent.emit('onExitLevel');
        });

        this.scene.input.on('pointerdown', function (pointer) {
            if (pointer.y < 125 && pointer.x > 650) {
                exitLevelEvent.emit('onExitLevel');
                //this.scene.Exit();
            }
        });
    }

    setControlsMobile() {
        this.controlType = "Mobile";
        let player = this.player;
        let exitLevelEvent = this.onExitLevel;
        this.scene.input.on('pointerdown', function (pointer) {
            //console.log("Pointerdown. x: " + pointer.x + "; y: " + pointer.y);

            //Movement
            if (pointer.y >= 550 && !player.isDamaged) {
                if (pointer.x <= game.config.width / 3) { //Left third of the screen
                    player.Move("left");
                } else if (pointer.x >= (game.config.width / 3) * 2) { //Right third of the screen
                    player.Move("right");
                } else { //Middle third of the screen
                    player.Move("up");
                }
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
                exitLevelEvent.emit('onExitLevel');
                //this.scene.Exit();
            }
        });
    }
}