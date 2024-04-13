import Phaser from 'phaser';

const KEY_CODES = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32
};

const CHARACTERS = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>']
];

export class Play extends Phaser.Scene {
    preload() {
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');
        this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
    }

    create() {
        this.cursor = { x: 0, y: 0 };
        this.name = '';

        this.setupGameBoard();
        this.setupKeyboardInput();
        this.setupPointerInput();
    }

    setupGameBoard() {
        this.inputText = this.add.bitmapText(130, 50, 'arcade', 'ABCDEFGHIJ\n\nKLMNOPQRST\n\nUVWXYZ.-').setLetterSpacing(20);
        this.inputText.setInteractive();

        this.rub = this.add.image(this.inputText.x + 430, this.inputText.y + 148, 'rub');
        this.end = this.add.image(this.inputText.x + 482, this.inputText.y + 148, 'end');

        this.block = this.add.image(this.inputText.x - 10, this.inputText.y - 2, 'block').setOrigin(0);

        this.legend = this.add.bitmapText(80, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
        this.add.bitmapText(80, 310, 'arcade', '1ST   50000    ').setTint(0xff0000);

        this.playerText = this.add.bitmapText(560, 310, 'arcade', this.name).setTint(0xff0000);
    }

    setupKeyboardInput() {
        this.input.keyboard.on('keyup', event => {
            switch (event.keyCode) {
                case KEY_CODES.LEFT:
                    this.moveCursor(-1, 0);
                    break;
                case KEY_CODES.RIGHT:
                    this.moveCursor(1, 0);
                    break;
                case KEY_CODES.UP:
                    this.moveCursor(0, -1);
                    break;
                case KEY_CODES.DOWN:
                    this.moveCursor(0, 1);
                    break;
                case KEY_CODES.ENTER:
                case KEY_CODES.SPACE:
                    this.handleInput();
                    break;
            }
        });
    }

    moveCursor(dx, dy) {
        if (this.cursor.x + dx >= 0 && this.cursor.x + dx < 10) {
            this.cursor.x += dx;
            this.block.x += 52 * dx;
        }
        if (this.cursor.y + dy >= 0 && this.cursor.y + dy < 3) {
            this.cursor.y += dy;
            this.block.y += 64 * dy;
        }
    }

    handleInput() {
        if (this.cursor.x === 9 && this.cursor.y === 2 && this.name.length > 0) {
            // Submit
        } else if (this.cursor.x === 8 && this.cursor.y === 2 && this.name.length > 0) {
            // Rub
            this.name = this.name.substr(0, this.name.length - 1);
            this.playerText.text = this.name;
        } else if (this.name.length < 3) {
            // Add
            this.name = this.name.concat(CHARACTERS[this.cursor.y][this.cursor.x]);
            this.playerText.text = this.name;
        }
    }

    setupPointerInput() {
        this.inputText.on('pointermove', (pointer, x, y) => {
            const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            this.moveCursor(cx - this.cursor.x, cy - this.cursor.y);
        });

        this.inputText.on('pointerup', (pointer, x, y) => {
            const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            this.moveCursor(cx - this.cursor.x, cy - this.cursor.y);
            this.handleInput();
        });
    }
}
