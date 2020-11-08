class PowerUp {
    constructor(player) {
        this.player = player;
        this.icon = null;
        this.sprite = null;
    }

    Pick(){
        throw new Error("Pick() method must be implemented in child!");
    }

    Use(){
        throw new Error("Use() method must be implemented in child!");
    }

    Render(){
        throw new Error("Render() method must be implemented in child!");
    }

    Destroy(){
        throw new Error("Destroy() method must be implemented in child!");
    }
}
