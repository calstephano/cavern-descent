class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);
        this.body.setSize(this.width, this.height/2);
        this.body.setOffset(0, this.height/3)

        this.moveSpeed = game.settings.moveSpeed; // Assign move speed
        this.direction = 'down';                  // Store the direction after walking

        this.health = game.settings.health;
        this.maxHealth = game.settings.health;
        this.movementLock = false;

        this.weaponUse = true;

        // Create hitbox for sword
        this.hitbox = scene.add.rectangle(0, 0, game.settings.attackSize, game.settings.attackSize).setStrokeStyle(1, 0xFFFF00);
        this.hitbox = scene.physics.add.existing(this.hitbox, 0)
        
        // Sound Effects
        this.attackSFX = scene.sound.add('attack');
        this.hurtSFX = scene.sound.add('hurt');
        this.dashSFX = scene.sound.add('dash');

        // Add dash cooldown visualized by bar
        this.dashBar = scene.add.rectangle(this.x - game.settings.stamina/2, this.y - game.settings.sBarOffset, game.settings.stamina, 3, 0x00FF00).setOrigin(0, 0.5);
        // Visualize heath via bar (probably temporary)
        this.healthBar = scene.add.rectangle(this.x - game.settings.stamina/2, this.y - game.settings.hBarOffset, game.settings.stamina, 3, 0xFF0000).setOrigin(0,0.5);
        // Bind keys
        this.keySHIFT = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keySPACE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Debug Key
        let keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        keyK.on('down', (key, event) => {
            if(this.weaponUse) this.disableWeapon();
            else this.enableWeapon();
        });
        // Player anims should be created in Load.js

    }

    update() {

        if(!this.movementLock) {
            this.setVelocity(this.getAxisH() * this.moveSpeed, this.getAxisV() * this.moveSpeed)
            this.getDirection();
            // Determine direction and play anims based on that
            if( this.getAxisH() || this.getAxisV() ) {
                if (this.direction == 'left') {
                    // Play left walk anim
                    this.play('walkLeft', true);
                } else if (this.direction == 'right') {
                    // Play right walk anim
                    this.play('walkRight', true);
                } else if (this.direction == 'up') {
                    // Play up walk anim
                    this.play('walkUp', true);
                } else {
                    // Play down walk anim
                    this.play('walkDown', true);
                }
            } else {
                if (this.direction == 'left') {
                    // Play left idle anim
                    this.play('idleLeft', true);
                } else if (this.direction == 'right') {
                    // Play right idle anim
                    this.play('idleRight', true);
                } else if (this.direction == 'up') {
                    // Play up idle anim
                    this.play('idleUp', true);
                } else {
                    // Play down idle anim
                    this.play('idleDown', true);
                }
            }
            // console.log(this.x + ', ' + this.y + ' Box: ' + this.hitbox.x + ', ' + this.hitbox.y)
        }

        if( this.getAxisH() || this.getAxisV() ) {
            this.hitbox.x = this.x + game.settings.hitboxOffset * this.getAxisH()
            this.hitbox.y = this.y + game.settings.hitboxOffset * this.getAxisV()
        }
        // Update dash bar
        this.dashBar.x = this.x - game.settings.stamina/2;
        this.dashBar.y = this.y - game.settings.sBarOffset;
        this.healthBar.x = this.x - game.settings.stamina/2;
        this.healthBar.y = this.y - game.settings.hBarOffset;
        if(this.dashBar.width < game.settings.stamina) {
            this.dashBar.width += game.settings.staminaRegen;
        }

        this.on('animationcomplete', () => {
            //console.log('Done')
            this.movementLock = false;
            this.weaponActive = false;
        })
    }


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

    getDirection(){
        if(this.getAxisV() == 1) this.direction = 'down'
        if(this.getAxisV() == -1) this.direction = 'up'
        if(this.getAxisH() == -1) this.direction = 'left'
        if(this.getAxisH() == 1) this.direction = 'right'
    }

    checkHitbox(hitbox, enemy) {
        //console.log(enemy);
        // Kill enemy if weapon is active
        if(this.weaponActive) {
            enemy.kill();
        }
    }

    enemyCollide(player, enemy){
        if(this.weaponActive) {
            enemy.kill();
        }
        else {
            if(player.health > 0) player.health -= 1;
            this.updateHealth();
            enemy.kill();
            let angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
            // Use angle to determine knockback
            let vX = 3000 * Math.cos(angle);
            let vY = 3000 * Math.sin(angle);
            player.setVelocity(vX, vY);
        }
    }

    bulletCollide(player, bullet){
        if(player.health > 0) player.health -= 1;
        this.updateHealth();
        bullet.kill()
        let angle = Phaser.Math.Angle.Between(bullet.x, bullet.y, player.x, player.y);
        // Use angle to determine knockback
        let vX = 3000 * Math.cos(angle);
        let vY = 3000 * Math.sin(angle);
        player.setVelocity(vX, vY);
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

    updateHealth(){
        this.hurtSFX.play();
        this.healthBar.width = game.settings.stamina * (this.health / this.maxHealth);
    }

    // Use when Game over/player HP reaches 0
    kill() {
        this.hitbox.destroy();
        this.dashBar.destroy();
        this.healthBar.destroy();
        this.keySHIFT.enabled = false;
        this.keySPACE.enabled = false;
        this.destroy();
    }

    setupEnemies() {
        // Attack event handling
        scene.physics.add.overlap(this.hitbox, scene.EGroups.BEGroup, this.checkHitbox, null, this);
        scene.physics.add.overlap(this.hitbox, scene.EGroups.REGroup, this.checkHitbox, null, this);
        scene.physics.add.overlap(this.hitbox, scene.EGroups.bulletGroup, this.checkHitbox, null, this);
        scene.physics.add.collider(this, scene.EGroups.BEGroup, this.enemyCollide, null, this);
        scene.physics.add.collider(this, scene.EGroups.REGroup, this.enemyCollide, null, this);
        scene.physics.add.collider(this, scene.EGroups.bulletGroup, this.bulletCollide, null, this);

        // Dash attack
        this.keySHIFT.on('down', (key, event) => {
            console.log('Shift pressed!');
            // Use movementLock when there is an animation or more conditions to stop the dash
            if( (this.getAxisH() || this.getAxisV()) && this.dashBar.width >= 40 ){
                this.dashBar.width = 0;
                this.movementLock = true;
                this.setVelocity(this.getAxisH() * this.moveSpeed * 3, this.getAxisV() * this.moveSpeed * 3)
                if(this.weaponUse) { // If false, the dash is just mobility
                    console.log(this.direction);
                    this.weaponActive = true;
                    if (this.direction == 'left') {
                        this.play('dashAttackLeft')
                    } else if (this.direction == 'right') {
                        this.play('dashAttackRight')
                    } else if (this.direction == 'up') {
                        this.play('dashAttackUp')
                    } else {
                        this.play('dashAttackDown')
                    }
                    this.dashSFX.play();
                    // Kill enemies that got hit by dash
                }
            }
        })

        // Normal atttack
        this.keySPACE.on('down', (key, event) => {
            console.log('Space pressed!');
            if(this.weaponUse) {
                this.movementLock = true;
                this.setVelocity(0);
                this.weaponActive = true;
                this.attackSFX.play();
                if (this.direction == 'left') {
                    this.play('attackLeft')
                } else if (this.direction == 'right') {
                    this.play('attackRight')
                } else if (this.direction == 'up') {
                    this.play('attackUp')
                } else {
                    this.play('attackDown')
                }
                scene.EGroups.BEGroup.getChildren().forEach(enemy => {})
                //this.checkHitbox(within);
            }
        });
    }
}