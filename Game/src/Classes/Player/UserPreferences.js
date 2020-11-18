class UserPreferences extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(); //[HERE]
    }
    //Customization variables -> Appearance
    setPenguinType(index){
        this.penguinType = index;
    };

    setPenguinSprite(index){
        this.penguinSprite = index;
    };
}