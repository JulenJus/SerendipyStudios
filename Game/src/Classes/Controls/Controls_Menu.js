class Controls_Menu {
    constructor(scene) {
        this.scene = scene;

        if (scene.sys.game.device.os.android) {
            console.log("OS: Android");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.iPad) {
            console.log("OS: iPad");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.chromeOS) {
            console.log("OS: Chrome");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.webApp) {
            console.log("OS: WebApp");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.desktop) {
            console.log("OS: Desktop");
            this.setControlsMobile();
        } else if (scene.sys.game.device.os.macOS) {
            console.log("OS: macOS");
            this.setControlsMobile();
        }
    }

    setControlsMobile() {
        this.scene.input.on('pointerdown', function (pointer) {
            console.log("Pointerdown. x: " + pointer.x + "; y: " + pointer.y);

            //Movement
            if (pointer.y >= 550 && !p.isDamaged) {
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
                console.log("Escape");
            }
        });
    }
}