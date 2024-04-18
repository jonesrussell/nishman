import Play from './classes/Play';
import Phaser from 'phaser';
import DialogPlugin from './plugins/DialogPlugin';

const config = {
    title: 'Nishman Game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#192a56',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    plugins: {
        global: [
            {
                key: 'talky',
                plugin: DialogPlugin,
                start: false
                // mapping: memberName  // member name in each scene instance, optional
                // data: undefined
            }
        ]
    },
    scene: Play
};

const game = new Phaser.Game(config);

export default game;