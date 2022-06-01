class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(game.config.width/2,game.config.height/2, 'TITLE SCREEN (Name pending)\nPress SPACE to start');

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

        let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', () => {
            this.scene.start("door1Scene")
        })
    }

    update() {

    }
}
