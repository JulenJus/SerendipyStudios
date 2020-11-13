class Gen_Level extends Phaser.Scene {
    constructor(name) {
        super(name);

        this.name = name;
        this.levelWidth = 0;
        this.levelHeight = 0;

        this.players = [];

        this.gen_powerUpBox_sprites = null;

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
        this.map = this.make.tilemap({key: 'tilemap' + "_" + this.name});
        this.tiles = this.map.addTilesetImage('tilesheet' + "_" + this.name, 'tilesheet' + "_" + this.name, 64, 64, 1, 2);

        //Set level height and width according to the json's
        this.levelWidth = this.map.width * this.map.tileWidth;
        this.levelHeight = this.map.height * this.map.tileHeight;

        //Create layers from tilemap layers
        this.backgroundLayer = this.map.createStaticLayer('background', this.tiles, 0, 0);
        this.gen_finishLine_sprite = this.physics.add.staticSprite(this.levelWidth / 2, 300, 'gen_finishLine_sprite'); //Create finish line
        this.map.createStaticLayer('decoration', this.tiles, 0, 0);
        this.wallsLayer = this.map.createStaticLayer('walls', this.tiles, 0, 0);
        this.obstaclesLayer = this.map.createStaticLayer('obstacles', this.tiles, 0, 0);

        //Enable collisions with layers
        this.wallsLayer.setCollisionByProperty({collide: true});
        this.obstaclesLayer.setCollisionByProperty({collide_obstacle: true});

        //Enemies
        this.gen_saw_sprites = this.physics.add.staticGroup();

        //Power Ups
        this.gen_powerUpBox_sprites = this.physics.add.staticGroup();

        //Camera follow and bounds
        this.physics.world.setBounds(0, 0, this.levelWidth, this.levelHeight);
        this.cameras.main.setBounds(0, 0, this.levelWidth, this.levelHeight); //The camera will be able to move all around the map, and we'll change the size of the world and make zoom to vary the player/s FoV

        //</editor-fold>
    }

    createPlayer(level, id, controllable) {
        //Create player
        let thisPlayer = new Player(level, id, controllable, {x:scene.levelWidth / 2, y: scene.levelHeight - 300});

        this.players.push(thisPlayer);
        //let thisPlayer = this.players.find(player => player.serverId === id);

        //Play Idle animation
        thisPlayer.anims.play('gen_player_animation_Idle_Armin');

        //Set hitbox size
        thisPlayer.setSize(104, 119, true);

        //Initialize physics
        this.physics.add.collider(thisPlayer, this.wallsLayer, null, null, this);
        this.obstaclesLayerCollision = this.physics.add.collider(thisPlayer, this.obstaclesLayer, this.takeDamageCallback, null, this);
        this.sawLayerCollision = this.physics.add.collider(thisPlayer, this.this.gen_saw_sprites, this.takeDamageCallback, null, this);
        this.physics.add.overlap(thisPlayer, this.gen_powerUpBox_sprites, this.pickPowerUpCallback, null, this);
        this.physics.add.overlap(thisPlayer, this.gen_finishLine_sprite, this.winCallback, null, this);

        //console.log(this.backgroundLayer.gen_finishLine_sprite);   //[HERE] The gen_finishLine_sprite is undefined
        //console.log(gen_finishLine_spriteOverlap); //[HERE] As you can see, the object2 is undefined

        //Camera
        if (controllable) {
            this.scene.run("InGameHUD", {player: thisPlayer, level: level});
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
        player.TakeDamage(this.obstaclesLayerCollision, this.sawLayerCollision);
    }

    pickPowerUpCallback(player, gen_powerUpBox_sprite) {
        gen_powerUpBox_sprite.PickBox(player);
    }

    winCallback(player, raceLine) {
        this.scene.stop("InGameHUD");
        this.scene.start("Ranking");
    }

    endRace(){
        this.scene.stop("InGameHUD");
        this.scene.start("Ranking");
    }

    Exit(){
        this.winCallback();
        //this.scene.stop("InGameHUD")

        //this.endRace();
        //this.scene.start("MainMenu");
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