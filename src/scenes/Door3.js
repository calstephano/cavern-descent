class Door3 extends Phaser.Scene {
    constructor() {
        super("door3Scene");
    }

    preload(){ 
        this.load.tilemapTiledJSON('door3_map', './assets/doors3.json');
        this.load.spritesheet('tiles', './assets/doorTiles.png', {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 2
        });
    }

    create() {
        this.doorSFX = this.sound.add('doorEnter');
        const map = this.add.tilemap('door3_map');
        const tileset = map.addTilesetImage('doorTiles', 'tiles');
        const groundLayer = map.createLayer('Ground', tileset);
        const entranceLayer = map.createLayer('Entrance', tileset);
        const wallsLayer = map.createLayer('Walls', tileset);
        let p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");

        wallsLayer.setCollisionByProperty({ 
            collides: true 
        });

        // set up player
        this.p1 = new Player(this, p1Spawn.x, p1Spawn.y, "idleAtlas", 'IdleDown_0001', false);
        this.physics.add.collider(this.p1, wallsLayer);

        // Only call scene change exactly once on entrance
        this.inEntrance = false;
        this.physics.add.overlap(this.p1, entranceLayer, ()=> {
            if (!this.inEntrance) {
                this.inEntrance = true
                this.doorSFX.play();
                this.scene.start('level3Scene');
            }
        }, this.checkOverlap, this);
        
        // Set up keyboard controls for player
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Test that the walls actualy have collision
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,    // color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        // });
    }

    update() {
        this.p1.update()
    }

    checkOverlap(p1, tile){
        if(tile.index == -1) return false;
        return true;
    }
}