class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        
    }

    create() {
        this.add.text(game.config.width/2,game.config.height/2, 'Two of our artists are dealing with COVID D:.\nIf you see this message. We\'re still working on the ending.\nPress SPACE to return to the title screen');

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
            this.scene.start("titleScene")
        })
    }

    update() {

    }
}
