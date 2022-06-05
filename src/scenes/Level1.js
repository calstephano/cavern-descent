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
        this.load.spritesheet('level1tiles', './assets/dirtTiles.png', {
            frameWidth: 64,
            frameHeight: 64,
            spacing: 0
        });
    }

    create() {
        // Music
        this.music = this.sound.add('level1Music');
        this.music.loop = true;
        this.music.play();

        // Tileset
        this.doorSFX = this.sound.add('doorEnter');
        this.gameOverSFX = this.sound.add('gameOver');
        const map = this.add.tilemap('level1_map');
        const tileset = map.addTilesetImage('dirtTiles', 'level1tiles');
        const groundLayer = map.createLayer('Ground', tileset);
        const entranceLayer = map.createLayer('Entrance', tileset);
        const TopWallsLayer = map.createLayer('TopWalls', tileset);
        let p1Spawn = map.findObject("Objects", obj => obj.name === "playerSpawn");

        let combatTip = map.findObject("Objects", obj => obj.name === "combat");
        this.add.image(combatTip.x, combatTip.y, 'combat').setAlpha(0.5)

        // Add enemy groups
        let beName = 'slime';
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
                this.music.stop();
                this.scene.start('door2Scene');
            }
        }, this.checkOverlap, this);
        
        // Set up keyboard controls for player
        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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
                this.scene.start('door1Scene');
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