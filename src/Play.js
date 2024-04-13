import Phaser from 'phaser';

export class Play extends Phaser.Scene {
    controls;

    preload() {
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/bg.csv');
        this.load.image('tiles', 'assets/tilemaps/tiles/seasonal_sample_autumn.png');

        this.load.spritesheet('brawler', 'assets/sprites/gen-char.png', { frameWidth: 256, frameHeight: 256 });
    }

    create() {
        // When loading a CSV map, make sure to specify the tileWidth and tileHeight
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        layer.skipCull = true;

        // this.add.image(0, 0, 'brawler', '__BASE').setOrigin(0, 0);

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('brawler', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1
        });

        const keys = ['walk'];

        const cody = this.add.sprite(600, 370);
        cody.setScale(0.1);
        cody.play('walk');


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);

        const help = this.add.text(16, 16, 'Arrow keys to scroll', {
            fontSize: '18px',
            fill: '#ffffff'
        });

        help.setScrollFactor(0);

        const cam = this.cameras.main;

        cam.setBounds(0, 0, 800, 600);

        // Initialize the levels with their respective themes
        let cultural_themes = {
            'Seasons': ['Spring', 'Summer', 'Fall', 'Winter'],
            'Elements': ['Water', 'Fire', 'Earth', 'Air'],
            'Activities': ['Fishing', 'Hunting', 'Gathering', 'Storytelling'],
            'Values': ['Respect', 'Love', 'Courage', 'Truth']
        };

        let levels = [];
        for (let theme_category in cultural_themes) {
            let themes = cultural_themes[theme_category];
            for (let i = 0; i < themes.length; i++) {
                let theme = themes[i];
                let level = {
                    'theme': theme,
                    'introduction': '', // To be filled with a cultural description
                    'challenges': [],    // To be filled with puzzles and tasks
                    'story_segment': '' // To be filled with a part of the Anishinaabe story
                };
                levels.push(level);
            }
        }

        // Example of adding a challenge to the first level
        levels[0]['challenges'].push({
            'type': 'word_match',
            'ojibwe_word': 'Ziigwan',
            'english_meaning': 'Spring'
        });

        // Fill in the introduction and story segment for the first level
        levels[0]['introduction'] = "Spring is a time of renewal and growth. It is a season when the earth begins to thaw, and the first signs of new life appear.";
        levels[0]['story_segment'] = 'In the beginning, the Anishinaabe people lived in harmony with the seasons. Spring was a time of preparation for the summer harvest.';

        // You can now use the levels array to dynamically generate game content or levels
        // For example, you might display the introduction and story segment in the game UI
        // Or, you might use the challenges to create interactive gameplay elements
        // Display the introduction and story segment in the game UI
        this.displayIntroductionAndStory(levels[0]);

        // Create interactive gameplay elements based on the challenges
        this.createGameplayElements(levels[0]['challenges']);
    }

    update(time, delta) {
        this.controls.update(delta);
    }

    displayIntroductionAndStory(level) {
        // Assuming you have a UI element to display text with wrapping
        let introductionText = this.add.text(10, 10, level.introduction, { fontSize: '16px', fill: '#000', wordWrap: { width: 200 } });
        let storyText = this.add.text(10, 30, level.story_segment, { fontSize: '16px', fill: '#000', wordWrap: { width: 200 } });
    }

    createGameplayElements(challenges) {
        // Example of creating a simple interactive element for a word match challenge with wrapping
        challenges.forEach(challenge => {
            if (challenge.type === 'word_match') {
                // Create a button or interactive element for the word match challenge with wrapping
                let button = this.add.text(10, 50, challenge.ojibwe_word, { fontSize: '16px', fill: '#000', wordWrap: { width: 200 } })
                    .setInteractive()
                    .on('pointerdown', () => {
                        // Handle the interaction, e.g., check if the word is correct
                        console.log('Word match challenge interacted with');
                    });
            }
        });
    }
}

export default Play;