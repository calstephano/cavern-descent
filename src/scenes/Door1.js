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
        this.map = this.add.tilemap('door1_map');
        this.tileset = this.map.addTilesetImage('doorTiles', 'tiles');
        this.groundLayer = this.map.createLayer('Ground', this.tileset);
        this.wallsLayer = this.map.createLayer('Walls', this.tileset);
        this.p1Spawn = this.map.findObject("Objects", obj => obj.name === "playerSpawn");

        // set up player
        this.p1 = new Player(this, this.p1Spawn.x, this.p1Spawn.y, "tempPlayer");
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.p1.update()
    }
}