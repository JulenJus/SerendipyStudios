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

        //Set texts
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
        this.load.image('player', '../assets/Sprites/Empollon.png');
        this.load.image('bar', '../assets/Sprites/barra.png');
        this.load.image('blueMark', '../assets/Sprites/hieloazul.png');
        this.load.image('greenMark', '../assets/Sprites/hieloverde.png');
        this.load.image('yellowMark', '../assets/Sprites/hieloamarillo.png');
        this.load.image('redMark', '../assets/Sprites/hielorojo.png');
        this.load.image('tilesheet', '../assets/Tilemaps/tilesheet.png');
        this.load.image('powerUpBox', '../assets/Sprites/cajapowerup.png');
        this.load.tilemapTiledJSON('tilemap', '../assets/Tilemaps/tutorial.json');
        this.load.json('shapes', '../assets/Tilemaps/tutorial_colliders.json');
        this.load.spritesheet('penguin', '../assets/Sprites/penguins.png', {frameWidth: 370, frameHeight: 368});

    }
    create(){
        this.scene.start("Level_01");
        this.scene.start("InGameHUD");
    }

}


