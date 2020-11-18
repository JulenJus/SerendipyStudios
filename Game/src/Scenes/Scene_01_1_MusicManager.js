class Scene_01_1_MusicManager extends Phaser.Scene {
    constructor(){
        super("MusicManager");

        this.volume_music = 0.5;
        this.volume_sfx = 0.5;

        this.playingAudios = [];
    }

    init(){
        this.music_mainMenu = this.sound.add('music_mainMenu', {loop: true});
        this.music_inGame = this.sound.add('music_inGame', {loop: true});
    }

    //Getters & setters
    getMusicVolume(){
        return this.volume_music;
    }

    setMusicVolume(value){
        this.volume_music = value;

        for (let i = 0; i< this.playingAudios.length; i++){
            this.playingAudios[i].setVolume(this.volume_music);
        }
    }

    getSfxVolume(){
        return this.volume_sfx;
    }

    setSfxVolume(value){
        this.volume_sfx = value;
    }

    //Methods
    play_MainMenuMusic(){
        if(!this.music_mainMenu.isPlaying) {
            this.music_mainMenu.play();
            this.playingAudios.push(this.music_mainMenu);
            this.music_mainMenu.setVolume(this.volume_music);
        }
    }

    stop_MainMenuMusic(){
        if(this.music_mainMenu.isPlaying) {
            this.music_mainMenu.stop();
            this.playingAudios.delete(this.music_mainMenu);
        }
    }

    play_InGameMusic(){
        if(!this.music_inGame.isPlaying) {
            this.music_inGame.play();
            this.playingAudios.push(this.music_inGame);
            this.music_inGame.setVolume(this.volume_music);
        }
    }

    stop_InGameMusic(){
        if(this.music_inGame.isPlaying) {
            this.music_inGame.stop();
            this.playingAudios.delete(this.music_inGame);
        }
    }
}