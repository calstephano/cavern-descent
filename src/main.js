let config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 900,
    autoCenter: true,
    scene: [ Load, Title, Door1, Level1, Door2, Level2],
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
}

let game = new Phaser.Game(config);
// Reserve key names
let keyW, keyA, keyS, keyD, keySPACE, keyR;