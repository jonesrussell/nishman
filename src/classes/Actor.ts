import Phaser from 'phaser';

export default class Actor extends Phaser.Physics.Arcade.Sprite {
  private static readonly SCALE_X_POSITIVE = 0.1;
  private static readonly SCALE_X_NEGATIVE = -0.1;

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
      this.scaleX = Actor.SCALE_X_NEGATIVE;
    } else {
      this.scaleX = Actor.SCALE_X_POSITIVE;
    }
  }

  getBody() {
    return this.body;
  }
}
