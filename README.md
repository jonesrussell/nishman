# Anishinaabe

A single-player game inspired by Anishinaabe culture that focuses on a personal journey of learning and exploration.

##

https://jonesrussell.github.io/nishman/

### Game Concept: **"Wisdom Quest"**

-   **Objective**: The player embarks on a quest to gain wisdom by learning Anishinaabe words, stories, and traditions.
-   **Gameplay**:
    -   The player navigates through a series of levels, each representing a different aspect of Anishinaabe life, such as seasons, traditional activities, or spiritual beliefs.
    -   In each level, the player encounters various challenges that teach them new Ojibwe words and cultural knowledge.
    -   Challenges could include matching games, puzzles, and quizzes that require the player to learn and use Ojibwe words correctly.
    -   As the player progresses, they unlock traditional Anishinaabe stories, which are told in segments at the end of each level.

### Cultural Integration:

-   **Language**: Introduce Ojibwe words with their meanings and pronunciation, focusing on nature, animals, and cultural practices.
-   **Visuals**: Use visuals inspired by Anishinaabe art, such as petroglyphs, beadwork, and pictographs.
-   **Stories**: Incorporate Anishinaabe legends and teachings, presented in a way that respects their cultural significance.

### Implementation:

Here's a basic structure for the game:

```plaintext
Initialize a series of levels with different cultural themes
Create a collection of Ojibwe words and their English translations
Design challenges that incorporate these words and cultural knowledge

For each level:
  Present the player with a series of challenges
  Upon completing the challenges, reveal a segment of an Anishinaabe story
  Provide cultural notes and insights related to the level's theme

After completing all levels, the player will have a complete understanding of the story and a deeper appreciation for Anishinaabe culture
```

### Educational Value:

The game can serve as an interactive learning tool, providing players with a meaningful way to engage with the Anishinaabe language and culture. It can be both a journey of personal growth for the player and a celebration of the rich Anishinaabe heritage.

This single-player game concept, "Anishinaabe Wisdom Quest," offers a respectful and immersive experience that aligns with the values and traditions of the Anishinaabe people. Enjoy crafting this unique and educational adventure! 🌲🌙📚

## Dev Instructions

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.
4. If you want to build the project, run `npm run build`.

## TODO

### Dialogue

**Create a Dialogue Class**:

-   This class will handle the display of the dialogue box, the text, and manage the flow of the conversation.
-   It can have methods to start a conversation, display the next line, and end the conversation.

**Use JSON for Dialogue Data**:

-   You can store your dialogue data in a JSON file.
-   Each dialogue can have an ID, the lines of dialogue, and perhaps some metadata like the name of the NPC and any conditions for the dialogue.

**Load Dialogue Data**:

-   In PhaserJS, you can load the JSON file in the preload function of your scene.
-   Then, in the create function, you can create a new instance of your Dialogue class and pass in the dialogue data.

**Trigger Dialogue**:

-   You can trigger the dialogue in response to some event, like the player character colliding with an NPC.
-   You can use Phaser’s physics system to detect this collision.
