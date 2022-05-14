class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {
        this.load.image('test', './assets/Square.png')
    }

    create() {
    // Delete everything after this line, these are for testing
        // Keyboard controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // Raycaster Test
        this.raycaster = this.raycasterPlugin.createRaycaster({
            debug: {
                enabled: false, //enable debug mode
                maps: true, //enable maps debug
                rays: true, //enable rays debug
                graphics: {
                    ray: 0x00ff00, //debug ray color; set false to disable
                    rayPoint: 0xff00ff, //debug ray point color; set false to disable
                    mapPoint: 0x00ffff, //debug map point color; set false to disable
                    mapSegment: 0x0000ff, //debug map segment color; set false to disable
                    mapBoundingBox: 0xff0000 //debug map bounding box color; set false to disable
                }
            }
        });
        this.ray = this.raycaster.createRay();
        this.ray.setOrigin(400, 300);
        

        
        // Add player
        this.playertest = new Player(this, 100, 100, 'test');
        
        // Add enemy
        this.enemyTest = new BasicEnemy(this, 500, 500, 'test', 0, this.playertest, 200, 150);
        this.rangedEnemyTest = new RangedEnemy(this, 1000, 300, 'test', 0, this.playertest, 300, 150);

        // Bullet test
        this.bulletTest = new Bullet(this, 1000, 300, 'test', 100, Phaser.Math.Angle.Between(this.rangedEnemyTest.x, this.rangedEnemyTest.y, this.playertest.x, this.playertest.y));
        // Add world bounds to physics
        this.physics.world.setBounds(0,0, game.config.width, game.config.height);
        this.playertest.body.setCollideWorldBounds(true);

        // Camera Test
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.playertest, true, 0.1, 0.1);

        this.raycaster.mapGameObjects(this.enemyTest, true);
        this.raycaster.mapGameObjects(this.rangedEnemyTest, true);
        this.intersections = this.ray.castCircle();
    }

    update() {
        this.playertest.update();
        this.enemyTest.update();
        this.rangedEnemyTest.update();
        this.ray.setOrigin(this.playertest.x, this.playertest.y);
        this.intersections = this.ray.castCircle();
    }
}