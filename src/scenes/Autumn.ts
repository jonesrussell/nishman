import Phaser from 'phaser';
import Player from '../classes/Player';
import Actor from '../classes/Actor';
import DialogManager from '../plugins/DialogManager/DialogManager';

export default class Autumn extends Phaser.Scene {
    player: Player;
    elder: Actor;
    talky: DialogManager;
    shouldOpenDialog: boolean = false; // Flag to track if the dialog should be opened
    dialogOpened: boolean = false; // Flag to track if the dialog has already been opened

    private static readonly DISTANCE_TO_OPEN_DIALOG = 50;
    private static readonly PLAYER_SCALE = 0.1;
    private static readonly ELDER_SCALE = 0.1;
    private static readonly DIALOG_X_POSITION = 400;
    private static readonly DIALOG_Y_POSITION = 300;
    private static readonly DIALOG_OPTIONS = ['Good', 'Bad'];

    constructor() {
        super({ key: 'Autumn' });
    }

    /**
     * preload method of the Play scene
     */
    preload() {
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/bg.csv');
        this.load.image('tiles', 'assets/tilemaps/tiles/seasonal_sample_autumn.png');

        this.load.spritesheet('player', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('elder', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });

        this.load.json('dialogues', 'assets/data/dialogues.json');
    }

    /**
     * create method of the Play scene
     */
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
        this.player.setScale(Autumn.PLAYER_SCALE);

        this.elder = new Actor(this, 650, 500, 'elder', null);
        this.elder.setScale(Autumn.ELDER_SCALE);

        this.talky = this.plugins.get('talky') as DialogManager;
        this.talky.setScene(this, this.sys.rexUI);
        this.talky.dialogData.loadDialogData(this.cache.json.get('dialogues'));
    }

    update() {
        /**
         * Update method of the Play scene
         */
        this.player.update();

        // Check if player is close enough to Elder to start dialogue
        const distanceToElder = Phaser.Math.Distance.BetweenPoints(this.player, this.elder);
        if (distanceToElder < Autumn.DISTANCE_TO_OPEN_DIALOG && !this.dialogOpened) {
            this.elder.update();
            this.shouldOpenDialog = true;
        }

        // Check if the flag is true and open the dialog
        if (this.shouldOpenDialog && !this.dialogOpened) {
            // Assuming talky.getDialogue(key) returns the dialogue data
            const dialogData = this.talky.dialogData.getDialogueById(1);

            // Disable touch events while the dialog is open
            this.player.setInputEnabled(false);

            // Then use dialogData to create the dialog
            this.talky.dialogCreator.createDialog(
                Autumn.DIALOG_X_POSITION,
                Autumn.DIALOG_Y_POSITION,
                dialogData.speaker,
                this.talky.dialogData.processText(dialogData.text),
                Autumn.DIALOG_OPTIONS,
            );
            this.shouldOpenDialog = false; // Reset the flag
            this.dialogOpened = true; // Set the dialog opened flag to true

            // Re-enable input events when the dialog is closed
            this.talky.dialogCreator.dialog.on('destroy', () => {
                this.player.setInputEnabled(true);
            });
        }
    }

}
