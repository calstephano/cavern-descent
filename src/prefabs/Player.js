class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.moveSpeed = game.settings.moveSpeed; // Assign move speed
        this.direction = 'down';                  // Store the direction after walking

        this.movementLock = false;

        // Bind keys
        let keySHIFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);

        // Attack event handling

        keySHIFT.on('down', (key, event) => {
            console.log('Shift pressed!');
            // Use movementLock when there is an animation
            //this.movementLock = true;
            if(this.getAxisH() || this.getAxisV()){
                this.setVelocity(this.getAxisH() * this.moveSpeed * 30, this.getAxisV() * this.moveSpeed * 30)
            }
        })

        // Create animations
    }

    update() {

        if(!this.movementLock) this.setVelocity(this.getAxisH() * this.moveSpeed, this.getAxisV() * this.moveSpeed)
        /*
        if (keyA.isDown) {
            // Play left walk anim
            this.setVelocity(-this.moveSpeed, 0);
            this.direction = 'left';
        } else if (keyD.isDown) {
            // Play right walk anim
            this.setVelocity(this.moveSpeed, 0);
            this.direction = 'right';
        } else if (keyW.isDown) {
            // Play up walk anim
            this.setVelocity(0, -this.moveSpeed);
            this.direction = 'up';
        } else if (keyS.isDown) {
            // Play down walk anim
            this.setVelocity(0, this.moveSpeed);
            this.direction = 'down';
        } else {
            this.setVelocity(0);
            if (this.direction == 'left') {
                // Play left idle anim
            } else if (this.direction == 'right') {
                // Play right idle anim
            } else if (this.direction == 'up') {
                // Play up idle anim
            } else {
                // Play down idle anim
            }
        }
        */
    }

    // dash() {
    //     console.log('Shift pressed!');
    //     if(this.getAxisH() && this.getAxisV()){
    //         this.setVelocity(this.getAxisH() * this.moveSpeed * 3, this.getAxisV() * this.moveSpeed * 3)
    //     }
    // }

    // Taking a page out of Unity's getAxisRaw methods for movement
    getAxisH() {
        if (keyA.isDown && keyD.isDown){
            return 0;
        }
        else if (keyA.isDown) {
            return -1;
        } else if (keyD.isDown) {
            return 1;
        }
        return 0;
    }

    getAxisV() {
        if (keyW.isDown && keyS.isDown){
            return 0;
        }
        else if (keyW.isDown) {
            return -1;
        } else if (keyS.isDown) {
            return 1;
        }
        return 0;
    }
}