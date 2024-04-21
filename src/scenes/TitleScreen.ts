// TitleScreen.ts
import Phaser from 'phaser';

export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScreen' });
  }

  preload() {
    // Load assets
    this.load.image('titleBackground', 'assets/scenes/aniishnabe.png');
    this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
  }

  create() {
    // Add background image
    this.add.image(400, 300, 'titleBackground').setScale(0.5);

    // Add title text
    const titleText = this.add.bitmapText(400, 200, 'arcade', 'Anishinaabe', 32);
    titleText.setOrigin(0.5);

    // Add start game button
    const startButton = this.add.bitmapText(400, 300, 'arcade', 'Start Game', 16);
    startButton.setOrigin(0.5);
    startButton.setInteractive();
    startButton.on('pointerdown', () => this.scene.start('Play'));
  }
}