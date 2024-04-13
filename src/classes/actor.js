import Phaser from 'phaser';

export default class Actor extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
  }

  startDialogue() {
    // Example: Display a dialogue box with text
    // This is a simplified example; you'll need to implement the actual dialogue logic
    console.log("Elder: Welcome, traveler. Are you ready for the challenge?");
    // Additional logic to handle player choices, progress the story, etc.
  }

  checkFlip() {
    if (this.body.velocity.x < 0) {
      this.scaleX = -0.1;
    } else {
      this.scaleX = 0.1;
    }
  }

  getBody() {
    return this.body;
  }
}
