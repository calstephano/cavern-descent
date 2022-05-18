class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load things that should be present for nearly every scene (i.e. The player)
        this.load.path = './assets/';
        this.load.image('test', 'TempPlayer.png');
        this.load.atlas('dashAttackAtlas', 'TempDashAttacks.png', 'DashAttackTemp.json');
        this.load.atlas('idleAtlas', 'IdleTemp.png', 'IdleTemp.json');
        this.load.audio('attack', 'tempPlayerAttack.wav')
        this.load.audio('hurt', 'tempPlayerHurt.wav');
        this.load.audio('dash', 'tempPlayerDash.wav')
    }

    create() {
        // Add player animations here
        // this.anims.create({ ... });

        this.anims.create({
            key: 'idleLeft',
            defaultTextureKey: 'idleAtlas',
            frames: [{ frame: 'IdleLeft' }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleRight',
            defaultTextureKey: 'idleAtlas',
            frames: [{ frame: 'IdleRight' }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            defaultTextureKey: 'idleAtlas',
            frames: [{ frame: 'IdleUp' }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            defaultTextureKey: 'idleAtlas',
            frames: [{ frame: 'IdleDown' }],
            frameRate: 10,
            repeat: -1
        });
        

        this.anims.create({
            key: 'dashAttackLeft',
            frames: this.anims.generateFrameNames('dashAttackAtlas', {
                prefix: 'DashAttackLeft_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'dashAttackRight',
            frames: this.anims.generateFrameNames('dashAttackAtlas', {
                prefix: 'DashAttackRight_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'dashAttackUp',
            frames: this.anims.generateFrameNames('dashAttackAtlas', {
                prefix: 'DashAttackUp_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 12,
            repeat: 0
        });

        this.anims.create({
            key: 'dashAttackDown',
            frames: this.anims.generateFrameNames('dashAttackAtlas', {
                prefix: 'DashAttackDown_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 12,
            repeat: 0
        });

        this.scene.start('titleScene')
    }
}