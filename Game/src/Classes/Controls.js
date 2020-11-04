class Controls extends Phaser.Input.InputPlugin{
    //Constructor
    constructor(scene, player){
        super(scene);
        this.player = player;
        this.scene = scene;
        this.keyboardInput =  scene.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'left': Phaser.Input.Keyboard.KeyCodes.Q,
            'right': Phaser.Input.Keyboard.KeyCodes.E
        });

        this.setControlsPc();
        // if (scene.sys.game.device.os.android){
        //     console.log("OS: Android");
        //     this.setControlsMobile();
        // }else if(scene.sys.game.device.os.chromeOS){
        //     console.log("OS: Chrome");
        //     this.setControlsPc();
        // }else if(scene.sys.game.device.os.webApp){
        //     console.log("OS: WebApp");
        //     this.setControlsPc();
        // }else if(scene.sys.game.device.os.desktop){
        //     console.log("OS: Desktop");
        //     this.setControlsPc();
        // }
    };

    setControlsPc(){
        this.controlType = "Pc";
        let p = this.player;
        let k = this.keyboardInput;
        let impulsePercentage;
        this.scene.input.keyboard.on('keydown_W', function(){
            if(k.up.isDown) {
                impulsePercentage = p.movementBar.getImpulse();
                p.body.velocity.y = (-400 * impulsePercentage); //It's like an instant acceleration
            }
        });
        this.scene.input.keyboard.on('keydown_Q', function(){
            if(k.left.isDown) {
                impulsePercentage = p.movementBar.getImpulse();
                p.body.velocity.y = (-400 * impulsePercentage); //It's like an instant acceleration
                p.body.velocity.x = (-200 * impulsePercentage);
            }
        });
        this.scene.input.keyboard.on('keydown_E', function(){
            if(k.right.isDown) {
                impulsePercentage = p.movementBar.getImpulse();
                p.body.velocity.y = (-400 * impulsePercentage); //It's like an instant acceleration
                p.body.velocity.x = (200 * impulsePercentage);
            }
        });
    };

    setControlsMobile(){
        this.controlType = "Mobile";

        //Implement mobile controls [HERE]
        //this.inputs;
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