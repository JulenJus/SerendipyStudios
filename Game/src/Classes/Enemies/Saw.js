class Saw extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, initPos, endPos) {
        super(scene, initPos.x, initPos.y, '');
        this.setSize('50','50', true);  //[HERE] Adjust the size in function of the sprite size

        this.scene = scene;

        this.minPoint = initPos;
        this.range = {x:endPos.x - initPos.x, y:endPos.y - initPos.y};

        //Progress variables
        this.movementValue = 0;
        this.movementIncrement = 1;
        this.movementVelocity = 50;
    }

    update() {
        //Movement
        if (this.movementValue >= 100) {  //The offset is added to prevent the mark to surpass the bar without making it wait
            this.movementValue = 100;
            this.movementIncrement = -1;  //False -> Decrement
        }
        if (this.movementValue <= 0) {
            this.movementValue = 0;
            this.movementIncrement = 1;   //True -> Increment
        }
        this.movementValue += (this.movementVelocity * this.movementIncrement) * GetDeltaTime();// * game.time.physicsElapsed;

        //Set position
        this.body.position.x = this.minPoint.x + range.x * this.movementValue;
        this.body.position.y = this.minPoint.y + range.y * this.movementValue;
    }
}