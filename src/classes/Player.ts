import Actor from './Actor';

export default class Player extends Actor {
  private static readonly WALK_FRAMES = [0, 1, 2, 3];
  private static readonly WALK_FRAME_RATE = 8;
  private static readonly MOVE_SPEED = 200;
  private static readonly TOLERANCE = 4;

  target: Phaser.Math.Vector2;
  distanceText: Phaser.GameObjects.Text;
  inputEnabled: boolean = true; // Flag to track input events

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player', null);

    // PHYSICS
    this.getBody()?.setSize(30, 30);
    this.getBody()?.setOffset(8, 0);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('player', { frames: Player.WALK_FRAMES }),
      frameRate: Player.WALK_FRAME_RATE,
      repeat: -1
    });

    this.target = new Phaser.Math.Vector2();
    this.distanceText = this.scene.add.text(10, 10, 'Click to set target', { color: '#00ff00' });

    this.scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.inputEnabled) {
        console.log('player walk');
        this.target.x = pointer.x;
        this.target.y = pointer.y;
      }

      // Move at 200 px/s:
      this.scene.physics.moveToObject(this, this.target, Player.MOVE_SPEED);
    });

    this.play('walk');
  }

  update() {
    const distance = Phaser.Math.Distance.BetweenPoints(this, this.target);

    if (this.body && this.body.velocity.length() > 0) {
      this.distanceText.setText(`Distance: ${distance}`);

      if (distance < Player.TOLERANCE) {
        this.body.reset(this.target.x, this.target.y);
      }
    }
  }

  setInputEnabled(enabled: boolean) {
    this.inputEnabled = enabled;
  }
}
