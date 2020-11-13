class MovementBar extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, scene.levelWidth / 2, scene.levelHeight - 32, 'UI_bar');

        //Control variables
        this.isRunning = false;

        //Sprite variables
        this.barSpriteWidth = 526;
        this.barSpriteHeight = 61;
        this.markSpriteWidth = 56;
        this.markSpriteHeight = 56;

        //Util variables
        this.movementBarValue = 0;
        this.movementBarIncrement = 1;
        this.movementBarVelocity = 50;

        //Pressed event
        this.onMovementBarPressed = new Phaser.Events.EventEmitter();

        //Info variables
        this.movementBarSections = [0.0, 10.0, 30.0, 40.0, 50.0, 60.0, 70.0, 90.0, 100.0];
        this.movementBarTiers = [1, 0, 1, 2, 2, 1, 0, 1];
        this.movementBarImpulsePercentages = [0.2, 0.63, 1];
    }

    update() {
        if (!this.isRunning) return;

        //Movement bar
        if (this.movementBarValue >= 100) {  //The offset is added to prevent the mark to surpass the bar without making it wait
            this.movementBarValue = 100;
            this.movementBarIncrement = -1;  //False -> Decrement
        }
        if (this.movementBarValue <= 0) {
            this.movementBarValue = 0;
            this.movementBarIncrement = 1;   //True -> Increment
        }
        this.movementBarValue += (this.movementBarVelocity * this.movementBarIncrement) * GetDeltaTime();// * game.time.physicsElapsed;
    }

    //Methods
    getImpulse() {
        if (!this.isRunning) return 0;

        let tier = this.getImpulseTier();
        let impulse = this.getImpulsePercentage(tier);

        //Call the event in order to display the action onScreen
        this.onMovementBarPressed.emit('onMovementBarPressed', this.movementBarValue, tier);
        this.movementBarValue = 0;

        return impulse;
    }

    getImpulseTier(){
        for (let i = 0; i < this.movementBarSections.length - 1; i++) {
            if (this.movementBarValue >= this.movementBarSections[i] && this.movementBarValue < this.movementBarSections[i + 1]) { //Check the section
                //console.log("MovementBar value: " + this.movementBarValue);
                //console.log("Impulse grade: " + this.movementBarTiers[i]);
                return this.movementBarTiers[i]; //Get the tier (color) of the section
            }
        }

        return 0;
    }

    getImpulsePercentage(tier) {
        return this.movementBarImpulsePercentages[tier]; //Get the percentage of the section, given it's tier
    }

    getText() {
        return "Bar value: " + this.movementBarValue.toString();
    }

    setIsRunning(running){
        this.isRunning = running;
    }
}