class Level1 extends Phaser.Scene {
    constructor() {
        super("level1Scene");
    }

    preload() {
        this.load.image('protomap', './assets/Concept_Map.png');
        // Add enemy images/atlases here
        this.load.image('enemy1', './assets/tempEnemy1.png');
        this.load.image('enemy2', './assets/tempEnemy2.png');
        this.load.image('bullet', './assets/square.png');
    }

    create() {
    // Delete everything after this line, these are for testing
        // Keyboard controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.map = this.add.image(0, 0, 'protomap').setOrigin(0);
        this.map.setScale(2);
        this.map.setAlpha(0.5);

        // Add enemy groups
        this.EGroups = new EnemyGroups(this, 'bullet');
        this.EGroups.addEnemyGroups();

        // Add player
        this.playertest = new Player(this, 30, 625, 'test');
        this.physics.add.collider(this.playertest, this.walls)
        this.gameOver = false

        // Add enemy
        this.EGroups.addBasicEnemy(500, 500, 'enemy1', 0, this.playertest, 200, 100);
        this.EGroups.addBasicEnemy(520, 700, 'enemy1', 0, this.playertest, 200, 100);
        this.EGroups.addBasicEnemy(1200, 700, 'enemy1', 0, this.playertest, 200, 100);
        this.EGroups.addBasicEnemy(1000, 800, 'enemy1', 0, this.playertest, 200, 100);
        this.EGroups.addBasicEnemy(1000, 1100, 'enemy1', 0, this.playertest, 200, 100);
        this.EGroups.addRangedEnemy(1000, 300, 'enemy2', 0, this.playertest, 300, 150)
        this.EGroups.addRangedEnemy(1000, 1200, 'enemy2', 0, this.playertest, 300, 150)

        // Add world bounds to physics
        this.physics.world.setBounds(0,0, this.map.width * this.map.scale, this.map.height* this.map.scale);
        this.playertest.body.setCollideWorldBounds(true);

        // Camera Test
        this.cameras.main.setBounds(0, 0, this.map.width * this.map.scale, this.map.height * this.map.scale);
        this.cameras.main.setZoom(2);
        this.cameras.main.startFollow(this.playertest, true, 0.1, 0.1);

        this.demoText = this.add.text(400, 225, "Map is just an image. No wall collision yet\nWASD, Space, Shift").setScrollFactor(0);
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
        if(this.EGroups.noneAlive() && !this.gameOver) {
            this.gameOver = true;
            this.playertest.kill();
            this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'YOU WIN\nPress R to return').setScrollFactor(0);
        }
        if(this.gameOver){
            if (Phaser.Input.Keyboard.JustDown(keyR)) {
                this.scene.start('titleScene');
            }
        }
        
    }
}