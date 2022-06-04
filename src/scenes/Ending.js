class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        this.skipText = this.add.text(10,game.config.height* 0.975, 'Press X to skip').setOrigin(0, 0.5);
        this.skipText.setDepth(2)
        this.cutscene = [];
        for (let i = 0; i < 4; i++) {
            this.cutscene[i] = this.add.image(0, 0, 'end' + (i+1)).setOrigin(0); // Using string concatenation to get key names
        }
        this.frame = 0;
        this.cutscene[this.frame].setDepth(1)

        // Progress cutscene
        let timer = this.time.addEvent({
            delay: 3000,
            callback: this.nextFrame,
            callbackScope: this,
            repeat: this.cutscene.length - 1
        });

        // Skip Cutscene button
        let keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyX.on('down', () => {
            this.scene.start('titleScene')
        })
    }

    update() {

    }

    nextFrame() {
        this.cutscene[this.frame++].setDepth(0);    // Set prev frame behind other frames
        // console.log(this.frame + '/' + (this.cutscene.length))
        if(this.frame >= this.cutscene.length) {
            this.skipText.text = "Press X to continue"
            this.skipText.setOrigin(0.5, 0.5);
            this.skipText.x = game.config.width/2
            this.skipText.y = game.config.height/2
            this.cutscene.forEach(element => {
                element.destroy();
            });
        } else {
            this.cutscene[this.frame].setDepth(1);      // Set new frame on top if there is one
        }
    }
}
