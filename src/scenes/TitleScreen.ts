// TitleScreen.ts
import Phaser from 'phaser';
import StatesBitmapText from 'phaser3-rex-plugins/templates/ui/statesbitmaptext/StatesBitmapText';

export default class TitleScreen extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScreen' });
  }

  preload() {
    // Load assets
    this.load.image('title-bg', '/assets/scenes/anishinaabe.png');
    this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
  }

  create() {
    // Add background image at the center of the screen
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'title-bg')
      .setScale(1);

    // Add title text with brown color
    const titleText: StatesBitmapText = this.add.bitmapText(400, 150, 'arcade', 'Anishinaabe', 32);
    titleText.setTint(0xff0000); // Red tint
    titleText.setOrigin(0.5);

    // Add start game button with brown color
    const startButton = this.add.bitmapText(400, 220, 'arcade', 'Start Game', 16);
    startButton.setOrigin(0.5);
    startButton.setInteractive();
    startButton.setTint(0x0000ff); // Red tint
    startButton.on('pointerdown', () => this.scene.start('Autumn'));
    startButton.on('click', () => this.scene.start('Autumn'));
  }
}
