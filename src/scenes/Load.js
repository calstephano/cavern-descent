class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load things that should be present for nearly every scene (i.e. The player)
        this.load.path = './assets/';
        this.load.image('test', 'TempPlayer.png');
        this.load.audio('attack', 'tempPlayerAttack.wav')
        this.load.audio('hurt', 'tempPlayerHurt.wav');
        this.load.audio('dash', 'tempPlayerDash.wav')
    }

    create() {
        // Add player animations here
        // this.anims.create({ ... });
        this.scene.start('titleScene')
    }
}