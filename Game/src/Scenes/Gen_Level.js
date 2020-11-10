class Gen_Level extends Phaser.Scene {
    constructor(name) {
        super(name);

        this.nameF = name;
        this.name = "";
        this.levelWidth = 0;
        this.levelHeight = 0;

        this.players = [];

        this.powerUpBoxes = null;

        //Layers
        this.backgroundLayer = null;    //Back
        this.wallsLayer = null;         //Walls
        this.obstaclesLayer = null;     //Dmg

        console.log("Gen_Level constructor");
    }

    create() {
        //<editor-fold desc="Configure the map">
        console.log("Gen_Level create")

        //Create tilemap
        this.map = this.make.tilemap({key: 'tilemap' + this.name});
        this.tiles = this.map.addTilesetImage
        ('tilesheet' + this.name, 'tilesheet' + this.name, 64, 64, 1, 2);

        //Set level height and width according to the json's
        this.levelWidth = this.map.width * this.map.tileWidth;
        this.levelHeight = this.map.height * this.map.tileHeight;

        //Create layers from tilemap layers
        this.backgroundLayer = this.map.createStaticLayer('background' + this.name, this.tiles, 0, 0);
        this.map.createStaticLayer('decoration' + this.name, this.tiles, 0, 0);
        this.wallsLayer = this.map.createStaticLayer('walls' + this.name, this.tiles, 0, 0);
        this.obstaclesLayer = this.map.createStaticLayer('obstacles' + this.name, this.tiles, 0, 0);

        //Enable collissions with layers
        this.wallsLayer.setCollisionByProperty({collide: true});
        this.obstaclesLayer.setCollisionByProperty({collide_obstacle: true});
        this.backgroundLayer.setCollisionByProperty({finishLine: true});

        //Power Ups
        this.powerUpBoxes = this.physics.add.staticGroup();

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV

        //</editor-fold>
    }

    createPlayer(level, id, controllable) {
        //Create player
        let thisPlayer = new Player(level, id, controllable);
        this.players.push(thisPlayer);
        //let thisPlayer = this.players.find(player => player.serverId === id);

        //Initialize physics
        this.physics.add.overlap(thisPlayer, this.backgroundLayer.finishLine, this.winCallback, null, this); //[HERE] it does not work!
        this.physics.add.collider(thisPlayer, this.wallsLayer, null, null, this);
        this.physics.add.collider(thisPlayer, this.obstaclesLayer, this.takeDamageCallback, null, this);
        this.physics.add.overlap(thisPlayer, this.powerUpBoxes, this.pickPowerUpCallback, null, this);


        //Camera
        if (controllable) {
            //let hud = new Scene_InGameHUD(thisPlayer);  //[HERE]
            //console.log("Level");
            this.scene.run("InGameHUD", thisPlayer);
            this.cameras.main.startFollow(thisPlayer);
        }
    }

    update() {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].powerUpObject_Used !== null)
                this.players[i].powerUpObject_Used.Render();
        }
    }

    //<editor-fold desc="Callbacks">

    takeDamageCallback(player, dmgObject) {
        player.TakeDamage();
    }

    pickPowerUpCallback(player, powerUpBox) {
        powerUpBox.PickBox(player);
    }

    winCallback(player, raceLine) {
        console.log("You win");
        console.log("POS X: " + player.body.position.x);
        console.log("POS Y: " + player.body.position.y);
    }

    //Camera zoom (not used)
    // cameraZoomCallback() {
    //     if (player.body.velocity.y < 0) {
    //         this.physics.world.setBounds(0, 0, skySpr.width * scaledW, skySpr.height * scaledH);
    //         this.cameras.main.zoomTo(1 / 3, 2000, "Linear", true);
    //     } else if (player.body.velocity.y > 0) {
    //         this.physics.world.setBounds(game.config.width * 2, 0, game.config.width * 2, skySpr.height * scaledH);
    //         this.cameras.main.zoomTo(1, 2000, "Linear", true);
    //     }
    // }

    //</editor-fold>

}