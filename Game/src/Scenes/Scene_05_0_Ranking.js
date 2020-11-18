class Scene_05_0_Ranking extends Phaser.Scene {
    constructor() {
        super("Ranking");
        this.numStoredTimes = 10;

        this.name = "Ranking";
        this.bestTime = 0;
        this.allScoresText = '';

        this.levelWidth = 0;
        this.levelHeight = 0;

        this.players = [];

        //Layers
        this.backgroundLayer = null;    //Back
        this.wallsLayer = null;         //Walls
        this.obstaclesLayer = null;     //Dmg

        console.log("Ranking constructor");
    }

    init(args) {
        this.playerSkin = args.skin
        this.allScoresText = ''; //Whenever we enter the ranking we reset the scores in order to load them all from the start
    }

    create() {
        this.scene.get("MusicManager").music_play_Ranking();

        console.log("Ranking create");
        for (let i = 0; i < this.numStoredTimes; i++) {
            this.allScoresText += localStorage.getItem('time_' + i) + '\n'; //Write all scores
        }

        //Create tilemap
        this.map = this.make.tilemap({key: 'tilemap' + "_" + this.name});
        this.tiles = this.map.addTilesetImage('tilesheet' + "_" + this.name, 'tilesheet' + "_" + this.name, 64, 64, 1, 2);

        //Set level height and width according to the json's
        this.levelWidth = this.map.width * this.map.tileWidth;
        this.levelHeight = this.map.height * this.map.tileHeight;

        //Texts
        //Ranking title
        this.rankingTitle = this.add.text(this.levelWidth / 2, 170,
            'Ranking',
            {
                fontFamily: 'Stencil',
                fontStyle: 'Bold',
                fontSize: '64px',
                stroke: "#143675",
                strokeThickness: 9,
                align: "center",
                fill: '#ffffff'
                //fill: '#143675'
                //fill: '#db6a00'
            }).setOrigin(0.5, 0.5).depth = 1;

        //Scores display
        this.scoresDisplay = this.add.text(this.levelWidth / 2, 500,
            this.allScoresText,
            {
                fontFamily: 'Stencil',
                fontStyle: 'Bold',
                fontSize: '38px',
                stroke: "#143675",
                strokeThickness: 9,
                align: "center",
                fill: '#ffffff'
                //fill: '#143675'
                //fill: '#db6a00'
            }).setOrigin(0.5, 0.5).depth = 1;

        //Create layers from tilemap layers
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.map.createStaticLayer('decoration', this.tiles, 0, 0);
        this.wallsLayer = this.map.createStaticLayer('walls', this.tiles, 0, 0);

        //Enable collisions with layers
        this.wallsLayer.setCollisionByProperty({collide: true});
        this.backgroundLayer.setCollisionByProperty({collide: true});

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV

        //Simulate the joinning of a player
        this.createPlayer(this, 0, true);

        //Create cheerpenguins
        this.cheerPenguins = this.physics.add.staticGroup();
        this.cheerPenguins.add(new CheerPenguin(this, 'Glove_Left', {x: this.levelWidth / 2 + 130, y: this.levelHeight - 285}));
        this.cheerPenguins.add(new CheerPenguin(this, 'Glove_Right',{x: this.levelWidth / 2 , y: this.levelHeight - 345}));
    }

    createPlayer(level, id, controllable) {
        //Create player
        let thisPlayer = new Player(level, id, controllable, {
            x: this.levelWidth / 2 - 120,
            y: this.levelHeight - 500
        }, this.playerSkin);
        this.players.push(thisPlayer);
        //let thisPlayer = this.players.find(player => player.serverId === id);

        //Initialize physics
        //Set collisions between player and layers
        this.physics.add.collider(thisPlayer, this.wallsLayer, null, null, this);
        this.physics.add.collider(thisPlayer, this.backgroundLayer, null, null, this);

        //Camera
        if (controllable) {
            this.scene.run("InGameHUD", {player: thisPlayer, level: level});
            //this.cameras.main.startFollow(thisPlayer);
        }
    }

    setPlayerReady(){
        this.isRaceStarted = true;

        //StartCountdown
        let thisSceneManager = this.scene;
        this.time.addEvent({
            delay: 5000,
            loop: false,
            callback: function () {
                //Go back to the lobby
                thisSceneManager.stop("InGameHUD");
                //thisSceneManager.start("Lobby");
                thisSceneManager.start("MainMenu");
                thisSceneManager.get("MusicManager").music_stop_Ranking();
            }
        });
    }

    collideCallback() {
        console.log("Collision");
    }
}