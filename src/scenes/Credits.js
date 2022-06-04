class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        // Add Credits image
    }

    create() {

        let keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keySPACE.on('down', () => {
            this.scene.start("TitleScene")
        })
    }

    update() {

    }
}