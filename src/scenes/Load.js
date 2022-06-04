class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // Load things that should be present for nearly every scene (i.e. The player)
        this.load.path = './assets/';
        this.load.atlas('dashAttackAtlas', 'DashAttack.png', 'DashAttack.json');
        this.load.atlas('idleAtlas', 'playerIdle.png', 'playerIdle.json');
        this.load.atlas('ArmedIdleAtlas', 'armedIdle.png', 'armedIdle.json');
        this.load.atlas('walkAtlas', 'playerWalk.png', 'playerWalk.json');
        this.load.atlas('armedWalkAtlas', 'armedWalk.png', 'armedWalk.json');
        this.load.atlas('attackAtlas', 'WideAttack.png', 'WideAttack.json');
        this.load.audio('attack', 'tempPlayerAttack.wav');
        this.load.audio('hurt', 'tempPlayerHurt.wav');
        this.load.audio('dash', 'tempPlayerDash.wav');
        this.load.audio('doorEnter', 'doorEnter.wav')
        this.load.audio('gameOver', 'gameOver.wav');
    }

    create() {
        // Idle anims
        this.anims.create({
            key: 'idleLeft',
            defaultTextureKey: 'idleAtlas',
            frames: this.anims.generateFrameNames('idleAtlas', {
                prefix: 'IdleLeft_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });
        this.anims.create({
            key: 'idleRight',
            defaultTextureKey: 'idleAtlas',
            frames: this.anims.generateFrameNames('idleAtlas', {
                prefix: 'IdleRight_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });
        this.anims.create({
            key: 'idleUp',
            defaultTextureKey: 'idleAtlas',
            frames: [{ frame: 'IdleBack' }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idleDown',
            defaultTextureKey: 'idleAtlas',
            frames: this.anims.generateFrameNames('idleAtlas', {
                prefix: 'IdleDown_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });

        // Armed Idle anims
        this.anims.create({
            key: 'AIdleLeft',
            defaultTextureKey: 'ArmedIdleAtlas',
            frames: this.anims.generateFrameNames('ArmedIdleAtlas', {
                prefix: 'IdleLeftSword_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });
        this.anims.create({
            key: 'AIdleRight',
            defaultTextureKey: 'ArmedIdleAtlas',
            frames: this.anims.generateFrameNames('ArmedIdleAtlas', {
                prefix: 'IdleRightSword_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });
        this.anims.create({
            key: 'AIdleUp',
            defaultTextureKey: 'ArmedIdleAtlas',
            frames: [{ frame: 'IdleUpSword_0001' }],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'AIdleDown',
            defaultTextureKey: 'ArmedIdleAtlas',
            frames: this.anims.generateFrameNames('ArmedIdleAtlas', {
                prefix: 'IdleDownSword_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 10,
            yoyo: true,
            repeatDelay: 3000,
            repeat: -1
        });
        
        // Walking anims
        this.anims.create({
            key: 'walkLeft',
            frames: this.anims.generateFrameNames('walkAtlas', {
                prefix: 'WalkingLeft_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'walkRight',
            frames: this.anims.generateFrameNames('walkAtlas', {
                prefix: 'WalkingRight_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'walkUp',
            frames: this.anims.generateFrameNames('walkAtlas', {
                prefix: 'WalkingUp_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'walkDown',
            frames: this.anims.generateFrameNames('walkAtlas', {
                prefix: 'WalkingDown_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        
        // Armed walk anims
        this.anims.create({
            key: 'AWalkLeft',
            frames: this.anims.generateFrameNames('armedWalkAtlas', {
                prefix: 'WalkingSwordLeft_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'AWalkRight',
            frames: this.anims.generateFrameNames('armedWalkAtlas', {
                prefix: 'WalkingSwordRight_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'AWalkUp',
            frames: this.anims.generateFrameNames('armedWalkAtlas', {
                prefix: 'WalkingSwordUp_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });
        this.anims.create({
            key: 'AWalkDown',
            frames: this.anims.generateFrameNames('armedWalkAtlas', {
                prefix: 'WalkingSwordDown_',
                start: 1,
                end: 8,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 24,
            repeat: 0
        });


        this.anims.create({
            key: 'attackLeft',
            frames: this.anims.generateFrameNames('attackAtlas', {
                prefix: 'WideAttackLeft_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 18,
            repeat: 0
        });
        this.anims.create({
            key: 'attackRight',
            frames: this.anims.generateFrameNames('attackAtlas', {
                prefix: 'WideAttackRight_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 18,
            repeat: 0
        });
        this.anims.create({
            key: 'attackUp',
            frames: this.anims.generateFrameNames('attackAtlas', {
                prefix: 'WideAttackUp_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 18,
            repeat: 0
        });
        this.anims.create({
            key: 'attackDown',
            frames: this.anims.generateFrameNames('attackAtlas', {
                prefix: 'WideAttackDown_',
                start: 1,
                end: 4,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 18,
            repeat: 0
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