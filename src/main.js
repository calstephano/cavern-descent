let config = {
    type: Phaser.CANVAS,
    width: 1600,
    height: 900,
    autoCenter: true,
    scene: [ Title ],
    fps: {
        target: 60,
        forceSetTimeOut: true
    },
}

let game = new Phaser.Game(config);
// Reserve key names
let keyW, keyA, keyS, keyD, keySPACE;