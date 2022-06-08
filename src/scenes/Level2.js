class Level2 extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }

    preload() {
        // Add enemy images/atlases here
        this.load.atlas('be2_atlas', './assets/yetiCyclops.png', './assets/yetiCyclops.json');
        this.load.atlas('be2_dieAtlas', './assets/yetiCyclopsDie.png', './assets/yetiCyclopsDie.json');
        this.load.atlas('re2_atlas', './assets/iceCobra.png', './assets/iceCobra.json');
        this.load.atlas('re2_dieAtlas', './assets/iceCobraDie.png', './assets/iceCobraDie.json');
        this.load.image('snowball', './assets/snowball.png');

        // Tilemap
        this.load.tilemapTiledJSON('level2_map', './assets/level2.json');
        this.load.spritesheet('level2tiles', './assets/iceTiles.png', {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 1
        });
        // Sanity Check
        // this.load.image('tile2test', './assets/iceTiles.png')
    }

    create() {
        // Music
        this.music = this.sound.add('level2Music');
        this.music.loop = true;
        this.music.play();

        // Tileset
        this.doorSFX = this.sound.add('doorEnter');
        this.gameOverSFX = this.sound.add('gameOver');
        const map = this.add.tilemap('level2_map');
        const tileset = map.addTilesetImage('iceTiles', 'level2tiles');
        const groundLayer = map.createLayer('Ground', tileset);
        const entranceLayer = map.createLayer('Entrance', tileset);
        const TopWallsLayer = map.createLayer('TopWalls', tileset);
        let p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");


        // Add enemy groups
        let beName = 'yeti';
        let reName = 'iCobra';
        this.EGroups = new EnemyGroups(this, 'be2_atlas', 're2_atlas', 'snowball');
        this.EGroups.addEnemyGroups();
        this.createEnemyAnims(beName, reName);

        // get basic enemy object array from tilemap Objects layer
        let BasicEnemyObjects = map.filterObjects("Objects", obj => obj.name === "basicEnemy");
        // get enemy object array from tilemap Objects layer
        let RangedEnemyObjects = map.filterObjects("Objects", obj => obj.name === "rangedEnemy");

        // set up player
        this.gameOver = false;
        this.p1 = new Player(this, p1Spawn.x, p1Spawn.y, "idleAtlas", 'IdleDown_0001', true);
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
                this.music.stop();
                this.scene.start('door3Scene');
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
    }

    update() {
        if(!this.gameOver) {
            this.p1.update();
        }
        if(this.p1.health == 0 && !this.gameOver) {
            this.gameOver = true;
            this.gameOverSFX.play()
            this.p1.kill();
            let textConfig = {
                fontFamily: 'FreePixel',
                fontSize: '32px',
                color: '#FFFFFF',
                align: 'left',
                padding: {
                    top: 5,
                    bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'YOU DIED\nPress R to retry', textConfig).setScrollFactor(0);
        }
        if(this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(this.keyR)) {
                this.scene.start('door2Scene');
                this.music.stop();
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
            defaultTextureKey: 'be2_atlas',
            frames: [{ frame: 'WalkUp_0001' }],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: beName + 'WalkDown',

            frames: this.anims.generateFrameNames('be2_atlas', {
                prefix: 'WalkDown_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: beName + 'WalkLeft',

            frames: this.anims.generateFrameNames('be2_atlas', {
                prefix: 'WalkLeft_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: beName + 'WalkRight',

            frames: this.anims.generateFrameNames('be2_atlas', {
                prefix: 'WalkRight_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: beName + 'Die',

            frames: this.anims.generateFrameNames('be2_dieAtlas', {
                prefix: 'die_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 0
        });

        this.anims.create({
            key: reName + 'WalkUp',
            defaultTextureKey: 're2_atlas',
            frames: [{ frame: 'WalkUp_0001' }],
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: reName + 'WalkDown',

            frames: this.anims.generateFrameNames('re2_atlas', {
                prefix: 'WalkDown_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: reName + 'WalkLeft',

            frames: this.anims.generateFrameNames('re2_atlas', {
                prefix: 'WalkLeft_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: reName + 'WalkRight',

            frames: this.anims.generateFrameNames('re2_atlas', {
                prefix: 'WalkRight_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: reName + 'Die',

            frames: this.anims.generateFrameNames('re2_dieAtlas', {
                prefix: 'die_',
                start: 1,
                end: 2,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 8,
            repeat: 0
        });
    }

}