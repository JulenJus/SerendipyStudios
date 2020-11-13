class Saw extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, initPos, endPos) {
        super(scene, initPos.x, initPos.y, '');

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.body.setAllowGravity(false);


        this.minPoint = initPos;
        this.range = {
            x: endPos.x - initPos.x,
            y: endPos.y - initPos.y
        };

        //Progress variables
        this.movementValue = 0;
        this.movementIncrement = 1;
        this.movementVelocity = 50;

        //Create animation
        this.scene.anims.create({
            key: 'gen_saw_animation_Idle',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('gen_saw_animation', {start: 0, end: 2}),
            frameRate: 10,
            repeat: -1       //The animation loops infinitely
        });
        this.anims.play("gen_saw_animation_Idle");
        this.setSize('128','128', true);  //[HERE] Adjust the size in function of the sprite size

        //Show path
        this.pathSprite = this.scene.add.sprite(
            this.minPoint.x + this.range.x/2,
            this.minPoint.y + this.range.y/2,
            'UI_raceBar')
            .setScale(1/4, this.range.y/800)
            .setOrigin(0.5, 0.5);
        this.pathSprite.rotation = Math.asin(
            this.range.x
            /
            Math.sqrt(Math.pow(this.range.x, 2) + Math.pow(this.range.y, 2))
        );
        this.pathSprite.tint = 0x550000;

        //Layers
        this.depth = 1;
        this.pathSprite.depth = 0;
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
        this.x = this.minPoint.x + this.range.x * (this.movementValue/100);
        this.y = this.minPoint.y + this.range.y * (this.movementValue/100);

        //console.log("Saw mv: " + this.movementValue);
        //console.log("Saw pos: " + this.body.position.y);
    }
}