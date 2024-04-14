import Phaser from 'phaser';

export default class Dialogue extends Phaser.GameObjects.Sprite {
  private lines: string[];
  private currentLineIndex: number;
  private isConversationActive: boolean;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame: string | number | null | undefined,
  ) {
    super(scene, x, y, texture, frame ?? undefined);
    scene.add.existing(this);
    scene.physics.add.existing(this);
  }

  startConversation(lines: string[]): void {
    this.lines = lines;
    this.currentLineIndex = 0;
    this.isConversationActive = true;
    this.displayNextLine();
  }

  displayNextLine(): void {
    if (this.isConversationActive && this.currentLineIndex < this.lines.length) {
      // Assuming you have a method to display the text on the screen
      this.displayText(this.lines[this.currentLineIndex]);
      this.currentLineIndex++;
    } else {
      this.endConversation();
    }
  }

  endConversation(): void {
    this.isConversationActive = false;
    // Additional logic to clean up or hide the dialogue box
  }

  // Placeholder method to display text. Implement according to your game's UI.
  private displayText(text: string): void {
    console.log(text); // Replace with actual UI display logic
  }
}
