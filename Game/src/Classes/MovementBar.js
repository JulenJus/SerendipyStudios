class MovementBar extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, level_01_Width / 2, level_01_Height - 32, 'bar');

        this.isRunning = true;

        //this.movementBarValue = 0;
        //this.movementBarIncrement = 1;

        this.movementBarSections = [0.0, 10.0, 30.0, 40.0, 50.0, 60.0, 70.0, 90.0, 100.0];
        this.movementBarTiers = [1, 0, 1, 2, 2, 1, 0, 1];
        this.movementBarImpulsePercentages = [0.2, 0.35, 1];
    }

    updateMovementValue() {
        if (!this.isRunning) return;

        //Movement bar
        if (movementBarValue >= 100) {
            movementBarIncrement = -1;  //False -> Decrement
        }
        if (movementBarValue <= 0) {
            movementBarIncrement = 1;   //True -> Increment
        }
        //this.movementBarValue += 0.5 * this.movementBarIncrement;
        //this.scene.registry.set('movementBarVal', this.movementBarValue); //Store the movement bar value in the Game Data. We have to update the movementBarVal so that the HUD scene can get it updated
    }

    //Methods
    getImpulse() {
        let impulse = this.getImpulsePercentage()
        movementBarValue = 0;

        return impulse;
    }

    getImpulsePercentage() {
        for (let i = 0; i < this.movementBarSections.length - 1; i++) {
            if (movementBarValue >= this.movementBarSections[i] && movementBarValue < this.movementBarSections[i + 1]) { //Check the section
                console.log("Impulse grade: " + this.movementBarTiers[i]);
                return this.movementBarImpulsePercentages[this.movementBarTiers[i]]; //Get the tier (color) of the section, and then its percentage
            }
        }

        //Should never arrive this much
        //console.log("Impulse grade: FAILED.");
        //console.log("MovementBarValue: " + this.movementBarValue);
        return 0;
    }

    getText() {
        return "Bar value: " + movementBarValue.toString();
    }

    setIsRunning(running){
        this.isRunning = running;
    }
}