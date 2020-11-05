class Scene_LeftPanel extends Phaser.Scene {
    constructor() {
        super("LeftPanel");
    }

    preload(){
        //this.load.image('platform', '../assets/Sprites/Background_Platform.png');
    }

    create(){
        //Create score
        this.physics.add.sprite(0, 0, 'platform');
    }

    update(){

    }
}