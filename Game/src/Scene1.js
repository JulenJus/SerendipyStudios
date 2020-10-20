class Scene1 extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    // init(){
    //     this.add.text(20, 20, "Loading resources...");
    // }

    preload() {

        this.add.text(20, 20, "Trial");
        // this.load.on('progress', function (value) {
        //     this.add.text(20, 20, value);
        // });
        //
        // this.load.on('fileprogress', function (file) {
        //     this.add.text(20, 60, file.src);
        // });
        //
        // this.load.on('complete', function () {
        //     this.add.text(20, 100, "Completed!");
        // });

        //Load the resources
        this.load.image('player', '../assets/Sprites/pinguino2.png');
        this.load.image('sky', '../assets/Sprites/Background_Sky_Long2.png');
        this.load.image('platform', '../assets/Sprites/Background_Platform.png');
        this.load.spritesheet('penguin', '../assets/Sprites/penguins.png', {frameWidth: 370, frameHeight: 368});

        // this.load.on('complete', function () {
        //     this.scene.start("main_level");
        // });
    }
    create(){
        //this.add.text(20, 20, "Loading resources...");
        this.scene.start("main_level");
    }

}


