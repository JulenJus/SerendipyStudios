class PowerUp {
    constructor(player) {
        this.player = player;
        this.icon = null;
        this.sprite = null;
    }

    //This method is used to show the powerUp on the box
    Pick(){
        throw new Error("Pick() method must be implemented in child!");
    }

    //This method is used to describe what the powerUp functionality
    Use(){
        throw new Error("Use() method must be implemented in child!");
    }

    //This method is used to show constantly an action on screen while the power up is used
    Render(){
        throw new Error("Render() method must be implemented in child!");
    }

    //This method is used to cleanly destroy the power up.
    Destroy(){
        throw new Error("Destroy() method must be implemented in child!");
    }
}
