
let movementBarValue = 0;
let movementBarIncrement = 1;

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
        this.add.sprite(game.config.width / 2, game.config.height - 70, 'bar');
        this.add.sprite(game.config.width / 2, game.config.height - 80, 'blueMark');
    }

    update(){
        movementBarValue += 0.5 * movementBarIncrement;
        this.movementBarText.text = 'JUMP BAR VALUE: ' + movementBarValue;
        //this.movementBarText.text = 'JUMP BAR VALUE: ' + this.registry.get('movementBarVal');
    }
}