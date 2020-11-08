class WinLine extends Phaser.GameObjects.Sprite{
    constructor(scene, player){
        super(scene, level_01_Width / 2, 200, 'winLine');

        //Set physics
        scene.add.existing(this);
        scene.physics.world.enableBody(this);   //[HERE] Be cautious about this method & it's args.
        this.setScale(level_01_Width / 768, 30 / 10);
        this.refreshBody;

        this.body.setAllowGravity(false);

        //Set collider
        scene.physics.add.overlap(player, this, this.winCallback(), null, this);
    }

    winCallback(){
        console.log("You win");
        console.log("POS X: " + this.body.position.x);
        console.log("POS Y: " + this.body.position.y);
    }
}