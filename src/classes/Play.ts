import Phaser from 'phaser';
import Player from './Player';
import Actor from './Actor';
import Dialogue from './Dialogue';
import DialogueData from '../data/DialogueData';

export default class Play extends Phaser.Scene {
    player: Player;
    elder: Actor;
    dialoguesData: DialogueData[] = [];
    dialogueInstance: Dialogue;

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

        // Other create logic...
        this.load.on('complete', () => {
            const dialoguesData = this.cache.json.get('dialogues');
            this.dialoguesData = dialoguesData as DialogueData[];
            // Now you can use this.dialoguesData as needed
        });

        // Load dialogue data
        console.log('this.dialoguesData', this.dialoguesData);

        // Assuming you want to start the conversation with the first dialogue
        if (this.dialoguesData && this.dialoguesData.length > 0) {
            const firstDialogue = this.dialoguesData[0];
            this.dialogueInstance = new Dialogue(this, 0, 0);
            this.dialogueInstance.startConversation(firstDialogue.lines);
        }
    }

    update() {
        this.player.update();

        // Check if player is close enough to Elder to start dialogue
        const distanceToElder = Phaser.Math.Distance.BetweenPoints(this.player, this.elder);
        if (distanceToElder < 50) { // Example distance threshold
            this.elder.startDialogue(this.dialogueInstance);
            this.elder.update();
        }
    }

}
