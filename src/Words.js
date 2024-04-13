import Phaser from 'phaser';

/**
 * Constants representing keyboard key codes.
 * @type {Object}
 * @property {number} LEFT - The key code for the left arrow key.
 * @property {number} RIGHT - The key code for the right arrow key.
 * @property {number} UP - The key code for the up arrow key.
 * @property {number} DOWN - The key code for the down arrow key.
 * @property {number} ENTER - The key code for the enter key.
 * @property {number} SPACE - The key code for the space key.
 */
const KEY_CODES = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    SPACE: 32
};

/**
 * An array of characters that can be added to the player's name.
 * @type {Array<string>}
 * @property {string[]} [0] - The first row of characters.
 * @property {string[]} [1] - The second row of characters.
 * @property {string[]} [2] - The third row of characters.
 */
const CHARACTERS = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z', '.', '-', '<', '>']
];

export class Words extends Phaser.Scene {

    /**
     * Loads the necessary assets for the game.
     * @method preload
     */
    preload() {
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');
        this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
    }

    /**
     * Initializes the game scene.
     * @method create
     */
    create() {
        /**
         * Initializes the cursor and name variables.
         * @member {Object} cursor - Represents the cursor's position on the game board.
         * @member {string} name - Represents the player's name.
         */
        this.cursor = { x: 0, y: 0 };
        this.name = '';

        /**
         * Sets up the game board, keyboard input, and pointer input.
         */
        this.setupGameBoard();
        this.setupKeyboardInput();
        this.setupPointerInput();
    }

    /**
     * Sets up the game board, keyboard input, and pointer input.
     * @memberof Play
     */
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

    /**
     * Sets up the keyboard input.
     * @memberof Play
     */
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

    /**
     * Moves the cursor on the game board.
     * @memberof Play
     * @param {number} dx - The x-coordinate change for the cursor.
     * @param {number} dy - The y-coordinate change for the cursor.
     */
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

    /**
     * Handles the input events for the game.
     * @memberof Play
     */
    handleInput() {
        if (this.cursor.x === 9 && this.cursor.y === 2 && this.name.length > 0) {
            // Submit
            console.log(this.name);
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

    /**
     * Sets up pointer input for the game board.
     * @memberof Play
     */
    setupPointerInput() {
        /**
         * Adds a listener for pointer move events on the game board.
         * @param {Phaser.Input.Pointer} pointer - The pointer that triggered the event.
         * @param {number} x - The x coordinate of the pointer, relative to the game board.
         * @param {number} y - The y coordinate of the pointer, relative to the game board.
         */
        this.inputText.on('pointermove', (pointer, x, y) => {
            const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            this.moveCursor(cx - this.cursor.x, cy - this.cursor.y);
        });

        /**
         * Adds a listener for pointer up events on the game board.
         * @param {Phaser.Input.Pointer} pointer - The pointer that triggered the event.
         * @param {number} x - The x coordinate of the pointer, relative to the game board.
         * @param {number} y - The y coordinate of the pointer, relative to the game board.
         */
        this.inputText.on('pointerup', (pointer, x, y) => {
            const cx = Phaser.Math.Snap.Floor(x, 52, 0, true);
            const cy = Phaser.Math.Snap.Floor(y, 64, 0, true);

            this.moveCursor(cx - this.cursor.x, cy - this.cursor.y);
            this.handleInput();
        });
    }
}
