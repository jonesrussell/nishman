import Autumn from './scenes/Autumn';
import TitleScreen from './scenes/TitleScreen';
import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import DialogManager from './plugins/DialogManager/DialogManager';

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const BACKGROUND_COLOR = '#192a56';
const PIXEL_ART = true;
const SCALE_MODE = Phaser.Scale.FIT;
const AUTO_CENTER = Phaser.Scale.CENTER_BOTH;
const DEFAULT_PHYSICS = 'arcade';
const DEBUG_PHYSICS = true;

const config = {
    title: 'Anishinaabe',
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    backgroundColor: BACKGROUND_COLOR,
    pixelArt: PIXEL_ART,
    scale: {
        mode: SCALE_MODE,
        autoCenter: AUTO_CENTER
    },
    physics: {
        default: DEFAULT_PHYSICS,
        arcade: {
            debug: DEBUG_PHYSICS
        }
    },
    plugins: {
        scene: [
            {
                key: 'rexUI',
                plugin: RexUIPlugin,
                mapping: 'rexUI'
            }
        ],
        global: [
            {
                key: 'talky',
                plugin: DialogManager,
                start: false
                // mapping: memberName  // member name in each scene instance, optional
                // data: undefined
            }
        ]
    },
    scene: [TitleScreen, Autumn]
};

const game = new Phaser.Game(config);

export default game;
