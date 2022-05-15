class EnemyGroups {
    constructor(scene, bulletTexture) {
        this.scene = scene;
        this.bulletTexture = bulletTexture;
    }

    addBasicEnemyGroup() {
        this.BEGroup = this.scene.add.group(null, {
            runChildUpdate: true
        });
        this.BEGroup.runChildUpdate = true;
    }

    addRangedEnemyGroup() {
        this.REGroup = this.scene.add.group(null, {
            runChildUpdate: true
        });
        
        this.bulletGroup = this.scene.add.group(null, {
            runChildUpdate: true
        });
    }

    addEnemyGroups() {
        this.addBasicEnemyGroup();
        this.addRangedEnemyGroup();
    }

    addBasicEnemy(x, y, texture, frame, target, range, speed){
        let be = new BasicEnemy(this.scene, x, y, texture, frame, target, range, speed);
        this.BEGroup.add(be);
    }

    addRangedEnemy(x, y, texture, frame, target, range, speed){
        let re = new RangedEnemy(this.scene, x, y, texture, frame, target, range, speed);
        this.REGroup.add(re);
    }

    fireBullet(x, y, speed, angle)
    {
        let bullet = new Bullet(this.scene, x, y, this.bulletTexture, speed, angle);
        this.bulletGroup.add(bullet);
    }

    update() {
        //console.log(this.BEGroup.getChildren().length)
    }
}