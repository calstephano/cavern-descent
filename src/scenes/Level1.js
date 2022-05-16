class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {
        //this.load.image('protomap', './assets/Concept_Map.png');
        this.load.image('tile', './assets/dungeontile.png');
        this.load.tilemapTiledJSON('tilemap', './assets/map.json')
    }

    create() {
    // Delete everything after this line, these are for testing
        // Keyboard controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        // Map test
        this.map = this.make.tilemap({key: 'tilemap'});
        this.tileset = this.map.addTilesetImage('dungeontile', 'tile')
        this.map.createLayer('ground', this.tileset);
        this.walls = this.map.createLayer('wall', this.tileset);
        this.walls.setCollisionByProperty({ collides: true});
        
        //this.map = this.add.image(0, 0, 'protomap').setOrigin(0);
        //this.map.setScale(2);
        //this.map.setAlpha(0.5);

        // Raycaster Test
        // this.raycaster = this.raycasterPlugin.createRaycaster({
        //     debug: {
        //         enabled: false, //enable debug mode
        //         maps: true, //enable maps debug
        //         rays: true, //enable rays debug
        //         graphics: {
        //             ray: 0x00ff00, //debug ray color; set false to disable
        //             rayPoint: 0xff00ff, //debug ray point color; set false to disable
        //             mapPoint: 0x00ffff, //debug map point color; set false to disable
        //             mapSegment: 0x0000ff, //debug map segment color; set false to disable
        //             mapBoundingBox: 0xff0000 //debug map bounding box color; set false to disable
        //         }
        //     }
        // });
        // this.ray = this.raycaster.createRay();
        // this.ray.setOrigin(400, 300);
        
        // this.raycaster.mapGameObjects(this.enemyTest, true);
        // this.raycaster.mapGameObjects(this.rangedEnemyTest, true);
        // this.intersections = this.ray.castCircle();
        
        
        
        // Add enemy groups
        this.EGroups = new EnemyGroups(this, 'test');
        this.EGroups.addEnemyGroups();


        // Add player
        this.playertest = new Player(this, 700, 400, 'test');
        this.physics.add.collider(this.playertest, this.walls)
        this.gameOver = false

        // Add enemy
        // this.EGroups.addBasicEnemy(500, 500, 'test', 0, this.playertest, 200, 150);
        // this.EGroups.addRangedEnemy(1000, 300, 'test', 0, this.playertest, 300, 150)
        //this.enemyTest = new BasicEnemy(this, 500, 500, 'test', 0, this.playertest, 200, 150);
        //this.rangedEnemyTest = new RangedEnemy(this, 1000, 300, 'test', 0, this.playertest, 300, 150);

        // Bullet test
        //this.bulletTest = new Bullet(this, 1000, 300, 'test', 100, Phaser.Math.Angle.Between(this.rangedEnemyTest.x, this.rangedEnemyTest.y, this.playertest.x, this.playertest.y));
        
        // Add world bounds to physics
        this.physics.world.setBounds(624,352, 352, 240);
        this.playertest.body.setCollideWorldBounds(true);

        // Camera Test
        this.cameras.main.setBounds(624,352, 352, 240);
        this.cameras.main.setZoom(4);
        //this.cameras.main.startFollow(this.playertest, true, 0.1, 0.1);
        console.log(this.map.width)
    }

    update() {
        if(!this.gameOver) {
            this.playertest.update();
        }
        if(this.playertest.health == 0 && !this.gameOver) {
            this.gameOver = true;
            this.playertest.kill();
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'YOU DIED\nPress R to return').setScrollFactor(0);
        }
        if(this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.start('titleScene');
            }
        }
        
    }
}