class CheerPenguin extends Phaser.Physics.Arcade.Sprite{
    //Constructor
    constructor(scene, type, initPos) {
        super(scene, initPos.x, initPos.y, 'gen_player'); //Base sprite is not important. Animation will be rendered over it

        console.log("CheerPenguin constructor")

        //Set object variables
        this.scene = scene;
        this.cheerType = type;

        scene.add.existing(this);
        //Animations
        this.scene.anims.create({
            key: 'cheerPenguin_animation_Glove_Left',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('cheerPenguin_animation_Glove_Left', {start: 0, end: 14}),
            frameRate: 32,
            repeat: -1       //The animation loops indefinitely
        });
        this.scene.anims.create({
            key: 'cheerPenguin_animation_Glove_Right',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('cheerPenguin_animation_Glove_Right', {start: 0, end: 14}),
            frameRate: 32,
            repeat: -1       //The animation loops indefinitely
        });
        this.scene.anims.create({
            key: 'cheerPenguin_animation_Pompoms',     //Animation alias
            frames: this.scene.anims.generateFrameNumbers('cheerPenguin_animation_Pompoms', {start: 0, end: 17}),
            frameRate: 32,
            repeat: -1       //The animation loops indefinitely
        });
        this.ChooseAnimation();
    }

    ChooseAnimation(){
        switch(this.cheerType){
            case('Glove_Left'):
                this.anims.play('cheerPenguin_animation_Glove_Left');
                break;
            case('Glove_Right'):
                this.anims.play('cheerPenguin_animation_Glove_Right');
                break;
            case('Pompoms'):
                this.anims.play('cheerPenguin_animation_Pompoms')
                break;
            default:
                throw new Error("Animation Key not valid!");
                break;
        }
    }
}