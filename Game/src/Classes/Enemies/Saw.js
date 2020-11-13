class Saw extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, initPos, endPos) {
        super(scene, initPos.x, initPos.y, '');

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        this.minPoint = initPos;
        this.range = {x:endPos.x - initPos.x, y:endPos.y - initPos.y};

        //Progress variables
        this.movementValue = 0;
        this.movementIncrement = 1;
        this.movementVelocity = 20;

        //Create animation
        this.scene.anims.create({
            key: 'gen_saw_animation_Idle',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_saw_animation', {start: 0, end: 2}),
            frameRate: 20,
            repeat: -1       //The animation loops infinitely
        });
        this.anims.play("gen_saw_animation_Idle");
        this.setSize('128','128', true);  //[HERE] Adjust the size in function of the sprite size
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

        console.log("Saw mv: " + this.movementValue);
        console.log("Saw pos: " + this.body.position);
    }
}