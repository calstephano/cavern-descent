class Title extends Phaser.Scene {
    constructor() {
        super("TitleScene");
    }

    preload() {
        this.load.image('test', './assets/Square.png')
    }

    create() {
        this.add.text(game.config.width/2,game.config.height/2, 'Hello World!');

        game.settings = {
            moveSpeed: 200,
            stamina: 40,
            staminaYPos: 20,
            staminaRegen: 0.5
        };

        // Delete everything after this line, these are for testing
        // Keyboard controls
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        

        // Add player
        this.playertest = new Player(this, 100, 100, 'test');

        // Add world bounds to physics
        this.physics.world.setBounds(0,0, game.config.width, game.config.height);
        this.playertest.body.setCollideWorldBounds(true);

        // Camera Test
        this.cameras.main.setBounds(0, 0, game.config.width, game.config.height);
        this.cameras.main.setZoom(1.5);
        this.cameras.main.startFollow(this.playertest, true, 0.1, 0.1);
    }

    update() {
        this.playertest.update();
    }
}