let currentScene = 0;

class Gen_Level extends Phaser.Scene {
    constructor(name) {
        super(name);

        this.name = name;
        this.timer = 0;
        this.auxCount = 0;
        this.levelWidth = 0;
        this.levelHeight = 0;

        this.players = [];

        this.gen_saw_sprites = null;
        this.gen_powerUpBox_sprites = null;
        this.gen_cheerPenguins = null;

        //Layers
        this.backgroundLayer = null;    //Back
        this.wallsLayer = null;         //Walls
        this.obstaclesLayer = null;     //Dmg

        console.log("Gen_Level constructor");
    }

    init(args) {
        this.playerSkin = args.skin
        this.timer = 0;
        this.isRaceStarted = false;
    }

    create() {
        SetDeltaTime();
        //<editor-fold desc="Configure the map">
        console.log("Gen_Level create:" + 'tilemap' + "_" + this.name);

        this.registry.set('timer', this.timer); //Registry (update) the timer in the game registry

        this.SetUpRanking(); //Setup ranking in case that it doesnt exist yet

        //Create tilemap
        this.map = this.make.tilemap({key: 'tilemap' + "_" + this.name});
        this.tiles = this.map.addTilesetImage('tilesheet' + "_" + this.name, 'tilesheet' + "_" + this.name, 64, 64, 1, 2);

        //Set level height and width according to the json's
        this.levelWidth = this.map.width * this.map.tileWidth;
        this.levelHeight = this.map.height * this.map.tileHeight;

        //Create layers from tilemap layers
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.gen_finishLine_sprite = this.physics.add.staticSprite(this.levelWidth / 2, 300, 'gen_finishLine_sprite'); //Create finish line
        //this.gen_finishLine_sprite = this.physics.add.staticSprite(this.levelWidth / 2, this.levelHeight - 500, 'gen_finishLine_sprite');
        //this.map.createStaticLayer('decoration', this.tiles, 0, 0);
        this.wallsLayer = this.map.createStaticLayer('walls', this.tiles, 0, 0);
        this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);

        //Send walls layer to the front (saws will be seen behind them)
        this.wallsLayer.depth = 2;

        //Enable collisions with layers
        this.wallsLayer.setCollisionByProperty({collide: true});
        this.obstaclesLayer.setCollisionByProperty({collide_obstacle: true});

        //<editor-fold desc="Tilemap visual debugging">
        // const debugWalls = this.add.graphics().setAlpha(0.7);
        // this.wallsLayer.renderDebug(debugWalls, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        //
        // const debugObstacles = this.add.graphics().setAlpha(0.7);
        // this.obstaclesLayer.renderDebug(debugObstacles, {
        //     tileColor: null,
        //     collidingTileColor: new Phaser.Display.Color(243, 234, 48),
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)
        // });
        //</editor-fold>


        //Saws
        this.gen_saw_sprites = this.physics.add.group({
            //immovable: true,
            allowGravity: false,
            runChildUpdate: true
        });

        //Power Ups
        this.gen_powerUpBox_sprites = this.physics.add.staticGroup();

        //Cheer penguins
        this.gen_cheerPenguins = this.physics.add.staticGroup();

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV

        //</editor-fold>
    }

    createPlayer(level, id, controllable) {
        //Create player
        let thisPlayer = new Player(level, id, controllable, {
            x: this.levelWidth / 2,
            y: this.levelHeight - 300
        }, this.playerSkin);
        this.players.push(thisPlayer);
        //let thisPlayer = this.players.find(player => player.serverId === id);

        //Initialize physics
        this.physics.add.collider(thisPlayer, this.wallsLayer, null, null, this);
        this.obstaclesLayerCollision = this.physics.add.collider(thisPlayer, this.obstaclesLayer, this.takeDamageCallback, null, this);
        this.sawLayerCollision = this.physics.add.collider(thisPlayer, this.gen_saw_sprites, this.takeDamageCallback, null, this);
        this.physics.add.overlap(thisPlayer, this.gen_powerUpBox_sprites, this.pickPowerUpCallback, null, this);
        this.physics.add.overlap(thisPlayer, this.gen_finishLine_sprite, this.winCallback, null, this);

        console.log(this.sawLayerCollision);   //[HERE] The gen_finishLine_sprite is undefined
        //console.log(gen_finishLine_spriteOverlap); //[HERE] As you can see, the object2 is undefined

        //Camera
        if (controllable) {
            this.scene.run("InGameHUD", {player: thisPlayer, level: level});
            this.cameras.main.startFollow(thisPlayer);
        }
    }

    update() {
        SetDeltaTime();
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i].powerUpObject_Used !== null)
                this.players[i].powerUpObject_Used.Render();
            this.players[i].DashPowerUpFollow();
        }
    }

    //<editor-fold desc="Callbacks">
    setPlayerReady(){
        //[HERE] In the multiplayer mode, this method would wait until all the players have joined the race
        this.initRace()
    }

    initRace(){
        //Set up text
        let countdown = 3;
        this.scene.get("InGameHUD").setCountdown(countdown);

        //When the timer's out, give control to the players
        let thisObj = this;
        this.time.addEvent({
            delay: 1000,
            repeat: 3,
            loop: false,
            callback: function () {
                countdown--;
                thisObj.scene.get("InGameHUD").setCountdown(countdown);

                if(countdown === 0){
                    thisObj.isRaceStarted = true;
                    thisObj.startRaceChrono();
                }
            }
        });
    }

    startRaceChrono(){
        //Start timer
        let thisScene = this; //Variable for the change of scope
        this.time.addEvent({
            delay: 1,
            loop: true,
            callback: function () {
                //Update timer
                thisScene.timer += 0.01;
                thisScene.registry.set('timer', thisScene.timer); //We have to update the registy variable constantly for the HUD
            }
        });
    }

    takeDamageCallback(player, dmgObject) {
        player.TakeDamage(this.obstaclesLayerCollision, this.sawLayerCollision);
    }

    pickPowerUpCallback(player, gen_powerUpBox_sprite) {
        gen_powerUpBox_sprite.PickBox(player);
    }

    goToRanking(){
        this.scene.stop("InGameHUD");
        this.scene.start("Ranking", {skin: this.playerSkin});
    }

    winCallback(player, raceLine) {
        this.goToRanking();
        this.SaveTime();
    }

    // endRace() {
    //     this.goToRanking();
    //     //this.SaveTime();
    // }

    // Exit() {
    //     this.endRace();
    //     //this.winCallback();
    //     //this.scene.stop("InGameHUD")
    //
    //     //this.endRace();
    //     //this.scene.start("MainMenu");
    // }

    SetUpRanking(){
        //Prepare ranking board in case that it does not exist
        if (localStorage.getItem('timeCount') == null) {
            localStorage.setItem('timeCount', this.auxCount.toString());
            for (let i = 0; i < 5; i++) {
                localStorage.setItem('time_' + i, '-- : --');
            }
        }
    }

    SaveTime() {
        //localStorage.clear();
        this.auxCount = -1;
        for (let i = 0; i < 5; i++) {
            if (this.timer < parseInt(localStorage.getItem('time_' + i)) || localStorage.getItem('time_' + i) === '-- : --') {
                if (localStorage.getItem('time_' + i) === '-- : --') {
                    this.auxCount = i;
                    break;
                } else {
                    this.MoveAllTimesDown(i)
                    this.auxCount = i;
                    break;
                }
            }
        }
        if (this.auxCount !== -1)
            localStorage.setItem('time_' + this.auxCount, `${this.timer.toFixed(2)}`);
    }

    MoveAllTimesDown(start) {
        for (let i = 4; i > start; i--) {
            localStorage.setItem('time_' + i, localStorage.getItem('time_' + (i - 1)));
        }
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
