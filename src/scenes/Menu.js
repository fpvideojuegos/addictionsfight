import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";
import UI from "./UI.js";

class Menu extends BasicScene {
    constructor() {
        super({key: 'Menu'});
    }
    
    init(data){
        //To Know where this scene comes from 
        //For stoping music or not
        if (data) this.levelFrom = data.from;
        
    }

    preload(){        
        
    }

    create() {        

        // background positions   
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;
        let x = width / 2 ;
        let y = height / 2 -50;
        
        // background        
        this.bg1 = this.add.image(0, 0, GameConstants.Textures.BG_LEVEL2).setOrigin(0).setScale(1);
        //Esto es para la posición del background dibujoPortadaEscaneado.png        
        this.bg = this.add.image(0, 0, GameConstants.Textures.BG_MENU).setOrigin(0).setScale(1);
        //Esto es para el título del juego en el menú
        this.bg9 = this.add.image(60, 0, GameConstants.Textures.BG_MENU2).setOrigin(0).setScale(2.2);

        //bg sound
        //Only play BG MUSIC  if come from other levels than the main scenes
        //For not stoping the music between menu scenes
        if (this.levelFrom!=GameConstants.Levels.CREDITS &&
            this.levelFrom!=GameConstants.Levels.LEVELSELECT &&
            this.levelFrom!=GameConstants.Levels.SCORES &&
            this.levelFrom!=GameConstants.Levels.SETTINGSLEVEL) {

                this.playMenuScenesBSO();
        }

        this.selectCharacterButton = this.add.dynamicBitmapText(width, 50, 'pixel', this.TG.tr('MENU.CHARACTER')).setTint(0xD23B19).setInteractive();
        this.selectCharacterButton.setPosition(50, 50);
        this.changeSceneFromButton(this.selectCharacterButton, GameConstants.Levels.SELECTCHARACTER);
        
        this.settingsButton = this.add.dynamicBitmapText(width, 50, 'pixel', this.TG.tr('MENU.SETTINGS')).setTint(0x0cff00).setInteractive();
        this.settingsButton.setPosition(width - this.settingsButton.width - 50, 50);
        this.changeSceneFromButton(this.settingsButton, GameConstants.Levels.SETTINGSLEVEL);
      
                        
        const startButton = this.add.dynamicBitmapText(80, y * 2, 'pixel', this.TG.tr('MENU.PLAY'), 24).setTint(0x0080FF);        
        startButton.setInteractive();
        this.changeSceneFromButton(startButton, GameConstants.Levels.LEVELSELECT);

        const introButton = this.add.dynamicBitmapText(220, y * 2, 'pixel', this.TG.tr('MENU.INTRO'), 24).setTint(0x0080FF);                
        introButton.setInteractive();
        this.changeSceneFromButton(introButton, GameConstants.Levels.INTROSTORY);

        const scoresButton = this.add.dynamicBitmapText(400, y * 2, 'pixel', this.TG.tr('MENU.SCORES'), 24).setTint(0x0080FF);                        
        scoresButton.setInteractive();
        this.changeSceneFromButton(scoresButton, GameConstants.Levels.SCORES);

        const creditsButton = this.add.dynamicBitmapText(600, y * 2, 'pixel', this.TG.tr('MENU.CREDITS'), 24).setTint(0x0080FF);        
        creditsButton.setInteractive();
        this.changeSceneFromButton(creditsButton, GameConstants.Levels.CREDITS);

        // change the position of the buttons
        let buttons = [
            startButton,
            introButton,
            scoresButton,
            creditsButton
        ];

        let freeSpace = width;
        buttons.forEach(function(button) {
            freeSpace = freeSpace - button.width;
        });
        
        let distance = freeSpace / (buttons.length + 1);
        
        for(let i = 0; i < buttons.length; i++) {
            let xPositionButton = distance * (i + 1);
            for (let j = 0; j < i; j++) {
                xPositionButton = xPositionButton + buttons[j].width;
            }
            buttons[i].setPosition(xPositionButton, buttons[i].y);
        }
    }

    update(time, delta) {
        
    }

    changeSceneFromButton(pressedButon, newScene){
        pressedButon.on('pointerdown', () => {             
            this.changeScene(this, newScene, 0); 
        });
    }

}
   
export default Menu;