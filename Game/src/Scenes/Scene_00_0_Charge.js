class Scene_00_0_Charge extends Phaser.Scene {
    constructor() {
        super("Charge");
    }

    preload() {
        //Charge the preload assets
        this.loadPreload();
    }

    create() {
        //Set background
        this.background = this.add.image(0, 0, 'preload_background').setOrigin(0, 0);

        //Set the bar
        this.preloadBar_fill = this.add.image(135, 931, 'preload_progressBar_fill').setOrigin(0, 0);
        this.preloadBar_fill.setCrop(0, 0, 0, 50);


        //Set the phrases
        this.phrases = [];
        this.phrases.push('preload_phrase_Pintando pinchos');
        this.phrases.push('preload_phrase_Colocando sierras');
        this.phrases.push('preload_phrase_Llamando unidades');
        this.phrasesSprite = this.add.image(this.game.config.width / 2, 1050, '').setOrigin(0.5, 0.5);

        this.phraseIndex = -1;

        this.scene.run("Preload", this);
    }

    //Load functions

    loadPreload() {
        //Background
        this.load.image('preload_background', './assets/Sprites/Menus/Preload/preload_background.png');

        //Bar
        this.load.image('preload_progressBar_empty', './assets/Sprites/Menus/Preload/preload_progressBar_empty.png');
        this.load.image('preload_progressBar_fill', './assets/Sprites/Menus/Preload/preload_progressBar_fill.png');

        //Phrases
        this.load.image('preload_phrase_Colocando sierras', './assets/Sprites/Menus/Preload/preload_phrase_Colocando sierras.png');
        this.load.image('preload_phrase_Llamando unidades', './assets/Sprites/Menus/Preload/preload_phrase_Llamando unidades.png');
        this.load.image('preload_phrase_Pintando pinchos', './assets/Sprites/Menus/Preload/preload_phrase_Pintando pinchos.png');
    }

    setProgress = function (progress) {
        //console.log(progress);

        //Set the progress bar fill
        this.preloadBar_fill.setCrop(0, 0, 498 * progress, 50);

        //Show a phrase
        let phraseIndex = parseInt(progress / ((100 / this.phrases.length) / 100));
        //console.log(phraseIndex);
        if (phraseIndex !== this.phraseIndex) {
            this.phrasesSprite.setTexture(this.phrases[phraseIndex]);
            this.phraseIndex = phraseIndex;
        }

        return;
    }
}