import Autumn from './scenes/Autumn';
import TitleScreen from './scenes/TitleScreen';
import Phaser from 'phaser';
import DialogPlugin from './plugins/DialogPlugin';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

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
        ],
        scene: [
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ]
    },
    scene: [TitleScreen, Autumn]
};

const game = new Phaser.Game(config);

export default game;
