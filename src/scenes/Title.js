class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(game.config.width/2,game.config.height/2, 'TITLE SCREEN (Name pending)\nPress SPACE to start');

        game.settings = {
            moveSpeed: 200,
            stamina: 40,
            sBarOffset: 20,
            hBarOffset: 30,
            staminaRegen: 0.5,
            attackSize: 40,
            health: 3
        };

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', () => {
            this.scene.start("level1Scene")
        })
    }

    update() {

    }
}
