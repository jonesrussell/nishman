import Actor from './Actor';

export default class Player extends Actor {
  target: Phaser.Math.Vector2;
  distanceText: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player', null);

    // PHYSICS
    this.getBody()?.setSize(30, 30);
    this.getBody()?.setOffset(8, 0);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),
      frameRate: 8,
      repeat: -1
    });

    this.target = new Phaser.Math.Vector2();
    this.distanceText = this.scene.add.text(10, 10, 'Click to set target', { color: '#00ff00' });

    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.target.x = pointer.x;
      this.target.y = pointer.y;

      // Move at 200 px/s:
      this.scene.physics.moveToObject(this, this.target, 200);
    });

    this.play('walk');
  }

  update() {
    const tolerance = 4;
    const distance = Phaser.Math.Distance.BetweenPoints(this, this.target);

    if (this.body && this.body.velocity.length() > 0) {
      this.distanceText.setText(`Distance: ${distance}`);

      if (distance < tolerance) {
        this.body.reset(this.target.x, this.target.y);
      }
    }
  }
}