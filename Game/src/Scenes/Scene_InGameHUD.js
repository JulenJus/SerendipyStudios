class Scene_InGameHUD extends Phaser.Scene {
    constructor() {
        super("InGameHUD");
        this.movementBatText = 0;
    }

    create(){
        //Create score
        this.movementBarText = this.add.text(this.cameras.main.scrollX + 50, this.cameras.main.scrollY + 50, '', {
            fontFamily: 'Gelato',
            fontStyle: 'Italic',
            fontSize: '32px',
            fill: '#ffffff'
        });
    }

    update(){
        this.movementBarText.text = 'JUMP BAR VALUE: ' + this.registry.get('movementBarVal');
    }
}