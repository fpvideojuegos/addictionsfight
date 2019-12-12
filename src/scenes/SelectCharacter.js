import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class SelectCharacter extends BasicScene {
    constructor() {
        super({key: 'SelectCharacter'});
    }

    
    
    preload(){
        this.muted=false;
    }

    create(){

        
        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);
    }
}