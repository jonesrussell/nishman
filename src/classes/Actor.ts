import Phaser from 'phaser';

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
