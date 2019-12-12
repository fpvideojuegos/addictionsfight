import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";


class Level2 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL2
        });
        this.target = GameConstants.Levels.LEVEL3;
    }

    // borramos porque ya está incluido en la BasicScene y crea conflicto a la hora de coger la info de la escena
    /*preload() {
        this.scene.launch('UI');
    }*/

    create() {
        //Daniela Creation
        this.createDaniela(GameConstants.Sprites.Daniela.KEY, false);
        //Background
        this.createRepeatedBackground(GameConstants.Textures.BG_LEVEL2, defaultStatus, defaultStatus, { x: 1.25, y: 1.25 });
        //Finding enemies in json map
        this.findAndLoadEnemiesFromMap(GameConstants.Enemies_Layers.Level2);
        //ExtraPoints        
        this.createCoins();
        //HealthText
        this.createHealthText();
        //Tilemap
        this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK, 'Landscape', false);
        this.paintLayerAndCreateCollision(GameConstants.Tiles.PLATFORM_TILESET, 'Platform', true);

        //PRIVATE SCENE ELEMENTS
        let wall = this.paintLayerAndCreateCollision(GameConstants.Tiles.FOREST_PACK, 'Wall');
        this.findTransparentObjects(GameConstants.Layers.LIMITS, GameConstants.Sprites.Limit.KEY, false, true);

        //MUSIC and AUDIOS
        this.audioLevel2_LOLO_LookWhatIHaveFound_13 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL2.LOLO_ANSWER);
        this.addEventForMusic(this.audioLevel2_LOLO_LookWhatIHaveFound_13);
        this.audioLevel2_LOLO_YouHaveToFindTheLever_15 = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVEL2.LOLO_TASK);
        this.addEventForMusic(this.audioLevel2_LOLO_YouHaveToFindTheLever_15, false, 10000);
        this.music = this.sound.add(GameConstants.Sound.LEVEL2.BSO, { volume: 0.4 });
        this.addEventForMusic(this.music, true);
        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(this.TG.getActualLang() + "_" + GameConstants.Sound.LEVELALL.WEDIDIT);


        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, this.cameras.main.height - 75, GameConstants.Fonts.PIXEL, this.TG.tr('LEVEL2.FINDCLOTHES') + "\n\n" + this.TG.tr('LEVEL2.FINDLEVER'), 10);
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);



        //Create CaveManClothes
        this.cavemanclothes = this.createEndLevelObject(GameConstants.Sprites.Cavemen_Clothes.KEY);
        this.physics.world.enable(this.cavemanclothes);
        this.cavemanclothe = this.cavemanclothes[0];
        this.cavemanclothe.setScale(2.75);
        this.cavemanclothe.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.CAVEMAN_CLOTHES, this.cavemanclothe);

        //Create Joystick
        this.joysticks = this.map.createFromObjects('ActionButton', 'openwall', GameConstants.Sprites.Joystick.KEY);
        this.physics.world.enable(this.joysticks);
        this.joystick = this.joysticks[0];
        this.joystick.setScale(1.5);
        this.joystick.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.JOYSTICK, this.joystick);


        //Wall collider        
        this.physics.add.collider(this.daniela, this.joystick, () => {
            this.joystick.destroy();
            wall.setCollisionByExclusion([0]);
            wall.alpha = 0;
        });


        //Create ball
        //Check DB if ball is false the next two blocks
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (!this.DB.inventory.ball) {


            this.inventoryObjs = this.map.createFromObjects('Inventary', 'ball', 'ball');

            this.physics.world.enable(this.inventoryObjs);
            this.ball = this.inventoryObjs[0];
            //this.ball.setScale(0.25);
            this.ball.body.setAllowGravity(false);
            this.ball.setTexture("ball");
            //this.ball.setSize(150,150,50,25);
            //this.ball.body.immovable = true;
           //console.log(this.ball);
            //this.ball.setOrigin(0);

            //Inventory collider        
            this.physics.add.collider(this.daniela, this.ball, () => {
                this.ball.destroy();
                this.DB.inventory.ball = true;
                store.set(GameConstants.DB.DBNAME, this.DB);
            });

        }


        //Create book
        //Check DB if book is false the next two blocks
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (!this.DB.inventory.book) {


            this.inventoryObjs = this.map.createFromObjects('Inventary', 'book', 'book');

            this.physics.world.enable(this.inventoryObjs);
            this.book = this.inventoryObjs[0];
            //this.book.setScale(0.1);
            this.book.body.setAllowGravity(false);
            this.book.setTexture("book");

            //Inventory collider        
            this.physics.add.collider(this.daniela, this.book, () => {
                this.book.destroy();
                this.DB.inventory.book = true;
                store.set(GameConstants.DB.DBNAME, this.DB);
            });

        }


        //Create banana
        //Check DB if banana is false the next two blocks
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (!this.DB.inventory.banana) {


            this.inventoryObjs = this.map.createFromObjects('Inventary', 'banana', 'banana');

            this.physics.world.enable(this.inventoryObjs);
            this.banana = this.inventoryObjs[0];
            //this.banana.setScale(0.2);
            this.banana.body.setAllowGravity(false);
            this.banana.setTexture("banana");

            //Inventory collider        
            this.physics.add.collider(this.daniela, this.banana, () => {
                this.banana.destroy();
                this.DB.inventory.banana = true;
                store.set(GameConstants.DB.DBNAME, this.DB);
            });

        }



        //Create racket
        //Check DB if racket is false the next two blocks
        this.DB = store.get(GameConstants.DB.DBNAME);
        if (!this.DB.inventory.racket) {


            this.inventoryObjs = this.map.createFromObjects('Inventary', 'racket', 'racket');

            this.physics.world.enable(this.inventoryObjs);
            this.racket = this.inventoryObjs[0];
            //this.racket.setScale(0.1);
            this.racket.body.setAllowGravity(false);
            this.racket.setTexture("racket");

            //Inventory collider        
            this.physics.add.collider(this.daniela, this.racket, () => {
                this.racket.destroy();
                this.DB.inventory.racket = true;
                store.set(GameConstants.DB.DBNAME, this.DB);
            });

        }



        this.physics.add.collider(this.daniela, this.cavemanclothe, () => {
            this.music.stop();
            this.cavemanclothe.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();
            this.daniela.nextScene();
        });

    }

    update(time, delta) {
        this.daniela.update(time, delta);
        Object.keys(this.enemyGroups).forEach(enemy => {
            this.enemyGroups[enemy].update();
        });
    }
}
export default Level2;