class Scene_Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    
    preload() {
        //Set the progress vars
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(game.config.width/2 - 320/2, game.config.height/2 - 50/2, 320, 50);

        //Set text
        let loadingText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        let assetText = this.make.text({
            x: game.config.width / 2,
            y: game.config.height / 2 + 50,
            text: '',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //Event listeners
        this.load.on('progress', function (value) {
            console.log(value);

            //Set percent text
            percentText.setText(parseInt(value * 100) + '%');

            //Set progress bar
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(game.config.width/2 - 300/2, game.config.height/2 - 30/2, 300 * value, 30);
        });

        this.load.on('fileprogress', function (file) {
            //Display the progress animation
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', function () {
            //Destroy the bar and display the logo/animation
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
        });

        //Load the resources
        this.load.image('player', '../assets/Sprites/empollon.png');
        this.load.image('sky', '../assets/Sprites/Level_Prototype.png');
        this.load.image('platform', '../assets/Sprites/Background_Platform.png');

        this.load.image('tilesheet', '../assets/Tilemaps/baseTileset.png');
        this.load.tilemapTiledJSON('tilemap', '../assets/Tilemaps/tutorial.json');

        this.load.spritesheet('penguin', '../assets/Sprites/penguins.png', {frameWidth: 370, frameHeight: 368});

        // for(let i=0;i<1000;i++){
        //     this.load.image('logo'+i, '../assets/Sprites/zenvalogo' + i + '.png');
        // }
    }
    create(){
        //this.add.text(20, 20, "Loading resources...");
        this.scene.start("Level_01");
        this.scene.start("InGameHUD");
    }

}


