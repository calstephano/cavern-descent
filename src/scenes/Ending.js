class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image('end1', './assets/end1.png')
        this.load.image('end2', './assets/end2.png')
        this.load.image('end3', './assets/end3.png')
        this.load.image('end4', './assets/end4.png')
        this.load.image('end5', './assets/end5.png')
        this.load.image('end6', './assets/end6.png')
        this.load.image('end7', './assets/end7.png')
        
    }

    create() {
        this.skipText = this.add.text(10,game.config.height* 0.975, 'Press X to skip').setOrigin(0, 0.5);
        this.skipText.setDepth(2)
        this.cutscene = [];
        for (let i = 0; i < 7; i++) {
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
        console.log(this.frame + '/' + (this.cutscene.length))
        if(this.frame >= this.cutscene.length) {
            this.skipText.text = "Press X to continue"
            this.cutscene.forEach(element => {
                element.destroy();
            });
        } else {
            this.cutscene[this.frame].setDepth(1);      // Set new frame on top if there is one
        }
    }
}
