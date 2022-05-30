class BasicEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, target, range, speed, name) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);

        this.target = target;   // Generally, the player will be the target
        this.detectRange = range;     // Range set to prevent enemy from detecting player on the other side of map
        this.moveSpeed = speed;
        this.name = name;
        this.playerDetected = false;    // Enemies start with no vision of player

        // Create anims
    }

    update() {
        if (Phaser.Math.Distance.Between(this.x, this.y, this.target.x, this.target.y) <= this.detectRange && !this.playerDetected) {
            this.playerDetected = true;
        }

        // Move the enemy towards the player if detected
        if (this.playerDetected) {
            if(this.y < this.target.y - 15) {
                // Play walk down anim
                this.play(this.name + 'WalkDown', true)
                this.setVelocityY(this.moveSpeed);
            } else if (this.y > this.target.y + 15) {
                // Play walk up anim
                this.play(this.name + 'WalkUp', true)
                this.setVelocityY(-this.moveSpeed);
            } else {
                this.setVelocityY(0);
            }
            
            if(this.x < this.target.x - 15) {
                this.setVelocityX(this.moveSpeed);
                // Play walk right anim
                this.play(this.name + 'WalkRight', true)
            } else if (this.x > this.target.x + 15) {
                this.setVelocityX(-this.moveSpeed);
                // Play walk left anim
                this.play(this.name + 'WalkLeft', true)
            } else {
                this.setVelocityX(0);
            }
        }
    }

    kill() {
        // When die anim finishes,
        this.destroy();
    }
}
