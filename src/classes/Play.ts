import Phaser from 'phaser';
import Player from './Player';
import Actor from './Actor';
import Dialog from './Dialog';
import DialogPlugin from '../plugins/DialogPlugin';

export default class Play extends Phaser.Scene {
    player: Player;
    elder: Actor;
    talky: DialogPlugin;
    shouldOpenDialog: boolean = false; // Flag to track if the dialog should be opened
    dialogOpened: boolean = false; // Flag to track if the dialog has already been opened

    preload() {
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/bg.csv');
        this.load.image('tiles', 'assets/tilemaps/tiles/seasonal_sample_autumn.png');

        this.load.spritesheet('player', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('elder', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });

        this.load.json('dialogues', 'src/data/dialogues.json');
    }

    create() {
        // When loading a CSV map, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('tiles');
        if (tileset) {
            const layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
            if (layer) {
                layer.skipCull = true;
            }
        } else {
            console.error('Tileset not found');
        }

        this.player = new Player(this, 100, 100);
        this.player.setScale(0.1);

        this.elder = new Actor(this, 650, 500, 'elder', null);
        this.elder.setScale(0.1);

        this.talky = this.plugins.get('talky') as DialogPlugin;
        this.talky.loadDialogData(this.cache.json.get('dialogues'));

        /** Dialog */
        // const dialog = new Dialog(this);
        // dialog.createDialog(400, 300, 'Fella', 'Do you want to build a snow man?', ['Yes', 'No']);
    }

    update() {
        this.player.update();

        // Check if player is close enough to Elder to start dialogue
        const distanceToElder = Phaser.Math.Distance.BetweenPoints(this.player, this.elder);
        if (distanceToElder < 50 && !this.dialogOpened) { // Check distance and dialog state
            this.elder.update();
            this.shouldOpenDialog = true; // Set the flag to true
        }

        // Check if the flag is true and open the dialog
        if (this.shouldOpenDialog && !this.dialogOpened) {
            const dialog = new Dialog(this);
            dialog.createDialog(400, 300, 'Fella', 'Do you want to build a snow man?', ['Yes', 'No']);
            this.shouldOpenDialog = false; // Reset the flag
            this.dialogOpened = true; // Set the dialog opened flag to true
        }
    }

}
