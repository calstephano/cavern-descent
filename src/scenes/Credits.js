class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('credits', './assets/Credit_Scene.png')
    }

    create() {
        this.add.image(0, 0, 'credits').setOrigin(0)
        let keyBack = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyBack.on('down', () => {
            this.scene.start("titleScene")
        })
    }

    update() {

    }
}