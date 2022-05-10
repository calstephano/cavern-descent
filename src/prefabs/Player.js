class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.moveSpeed = game.settings.moveSpeed; // Assign move speed
        this.direction = 'down';                  // Store the direction after walking
        // Create animations

    }

    update() {
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
    }
}