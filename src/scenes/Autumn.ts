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
    private static readonly DIALOG_X_POSITION = 1280 / 2;
    private static readonly DIALOG_Y_POSITION = 720 / 2;
    private static readonly DIALOG_OPTIONS = ['Ahnii!', 'Aw-knee??'];

    constructor() {
        super({ key: 'Autumn' });
    }

    /**
     * preload method of the Play scene
     */
    preload() {
        this.load.tilemapCSV('mapBase', 'assets/tilemaps/level01_forest_Base.csv');
        this.load.tilemapCSV('mapEnv', 'assets/tilemaps/level01_forest_Env.csv');
        this.load.image('tiles', 'assets/tilemaps/Overworld.png');

        this.load.spritesheet('player', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('elder', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });

        this.load.json('dialogues', 'assets/data/dialogues.json');
    }

    /**
     * create method of the Play scene
     */
    create() {
        // When loading a CSV map, make sure to specify the tileWidth and tileHeight
        const mapBase = this.make.tilemap({ key: 'mapBase', tileWidth: 16, tileHeight: 16 });
        const tilesetBase = mapBase.addTilesetImage('tiles');
        const layerBase = mapBase.createLayer(0, tilesetBase, 0, 0);
        layerBase.skipCull = true;

        const mapEnv = this.make.tilemap({ key: 'mapEnv', tileWidth: 16, tileHeight: 16 });
        const tilesetEnv = mapEnv.addTilesetImage('tiles');
        const layerEnv = mapEnv.createLayer(0, tilesetEnv, 0, 0);
        layerEnv.setDepth(1); // Ensure it renders above the base layer

        this.player = new Player(this, 100, 650);
        this.player.setScale(Autumn.PLAYER_SCALE);
        this.player.setDepth(2);

        this.elder = new Actor(this, 950, 300, 'elder', null);
        this.elder.setScale(Autumn.ELDER_SCALE);
        this.elder.setDepth(2);

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

            this.talky.dialogCreator.dialog.setDepth(3);

            this.shouldOpenDialog = false; // Reset the flag
            this.dialogOpened = true; // Set the dialog opened flag to true

            // Re-enable input events when the dialog is closed
            this.talky.dialogCreator.dialog.on('destroy', () => {
                this.player.setInputEnabled(true);
            });
        }
    }

}
