class RangedEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, target, range, speed, name) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);
        this.name = name;
        this.target = target;           // Generally, the player will be the target
        this.approachLimit = range;       // Range set to prevent enemy from detecting player on the other side of map
        this.attackRange = range * 1.5; // Attack range set higher to allow enemy to attack from a range
        this.escapeRange = range * 0.75;  // Range at which the enemy will try to escape
        this.name = name;
        this.moveSpeed = speed;

        this.playerDetected = false;    // Enemies start with no vision of player
        this.scene = scene;

        // Currently hardcoded, change in the future
        

        this.attackDelay = 2000;
        this.attackCountdown = 2000;
    }

    update(time, delta) {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.attackRange && !this.playerDetected) {
            this.playerDetected = true;
            console.log('!!!')
        }
        
        if (this.playerDetected) {
            this.attackCountdown -= delta;
            if(this.attackCountdown <= 0) {
                this.attackCountdown = this.attackDelay;
                let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                this.scene.EGroups.fireBullet(this.x, this.y, 350, angle);
            }
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= this.approachLimit) {
                this.approach();
            } else if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.escapeRange) {
                this.flee();
            }
            else {
                this.setVelocity(0);
            }
        }
    }

    approach() {
        if(this.x < this.target.x - 15) {
            this.setVelocityX(this.moveSpeed);
            // Play walk right anim
            this.play(this.name + 'WalkRight', true)
        } else if (this.x > this.target.x + 5) {
            this.setVelocityX(-this.moveSpeed);
            // Play walk left anim
            this.play(this.name + 'WalkLeft', true)
        } else {
            this.setVelocityX(0);
        }

        if(this.y < this.target.y - 15) {
            // Play walk down anim
            this.play(this.name + 'WalkDown', true)
            this.setVelocityY(this.moveSpeed);
        } else if (this.y > this.target.y) {
            // Play walk up anim
            this.play(this.name + 'WalkUp', true)
            this.setVelocityY(-this.moveSpeed);
        } else {
            this.setVelocityY(0);
        }
    }

    flee() {
        if(this.x < this.target.x - 5) {
            // Play walk right anim but walk left (backing away)
            this.play(this.name + 'WalkRight', true)
            this.setVelocityX(-this.moveSpeed/2);
        } else if (this.x > this.target.x + 5) {
            // Play walk left anim but walk right (backing away)
            this.play(this.name + 'WalkLeft', true)
            this.setVelocityX(this.moveSpeed/2);
        } else {
            this.setVelocityX(0);
        }

        if(this.y < this.target.y - 5) {
            // Play walk down anim but walk up (backing away)
            this.play(this.name + 'WalkDown', true)
            this.setVelocityY(-this.moveSpeed/2);
        } else if (this.y > this.target.y + 5) {
            // Play walk up anim but walk down (backing away)
            this.play(this.name + 'WalkUp', true)
            this.setVelocityY(this.moveSpeed/2);
        } else {
            this.setVelocityY(0);
        }
    }

    kill() {
        // When die anim finishes,
        this.destroy();
    }
}