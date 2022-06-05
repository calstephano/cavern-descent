class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        this.load.image('title', './assets/Title_Screen.png')
    }

    create() {
        this.add.image(0, 0, 'title').setOrigin(0);

        game.settings = {
            moveSpeed: 400,
            stamina: 40,
            sBarOffset: 90,
            hBarOffset: 100,
            staminaRegen: 0.5,
            attackSize: 100,
            hitboxOffset: 80,
            health: 3
        };

        let keyStart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyStart.on('down', () => {
            this.scene.start("introScene")
        })
        let keyCredits = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyCredits.on('down', () => {
            this.scene.start("creditsScene")
        })
    }

    update() {

    }
}
