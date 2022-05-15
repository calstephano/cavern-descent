class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load things that should be present for nearly every scene (i.e. The player)
        this.load.image('test', './assets/Square.png')
    }

    create() {
        // Add player animations here
        // this.anims.create({ ... });
        this.scene.start('titleScene')
    }
}