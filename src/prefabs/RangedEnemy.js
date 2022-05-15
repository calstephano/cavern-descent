class RangedEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, target, range, speed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);

        this.target = target;           // Generally, the player will be the target
        this.detectRange = range;       // Range set to prevent enemy from detecting player on the other side of map
        
        this.moveSpeed = speed;

        this.playerDetected = false;    // Enemies start with no vision of player
        this.scene = scene;

        // Currently hardcoded, change in the future
        this.attackRange = range * 1.5; // Attack range set higher to allow enemy to attack from a range
        this.escapeRange = range * 0.5;  // Range at which the enemy will try to escape

        this.attackDelay = 2000;
        this.attackCountdown = 2000;

        // Create anims
    }

    update(time, delta) {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.detectRange && !this.playerDetected) {
            this.playerDetected = true;
            console.log('!!!')
        }
        
        if (this.playerDetected) {
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.attackRange) {
                this.attackCountdown -= delta;
                if(this.attackCountdown <= 0) {
                    this.attackCountdown = this.attackDelay;
                    let angle = Phaser.Math.Angle.Between(this.x, this.y, this.target.x, this.target.y);
                    this.scene.EGroups.fireBullet(this.x, this.y, 400, angle);
                }
            }
            if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) >= this.detectRange) {
                this.approach();
            } else if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.escapeRange) {
                this.attackCountdown = this.attackDelay;
                this.flee();
            }
            else {
                this.setVelocity(0);
            }
        }
    }

    approach() {
        if(this.x < this.target.x - 5) {
            this.setVelocityX(this.moveSpeed);
        } else if (this.x > this.target.x + 5) {
            this.setVelocityX(-this.moveSpeed);
        } else {
            this.setVelocityX(0);
        }

        if(this.y < this.target.y) {
            this.setVelocityY(this.moveSpeed);
        } else if (this.y > this.target.y) {
            this.setVelocityY(-this.moveSpeed);
        } else {
            this.setVelocityY(0);
        }
    }

    flee() {
        if(this.x < this.target.x - 5) {
            this.setVelocityX(-this.moveSpeed/2);
        } else if (this.x > this.target.x + 5) {
            this.setVelocityX(this.moveSpeed/2);
        } else {
            this.setVelocityX(0);
        }

        if(this.y < this.target.y - 5) {
            this.setVelocityY(-this.moveSpeed/2);
        } else if (this.y > this.target.y + 5) {
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