class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.image('test', './assets/Square.png')
    }

    create() {
        this.scene.start('titleScene')
    }
}