playingAudios = [];

class Scene_01_1_MusicManager extends Phaser.Scene {
    constructor() {
        super("MusicManager");

        this.volume_music = 0.5;
        this.volume_sfx = 0.5;
    }

    init() {
        //Music
        this.music_mainMenu = this.sound.add('music_mainMenu', {loop: true});
        this.music_inGame = this.sound.add('music_inGame', {loop: true});
        this.music_ranking = this.sound.add('sfx_ranking_clap', {loop: true});

        //Sfx
        this.sfx_button = this.sound.add('sfx_gen_button', {loop: false});
        this.sfx_box = this.sound.add('sfx_genLvl_box', {loop: false});
        this.sfx_powerUp_shield = this.sound.add('sfx_genLvl_powerUp_shield', {loop: false});
        this.sfx_powerUp_shield_broken = this.sound.add('sfx_genLvl_powerUp_shield_broken', {loop: false});
        this.sfx_powerUp_dash = this.sound.add('sfx_genLvl_powerUp_dash', {loop: false});
        this.sfx_collision = this.sound.add('sfx_genLvl_collision', {loop: false});
        this.sfx_flap = this.sound.add('sfx_genLvl_flap', {loop: false});
        this.sfx_goal = this.sound.add('sfx_genLvl_goal', {loop: false});
        this.sfx_squawk = this.sound.add('sfx_genLvl_squawk', {loop: false});
        this.sfx_damage = this.sound.add('sfx_genLvl_damage', {loop: false});
        this.sfx_countdown_short = this.sound.add('sfx_genLvl_countdown_short', {loop: false});
        this.sfx_countdown_long = this.sound.add('sfx_genLvl_countdown_long', {loop: false});

        //On focus events
        game.events.on('visible', function(){
            console.log("Resume all");

            for (let i = 0; i < playingAudios.length; i++) {
                playingAudios[i].resume();
            }
        });

        game.events.on('hidden', function (){
            console.log("Pause all");

            for (let i = 0; i < playingAudios.length; i++) {
                playingAudios[i].pause();
            }
        });
    }

    //Getters & setters
    getMusicVolume() {
        return this.volume_music;
    }

    setMusicVolume(value) {
        this.volume_music = value;

        for (let i = 0; i < playingAudios.length; i++) {
            playingAudios[i].setVolume(this.volume_music);
        }
    }

    getSfxVolume() {
        return this.volume_sfx;
    }

    setSfxVolume(value) {
        this.volume_sfx = value;
    }

    //Music Methods
    music_play_MainMenu() {
        if (!this.music_mainMenu.isPlaying) {
            this.music_mainMenu.play();
            playingAudios.push(this.music_mainMenu);
            this.music_mainMenu.setVolume(this.volume_music);
        }
    }

    music_stop_MainMenu() {
        if (this.music_mainMenu.isPlaying) {
            this.music_mainMenu.stop();
            playingAudios.splice(playingAudios.indexOf(this.music_mainMenu), 1);
        }
    }

    music_play_InGame() {
        if (!this.music_inGame.isPlaying) {
            this.music_inGame.play();
            playingAudios.push(this.music_inGame);
            this.music_inGame.setVolume(this.volume_music);
        }
    }

    music_stop_InGame() {
        if (this.music_inGame.isPlaying) {
            this.music_inGame.stop();
            playingAudios.splice(playingAudios.indexOf(this.music_inGame), 1);
        }
    }

    music_play_Ranking() {
        if (!this.music_ranking.isPlaying) {
            this.music_ranking.play();
            playingAudios.push(this.music_ranking);
            this.music_ranking.setVolume(this.volume_music);
        }
    }

    music_stop_Ranking() {
        if (this.music_ranking.isPlaying) {
            this.music_ranking.stop();
            playingAudios.splice(playingAudios.indexOf(this.music_ranking), 1);
        }
    }

    //Sfx methods
    sfx_play_button() {
        this.sfx_button.play();
        this.sfx_button.setVolume(this.volume_sfx);
    }

    sfx_play_box() {
        this.sfx_box.play();
        this.sfx_box.setVolume(this.volume_sfx);
    }

    sfx_play_collision() {
        this.sfx_collision.play();
        this.sfx_collision.setVolume(this.volume_sfx);
    }

    sfx_play_flap() {
        this.sfx_flap.play();
        this.sfx_flap.setVolume(this.volume_sfx);
    }

    sfx_play_goal() {
        this.sfx_goal.play();
        this.sfx_goal.setVolume(this.volume_sfx);
    }

    sfx_play_squawk() {
        this.sfx_squawk.play();
        this.sfx_squawk.setVolume(this.volume_sfx);
    }

    sfx_play_damage() {
        this.sfx_damage.play();
        this.sfx_damage.setVolume(this.volume_sfx);
    }

    sfx_play_countdown_short() {
        this.sfx_countdown_short.play();
        this.sfx_countdown_short.setVolume(this.volume_sfx);
    }

    sfx_play_countdown_long() {
        this.sfx_countdown_long.play();
        this.sfx_countdown_long.setVolume(this.volume_sfx);
    }

    sfx_play_powerUp_shield() {
        this.sfx_powerUp_shield.play();
        this.sfx_powerUp_shield.setVolume(this.volume_sfx);
    }

    sfx_play_powerUp_shield_broken() {
        this.sfx_powerUp_shield_broken.play();
        this.sfx_powerUp_shield_broken.setVolume(this.volume_sfx);
    }

    sfx_play_powerUp_dash() {
        this.sfx_powerUp_dash.play();
        this.sfx_powerUp_dash.setVolume(this.volume_sfx);
    }
}

//General functions
function pauseAll() {

}

function resumeAll() {

}