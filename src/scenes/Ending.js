class Ending extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    create() {
        let textConfig = {
            fontFamily: 'FreePixel',
            fontSize: '32px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.skipText = this.add.text(game.config.width/2, game.config.height* 0.95, 'Press X to skip', textConfig).setOrigin(0.5);
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
            this.scene.start('creditsScene');
        })
    }

    update() {

    }

    nextFrame() {
        this.cutscene[this.frame++].setDepth(0);    // Set prev frame behind other frames
        // console.log(this.frame + '/' + (this.cutscene.length))
        if(this.frame >= this.cutscene.length) {
            let dark = this.add.image(0, -game.config.height, 'transition').setOrigin(0);
            dark.setDepth(1);
            let transitionTween = this.tweens.add({
                targets: dark,
                ease: 'Expo.easeIn',
                y: { from: -game.config.height, to: 0 }, 
                duration: 2000,
                onComplete: () => {
                    this.skipText.text = "You've found the treasure...\n...but at what cost?\nPress X to continue";
                    this.skipText.setAlpha(0);
                    this.skipText.x = game.config.width/2;
                    this.skipText.y = game.config.height/2;
                    let textTween = this.tweens.add({
                        targets: this.skipText,
                        ease: 'Sine.easeIn',
                        alpha: { from: 0, to: 1 },
                        duration: 4000
                    })
                }
            })
            
        } else {
            this.cutscene[this.frame].setDepth(1);      // Set new frame on top if there is one
        }
    }
}
