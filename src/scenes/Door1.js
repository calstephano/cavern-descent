class Door1 extends Phaser.Scene {
    constructor() {
        super("door1Scene");
    }

    preload(){ 
        this.load.tilemapTiledJSON('door1_map', './assets/doors1.json');
        this.load.spritesheet('tiles', './assets/doorTiles.png', {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 2
        });
        this.load.image('test', './assets/doorTiles.png')
    }

    create() {
        const map = this.add.tilemap('door1_map');
        const tileset = map.addTilesetImage('doorTiles', 'tiles');
        const groundLayer = map.createLayer('Ground', tileset);
        const wallsLayer = map.createLayer('Walls', tileset);
        let p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");

        wallsLayer.setCollisionByProperty({ 
            collides: true 
        });

        // set up player
        this.p1 = new Player(this, p1Spawn.x, p1Spawn.y, "idleAtlas", 'IdleDown_0001');
        this.physics.add.collider(this.p1, wallsLayer);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        wallsLayer.renderDebug(debugGraphics, {
            tileColor: null,    // color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        });
    }

    update() {
        this.p1.update()
    }
}