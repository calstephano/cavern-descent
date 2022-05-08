class Title extends Phaser.Scene {
    constructor() {
        super("TitleScene");
    }

    create() {
        this.add.text(game.config.width/2,game.config.height/2, 'Hello World!');
    }
}