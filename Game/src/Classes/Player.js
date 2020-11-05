class Player extends Phaser.GameObjects.Sprite{
    //Constructor
    constructor(scene){
        super(scene, level_01_Width / 2, level_01_Height - 252, 'player');

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.body.setBounce(0.4, 0.2);
        this.body.setDrag(40, 0);
        this.body.setCollideWorldBounds(true);

        //Set controls
        this.movementBar = new MovementBar(scene);
        this.controls = new Controls(scene, this);

        //Set appearance variables
        this.penguinType = 0;
        this.penguinSprite = 0;
    }

    //Customization variables -> Appearance
    setPenguinType(index){
        this.penguinType = index;
    };

    setPenguinSprite(index){
        this.penguinSprite = index;
    };
}