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

        //Player assets
        this.load.image('player', '../assets/Sprites/Characters/Armin/ArminScaled.png');

        //GUI assets
        this.load.image('bar', '../assets/Sprites/UI/barra.png'); //Jumping bar assets
        this.load.image('blueMark', '../assets/Sprites/UI/hieloazul.png');
        this.load.image('greenMark', '../assets/Sprites/UI/hieloverde.png');
        this.load.image('yellowMark', '../assets/Sprites/UI/hieloamarillo.png');
        this.load.image('redMark', '../assets/Sprites//UI/hielorojo.png');

        this.load.image('raceBar', '../assets/Sprites/UI/RaceBar.png'); //Race bar assets
        this.load.image('playerMark', '../assets/Sprites/UI/PlayerMark.png');

        this.load.image('powerUpEmpty', '../assets/Sprites/UI/inGame_boostBase.png');
        this.load.image('shieldPowerUp', '../assets/Sprites/UI/inGame_boostShield.png');
        this.load.image('dashPowerUp1', '../assets/Sprites/UI/inGame_boostVel1.png');//Buttons assets
        this.load.image('dashPowerUp2', '../assets/Sprites/UI/inGame_boostVel2.png');
        this.load.image('dashPowerUp3', '../assets/Sprites/UI/inGame_boostVel3.png');
        this.load.image('exitButtonUI', '../assets/Sprites/UI/inGame_buttonExit.png');

        //Power up assets
        this.load.image('powerUpBox', '../assets/Sprites/Basic PowerUps/PowerUpBox.png');
        this.load.image('shield', '../assets/Sprites/Basic PowerUps/Shield.png');

        //Map assets
        this.load.image('tilesheet', '../assets/Tilemaps/tilesheet.png');
        this.load.tilemapTiledJSON('tilemap', '../assets/Tilemaps/tutorial.json');

        //Animations assets
        //this.load.spritesheet('penguin', '../assets/Sprites/penguins.png', {frameWidth: 370, frameHeight: 368});

        //Aux assets
        //this.load.image('winLine','../assets/Sprites/limit.png');

    }
    create(){
        this.scene.start("Level_01");
        this.scene.start("InGameHUD");
    }

}


