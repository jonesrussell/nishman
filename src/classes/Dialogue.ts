import Phaser from 'phaser';

export default class Dialogue extends Phaser.GameObjects.Container {
  private lines: string[];
  private currentLineIndex: number;
  private isConversationActive: boolean;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);
    scene.add.existing(this);

    // Initialize your dialogue UI elements here
    // For example, adding a background image and text
    const background = scene.add.image(0, 0, 'dialogueBackground');
    const text = scene.add.text(0, 0, '', { fontSize: '32px' });

    // Add the elements to the container
    this.add(background);
    this.add(text);

    this.setVisible(false);
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
