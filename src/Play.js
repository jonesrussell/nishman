import Phaser from 'phaser';
import Player from './classes/player';
import Actor from './classes/actor';

export default class Play extends Phaser.Scene {
    player;
    elder;

    preload() {
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/bg.csv');
        this.load.image('tiles', 'assets/tilemaps/tiles/seasonal_sample_autumn.png');

        this.load.spritesheet('player', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
        this.load.spritesheet('elder', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
    }

    create() {
        // When loading a CSV map, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        layer.skipCull = true;

        this.player = new Player(this, 100, 100);
        this.player.setScale(0.1);

        this.elder = new Actor(this, 650, 500, 'elder');
        this.elder.setScale(0.1);
    }

    update(time, delta) {
        this.player.update();

        // Check if player is close enough to Elder to start dialogue
        const distanceToElder = Phaser.Math.Distance.BetweenPoints(this.player, this.elder);
        console.log(distanceToElder);
        if (distanceToElder < 50) { // Example distance threshold
            this.elder.startDialogue();
        }
    }
}
