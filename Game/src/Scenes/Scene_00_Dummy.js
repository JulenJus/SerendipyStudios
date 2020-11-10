class Scene_00_Dummy extends Phaser.Scene {
    constructor() {
        super("dummy");
    }

    preload() {
        this.load.image('player', '../assets/Sprites/pinguino2.png');
    }

    create(){
        this.add.image(258,358, 'player');
        this.input.keyboard.on('keydown_N', next);
    }
}

function next(){
    this.scene.start("Preload");
}