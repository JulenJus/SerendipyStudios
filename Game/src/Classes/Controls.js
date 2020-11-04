class Controls extends Phaser.Input.InputPlugin{
    //Constructor
    constructor(scene, player){
        super(scene);

        this.player = player;
        this.scene = scene;
        this.keyboardInputs = new Phaser.Input.Keyboard.KeyboardPlugin(this);

        if (scene.sys.game.device.os.android){
            console.log("OS: Android");
            this.setControlsMobile();
        }else if(scene.sys.game.device.os.chromeOS){
            console.log("OS: Chrome");
            this.setControlsPc();
        }else if(scene.sys.game.device.os.webApp){
            console.log("OS: WebApp");
            this.setControlsPc();
        }else if(scene.sys.game.device.os.desktop){
            console.log("OS: Desktop");
            this.setControlsPc();
        }
    };

    setControlsPc(){
        this.controlType = "Pc";
        this.keyboardInputs.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.Q,
            right: Phaser.Input.Keyboard.KeyCodes.E
        });

        this.scene.input.keyboard.on('keydown_W', this.Jump);
        this.scene.input.keyboard.on('keydown_Q', this.Jump);
        this.scene.input.keyboard.on('keydown_E', this.Jump);
    };

    setControlsMobile(){
        this.controlType = "Mobile";

        //Implement mobile controls [HERE]
        //this.inputs;
    }

    Jump(){
        let impulsePercentage = this.player.movementBar.getImpulse();

        //[HERE]
        this.player.body.velocity.y = (-400 * impulsePercentage); //It's like an instant acceleration

        if (this.keyboardInputs.left.isDown)
            this.player.body.velocity.x = (-200 * impulsePercentage);

        else if (this.keyboardInputs.right.isDown)
            this.player.body.velocity.x = (200 * impulsePercentage);
    }
}