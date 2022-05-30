class EnemyGroups {
    constructor(scene, basicEnemyTexture, rangedEnemyTexture, bulletTexture) {
        this.scene = scene;
        this.basicEnemyTexture = basicEnemyTexture;
        this.rangedEnemyTexture = rangedEnemyTexture;
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

    addBasicEnemy(x, y, target, range, speed, name){
        let be = new BasicEnemy(this.scene, x, y, this.basicEnemyTexture, 0, target, range, speed, name);
        this.BEGroup.add(be);
    }

    addRangedEnemy(x, y, target, range, speed, name){
        let re = new RangedEnemy(this.scene, x, y, this.rangedEnemyTexture, 0, target, range, speed, name);
        this.REGroup.add(re);
    }

    fireBullet(x, y, speed, angle)
    {
        let bullet = new Bullet(this.scene, x, y, this.bulletTexture, speed, angle);
        this.bulletGroup.add(bullet);
    }

    noneAlive() {
        if (!this.BEGroup.getLength() && !this.REGroup.getLength()) {
            return true;
        } else {
            return false;
        }
    }
    
}