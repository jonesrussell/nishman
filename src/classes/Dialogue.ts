import Phaser from 'phaser';

export default class Dialogue extends Phaser.GameObjects.Sprite {
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
}
