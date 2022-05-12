class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.moveSpeed = game.settings.moveSpeed; // Assign move speed
        this.direction = 'down';                  // Store the direction after walking

        this.movementLock = false;

        this.weaponUse = true;

        // Create hitbox for sword
        this.hitbox = scene.add.rectangle(0, 0, 20, 20).setStrokeStyle(1, 0xFFFF00);
        
        // Add dash cooldown visualized by bar
        this.dashBar = scene.add.rectangle(this.x - game.settings.stamina/2, this.y - game.settings.staminaYPos, game.settings.stamina, 3, 0x00FF00).setOrigin(0, 0.5);

        // Bind keys
        let keySHIFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Debug Key
        let keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        // Attack event handling

        keySHIFT.on('down', (key, event) => {
            console.log('Shift pressed!');
            // Use movementLock when there is an animation or more conditions to stop the dash
            //this.movementLock = true;
            if( (this.getAxisH() || this.getAxisV()) && this.dashBar.width >= 40 ){
                this.dashBar.width = 0;
                this.setVelocity(this.getAxisH() * this.moveSpeed * 30, this.getAxisV() * this.moveSpeed * 30)
                if(this.weaponUse) { // If false, the dash is just mobility
                    console.log('KILL DASH');
                    // Kill enemies that got hit by dash
                }
            }
        })

        keySPACE.on('down', (key, event) => {
            console.log('Space pressed!');
            if(this.weaponUse) {
                let hitboxX = this.hitbox.x - this.hitbox.width/2;
                let hitboxY = this.hitbox.y - this.hitbox.height/2;
                //console.log(' Corner: ' + hitboxX + ', ' + hitboxY)
                let within = scene.physics.overlapRect(hitboxX, hitboxY, this.hitbox.width, this.hitbox.height);
                this.checkHitbox(within);
            }
        });

        keyK.on('down', (key, event) => {
            if(this.weaponUse) this.disableWeapon();
            else this.enableWeapon();
        });
        // Create animations

    }

    update() {

        if(!this.movementLock) {
            this.setVelocity(this.getAxisH() * this.moveSpeed, this.getAxisV() * this.moveSpeed)
            if( this.getAxisH() || this.getAxisV() ) {
                this.hitbox.x = this.x + 30 * this.getAxisH()
                this.hitbox.y = this.y + 30 * this.getAxisV()
            }
            // console.log(this.x + ', ' + this.y + ' Box: ' + this.hitbox.x + ', ' + this.hitbox.y)
        }
        // Update dash bar
        this.dashBar.x = this.x - game.settings.stamina/2;
        this.dashBar.y = this.y - game.settings.staminaYPos;
        if(this.dashBar.width < game.settings.stamina) {
            this.dashBar.width += game.settings.staminaRegen;
        }
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

    checkHitbox(within) {
        console.log('ATTACK: ' + within.length + ' in hitbox!')
        // For every enemy in Hitbox:
            // Kill enemy
    }

    // For clarity and use outside of class
    enableWeapon() {
        console.log('Weapons enabled!')
        this.weaponUse = true;
    }

    // For clarity and use outside of class
    disableWeapon() {
        console.log('Weapons disabled!')
        this.weaponUse = false;
    }
}