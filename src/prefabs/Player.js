class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, onIce) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0.5, 0.5);
        scene.physics.add.existing(this);
        
        // Hardcoded for future changes
        this.body.setSize(64,64);
        this.body.setOffset(this.width/2 - this.width/8, 120)

        this.scene = scene;
        this.setMaxVelocity(game.settings.moveSpeed);
        this.speed = game.settings.moveSpeed;   // Assign move speed
        this.direction = 'down';                  // Store the direction after walking
        this.combatEnabled = false;
        this.health = game.settings.health;
        this.maxHealth = game.settings.health;
        this.movementLock = false;
        this.onIce = onIce;
        this.weaponUse = false;
        this.lastAxisH = 0;
        this.lastAxisV = 0;

        // Sound Effects
        this.attackSFX = scene.sound.add('attack');
        this.hurtSFX = scene.sound.add('hurt');
        this.dashSFX = scene.sound.add('dash');

        
        // Bind keys
        this.keyX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

        // Debug Key
        // let keyK = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        // keyK.on('down', (key, event) => {
        //     if(this.weaponUse) this.disableWeapon();
        //     else this.enableWeapon();
        // });
    }

    update() {
        let axisH = this.getAxisH()
        let axisV = this.getAxisV()
        if(!this.movementLock) {
            if (this.onIce){
                this.setAcceleration(axisH * this.speed, axisV * this.speed);
            } else {
                this.setVelocity(axisH * this.speed, axisV * this.speed)
            }
            
            this.getDirection(axisH, axisV);
            this.getLastDirection(axisH, axisV);
            // Determine direction and play anims based on that
            if( axisH || axisV ) {
                if(this.onIce) {
                    this.setDrag(0);
                }
                if(this.weaponUse){
                    if (this.direction == 'left') {
                        // Play left walk anim
                        this.play('AWalkLeft', true);
                    } else if (this.direction == 'right') {
                        // Play right walk anim
                        this.play('AWalkRight', true);
                    } else if (this.direction == 'up') {
                        // Play up walk anim
                        this.play('AWalkUp', true);
                    } else {
                        // Play down walk anim
                        this.play('AWalkDown', true);
                    }
                } else {
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
                }
            } else {
                // Stop the player if not on ice
                if(this.onIce) {
                    this.setDrag(250);
                }
                if(this.weaponUse){
                    if (this.direction == 'left') {
                        // Play left walk anim
                        this.play('AIdleLeft', true);
                    } else if (this.direction == 'right') {
                        // Play right walk anim
                        this.play('AIdleRight', true);
                    } else if (this.direction == 'up') {
                        // Play up walk anim
                        this.play('AIdleUp', true);
                    } else {
                        // Play down walk anim
                        this.play('AIdleDown', true);
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
            }
            // console.log(this.x + ', ' + this.y + ' Box: ' + this.hitbox.x + ', ' + this.hitbox.y)
        } else if(this.movementLock) {
            if(!this.onIce && !this.dash) {
                this.setVelocity(0);
            }
        }

        
        // Update dash bar and hitbox position
        if(this.combatEnabled){
            this.dashBar.x = this.x - game.settings.stamina/2;
            this.dashBar.y = this.y - game.settings.sBarOffset;
            this.healthBar.x = this.x - game.settings.stamina/2;
            this.healthBar.y = this.y - game.settings.hBarOffset;
            if(this.dashBar.width < game.settings.stamina && !this.movementLock) {
                this.dashBar.width += game.settings.staminaRegen;
            }

            this.hitbox.x = this.x + game.settings.hitboxOffset * this.lastAxisH;
            this.hitbox.y = this.y + game.settings.hitboxOffset * this.lastAxisV;
        }
        this.on('animationcomplete', (anim, frame) => {
            //console.log('Done')
            
            if(anim.key == 'dashAttackLeft' || anim.key == 'dashAttackRight' || anim.key == 'dashAttackUp' || anim.key == 'dashAttackDown') {
                this.setMaxVelocity(game.settings.moveSpeed);
                this.dash = false;
                
            }
            this.movementLock = false;
            this.weaponActive = false;
        })
        
    }


    // Taking a page out of Unity's getAxisRaw methods for movement
    getAxisH() {
        if (keyLeft.isDown && keyRight.isDown){
            return 0;
        }
        else if (keyLeft.isDown) {
            return -1;
        } else if (keyRight.isDown) {
            return 1;
        }
        return 0;
    }

    getAxisV() {
        if (keyUp.isDown && keyDown.isDown){
            return 0;
        }
        else if (keyUp.isDown) {
            return -1;
        } else if (keyDown.isDown) {
            return 1;
        }
        return 0;
    }

    // For use in Walking/Idle/Attacks anims
    getDirection(axisH, axisV){
        if(axisV == 1) this.direction = 'down'
        if(axisV == -1) this.direction = 'up'
        if(axisH == -1) this.direction = 'left'
        if(axisH == 1) this.direction = 'right'
    }

    // For use in Hitbox positions
    getLastDirection(axisH, axisV){
        if (!axisH && axisV) {
            this.lastAxisH = 0;
            if(axisV == 1) this.lastAxisV = 1;
            if(axisV == -1) this.lastAxisV = -1;
        }
        if (axisH && !axisV) {
            this.lastAxisV = 0;
            if(axisH == -1) this.lastAxisH = -1;
            if(axisH == 1) this.lastAxisH = 1;
        }
        if(axisH && axisV) {
            if(axisV == 1) this.lastAxisV = 1;
            if(axisV == -1) this.lastAxisV = -1;
            if(axisH == -1) this.lastAxisH = -1;
            if(axisH == 1) this.lastAxisH = 1;
        }
        //console.log(this.lastAxisH + ', ' + this.lastAxisV)
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
        this.keyX.enabled = false;
        this.keyZ.enabled = false;
        this.destroy();
    }

    setupCombat(weaponEnabled) {
        this.combatEnabled = true;
        this.weaponUse = weaponEnabled;
        // Add dash cooldown visualized by bar
        this.dashBar = this.scene.add.rectangle(this.x - game.settings.stamina/2, this.y - game.settings.sBarOffset, game.settings.stamina, 3, 0x00FF00).setOrigin(0, 0.5);
        // Visualize heath via bar (probably temporary)
        this.healthBar = this.scene.add.rectangle(this.x - game.settings.stamina/2, this.y - game.settings.hBarOffset, game.settings.stamina, 3, 0xFF0000).setOrigin(0,0.5);
        
        // Create hitbox for sword
        this.hitbox = this.scene.add.rectangle(0, 0, game.settings.attackSize, game.settings.attackSize);
        this.hitbox = this.scene.physics.add.existing(this.hitbox, 0)

        // Attack event handling
        this.scene.physics.add.overlap(this.hitbox, this.scene.EGroups.BEGroup, this.checkHitbox, null, this);
        this.scene.physics.add.overlap(this.hitbox, this.scene.EGroups.REGroup, this.checkHitbox, null, this);
        this.scene.physics.add.overlap(this.hitbox, this.scene.EGroups.bulletGroup, this.checkHitbox, null, this);
        this.scene.physics.add.collider(this, this.scene.EGroups.BEGroup, this.enemyCollide, null, this);
        this.scene.physics.add.collider(this, this.scene.EGroups.REGroup, this.enemyCollide, null, this);
        this.scene.physics.add.collider(this, this.scene.EGroups.bulletGroup, this.bulletCollide, null, this);

        // Dash attack
        this.keyX.on('down', (key, event) => {
            console.log('X pressed!');
            // Use movementLock when there is an animation or more conditions to stop the dash
            if( (this.getAxisH() || this.getAxisV()) && this.dashBar.width >= 40 ){
                this.dash = true;
                this.setMaxVelocity(game.settings.moveSpeed * 2.25)
                this.dashBar.width = 0;
                this.movementLock = true;
                this.setVelocity(this.getAxisH() * this.speed * 3, this.getAxisV() * this.speed * 3)
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
        this.keyZ.on('down', (key, event) => {
            console.log('Z pressed!');
            if(this.weaponUse && !this.dash && this.dashBar.width > game.settings.stamina/3) {
                this.dashBar.width -= game.settings.stamina/3
                this.movementLock = true;
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
                this.scene.EGroups.BEGroup.getChildren().forEach(enemy => {})
                //this.checkHitbox(within);
            }
        });
    }
}