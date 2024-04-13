import Phaser from 'phaser';

export default class Actor extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCollideWorldBounds(true);
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
