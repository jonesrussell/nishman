import Phaser from 'phaser';

export class Play extends Phaser.Scene {
    preload() {
        // Preload assets here
    }

    create() {
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
        levels[0]['introduction'] = 'Spring is a time of renewal and growth. It is a season when the earth begins to thaw, and the first signs of new life appear.';
        levels[0]['story_segment'] = 'In the beginning, the Anishinaabe people lived in harmony with the seasons. Spring was a time of preparation for the summer harvest.';

        // You can now use the levels array to dynamically generate game content or levels
        // For example, you might display the introduction and story segment in the game UI
        // Or, you might use the challenges to create interactive gameplay elements
        // Display the introduction and story segment in the game UI
        this.displayIntroductionAndStory(levels[0]);

        // Create interactive gameplay elements based on the challenges
        this.createGameplayElements(levels[0]['challenges']);
    }

    displayIntroductionAndStory(level) {
        // Assuming you have a UI element to display text
        let introductionText = this.add.text(10, 10, level.introduction, { fontSize: '16px', fill: '#000' });
        let storyText = this.add.text(10, 30, level.story_segment, { fontSize: '16px', fill: '#000' });
    }

    createGameplayElements(challenges) {
        // Example of creating a simple interactive element for a word match challenge
        challenges.forEach(challenge => {
            if (challenge.type === 'word_match') {
                // Create a button or interactive element for the word match challenge
                let button = this.add.text(10, 50, challenge.ojibwe_word, { fontSize: '16px', fill: '#000' })
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