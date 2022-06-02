class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {
        // Add enemy images/atlases here
        this.load.atlas('be1_atlas', './assets/slime.png', './assets/slime.json');
        this.load.atlas('re1_atlas', './assets/fireCobra.png', './assets/fireCobra.json');
        this.load.image('bullet', './assets/fireball.png');
        this.load.image('combat', './assets/combat.png') 

        // Tilemap
        this.load.tilemapTiledJSON('level1_map', './assets/level1.json');
        this.load.spritesheet('level1tiles', './assets/placeholder.png', {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 0
        });
    }

    create() {
        this.doorSFX = this.sound.add('doorEnter');
        const map = this.add.tilemap('level1_map');
        const tileset = map.addTilesetImage('placeholder', 'level1tiles');
        const groundLayer = map.createLayer('Ground', tileset);
        const entranceLayer = map.createLayer('Entrance', tileset);
        const TopWallsLayer = map.createLayer('TopWalls', tileset);
        let p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");

        let combatTip = map.findObject("Objects", obj => obj.name === "combat");
        this.add.image(combatTip.x, combatTip.y, 'combat').setAlpha(0.5)

        // Add enemy groups
        let beName = 'imp';
        let reName = 'fCobra';
        this.EGroups = new EnemyGroups(this, 'be1_atlas', 're1_atlas', 'bullet');
        this.EGroups.addEnemyGroups();
        this.createEnemyAnims(beName, reName);

        // get basic enemy object array from tilemap Objects layer
        let BasicEnemyObjects = map.filterObjects("Objects", obj => obj.name === "basicEnemy");
        // get enemy object array from tilemap Objects layer
        let RangedEnemyObjects = map.filterObjects("Objects", obj => obj.name === "rangedEnemy");

        // set up player
        this.gameOver = false;
        this.p1 = new Player(this, p1Spawn.x, p1Spawn.y, "idleAtlas", 'IdleDown_0001', false);
        this.p1.setupCombat(true);

        // Create lower walls + collisions for both top and bottom walls
        const BottomWallsLayer = map.createLayer('Walls', tileset);
        TopWallsLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.p1, TopWallsLayer);
        BottomWallsLayer.setCollisionByProperty({ 
            collides: true 
        });
        this.physics.add.collider(this.p1, BottomWallsLayer);

        // Add enemy
        BasicEnemyObjects.map((element) => {
            this.EGroups.addBasicEnemy(element.x, element.y, this.p1, 400, 200, beName);
        })
        RangedEnemyObjects.map((element) => {
            this.EGroups.addRangedEnemy(element.x, element.y, this.p1, 500, 200, reName);
        })
        this.physics.add.collider(this.EGroups.BEGroup, BottomWallsLayer)
        this.physics.add.collider(this.EGroups.BEGroup, TopWallsLayer)
        this.physics.add.collider(this.EGroups.REGroup, BottomWallsLayer)
        this.physics.add.collider(this.EGroups.REGroup, TopWallsLayer)
        this.physics.add.collider(this.EGroups.bulletGroup, BottomWallsLayer, (bullet, wall) => {
            bullet.kill();
        });
        this.physics.add.collider(this.EGroups.bulletGroup, TopWallsLayer, (bullet, wall) => {
            bullet.kill();
        });
        //this.cameras.main.setBounds(0, 0, map.width, map.height);
        this.cameras.main.startFollow(this.p1, true, 0.1, 0.1);

        // Only call scene change exactly once on entrance
        this.inEntrance = false;
        this.physics.add.overlap(this.p1, entranceLayer, ()=> {
            if (!this.inEntrance) {
                this.inEntrance = true
                this.doorSFX.play();
                this.scene.start('door2Scene');
            }
        }, this.checkOverlap, this);
        
        // Set up keyboard controls for player
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Test that the walls actualy have collision
        // const debugGraphics = this.add.graphics().setAlpha(0.75);
        // wallsLayer.renderDebug(debugGraphics, {
        //     tileColor: null,    // color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),    // color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255)                // color of colliding face edges
        // });
        
        /*
        // Delete everything after this line, these are for testing
        // Keyboard controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.map = this.add.image(0, 0, 'protomap').setOrigin(0);
        this.map.setScale(3);
        this.map.setAlpha(0.5);

        // Add enemy groups
        this.EGroups = new EnemyGroups(this,'enemy1', 'enemy2', 'bullet');
        this.EGroups.addEnemyGroups();

        // Add player
        this.playertest = new Player(this, 30, 625, "idleAtlas", 'IdleDown_0001', false);
        this.playertest.setupCombat(true);
        
        this.physics.add.collider(this.playertest, this.walls)
        this.gameOver = false

        // Add enemy
        // Enemies are currently loaded in through coordinates, will use tilemap to load these in later
        this.EGroups.addBasicEnemy(500, 500, this.playertest, 200, 100);
        // this.EGroups.addBasicEnemy(520, 700, this.playertest, 200, 100);
        // this.EGroups.addBasicEnemy(1200, 700, this.playertest, 200, 100);
        // this.EGroups.addBasicEnemy(1000, 800, this.playertest, 200, 100);
        // this.EGroups.addBasicEnemy(1000, 1100, this.playertest, 200, 100);
        // this.EGroups.addRangedEnemy(1000, 300, 'enemy2', 0, this.playertest, 300, 150)
        // this.EGroups.addRangedEnemy(1000, 1200, 'enemy2', 0, this.playertest, 300, 150)

        // Add world bounds to physics
        this.physics.world.setBounds(0,0, this.map.width * this.map.scale, this.map.height* this.map.scale);
        this.playertest.body.setCollideWorldBounds(true);

        // Camera Test
        this.cameras.main.setBounds(0, 0, this.map.width * this.map.scale, this.map.height * this.map.scale);
        this.cameras.main.startFollow(this.playertest, true, 0.1, 0.1);

        this.demoText = this.add.text(400, 225, "Map is just an image. No wall collision yet\nWASD, Space, Shift").setScrollFactor(0);

        
        // this.darkness2 = this.physics.add.image(this.playertest.x, this.playertest.y, 'darkness').setScale(8.5);
        // this.darkness3 = this.physics.add.image(this.playertest.x, this.playertest.y, 'darkness').setScale(7);
        // this.darkness4 = this.physics.add.image(this.playertest.x, this.playertest.y, 'darkness').setScale(5.5);
        // this.darkness2.setAlpha(0.5);
        // this.darkness3.setAlpha(0.5);
        // this.darkness4.setAlpha(0.5);

        // this.darkness.x = this.playertest.x;
            // this.darkness.y = this.playertest.y;
            // this.darkness2.x = this.playertest.x;
            // this.darkness2.y = this.playertest.y;
            // this.darkness3.x = this.playertest.x;
            // this.darkness3.y = this.playertest.y;
            // this.darkness4.x = this.playertest.x;
            // this.darkness4.y = this.playertest.y;
        */
    }

    update() {
        if(!this.gameOver) {
            this.p1.update();
        }
        if(this.p1.health == 0 && !this.gameOver) {
            this.gameOver = true;
            this.p1.kill();
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'YOU DIED\nPress R to retry').setScrollFactor(0);
        }
        if(this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
                this.scene.start('door1Scene');
            }
        }
        
    }

    checkOverlap(p1, tile){
        if(tile.index == -1) return false;
        return true;
    }

    createEnemyAnims(beName, reName) {
        this.anims.create({
            key: beName + 'WalkUp',
            defaultTextureKey: 'be1_atlas',
            frames: [{ frame: 'WalkUp_0001' }],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: beName + 'WalkDown',

            frames: this.anims.generateFrameNames('be1_atlas', {
                prefix: 'WalkDown_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: beName + 'WalkLeft',

            frames: this.anims.generateFrameNames('be1_atlas', {
                prefix: 'WalkLeft_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });
        this.anims.create({
            key: beName + 'WalkRight',

            frames: this.anims.generateFrameNames('be1_atlas', {
                prefix: 'WalkRight_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });

        this.anims.create({
            key: reName + 'WalkUp',
            defaultTextureKey: 're1_atlas',
            frames: [{ frame: 'WalkUp_0001' }],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: reName + 'WalkDown',

            frames: this.anims.generateFrameNames('re1_atlas', {
                prefix: 'WalkDown_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });

        this.anims.create({
            key: reName + 'WalkLeft',

            frames: this.anims.generateFrameNames('re1_atlas', {
                prefix: 'WalkLeft_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });

        this.anims.create({
            key: reName + 'WalkRight',

            frames: this.anims.generateFrameNames('re1_atlas', {
                prefix: 'WalkRight_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: 0
        });
    }

    

}