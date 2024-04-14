import Phaser from 'phaser';
import Dialogue from './Dialogue';

export default class Actor extends Phaser.Physics.Arcade.Sprite {

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

  startDialogue(dialogue: any): void {
    console.log('actor dialogue', dialogue);
    // Example: Display a dialogue box with text
    // This is a simplified example; you'll need to implement the actual dialogue logic
    // Additional logic to handle player choices, progress the story, etc.
  }

  checkFlip() {
    if (this.body && this.body.velocity.x < 0) {
      this.scaleX = -0.1;
    } else {
      this.scaleX = 0.1;
    }
  }

  getBody() {
    return this.body;
  }
}
