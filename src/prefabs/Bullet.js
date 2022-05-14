class Bullet extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture, speed, angle) {
        super(scene, x, y, texture);
        scene.add.existing(this).setOrigin(0.5);
        scene.physics.add.existing(this);

        let velocityX = speed * Math.cos(angle);
        let velocityY = speed * Math.sin(angle);

        this.setVelocity(velocityX, velocityY);
        this.rotation = angle;
    }
}