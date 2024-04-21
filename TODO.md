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

I understand now. Here's the corrected format with each bolded item as a heading using "####" for the bolded items and "###" for the main sections:

### Bounds

#### Define Game World Bounds

- Specify the boundaries of the game world to prevent the player and interactive elements from moving outside the playable area.

#### Constrain Player and NPC Movement

- Implement constraints to ensure that the player and NPCs stay within the defined game world bounds.

#### Adjust for Interactive Elements

- Ensure that all interactive elements, such as collectibles or NPCs, are also constrained within the game world.

### Pathfinding
#### Choose a Pathfinding Algorithm

- Select an appropriate pathfinding algorithm, such as A*, for NPC movement.

#### Implement Pathfinding

- Integrate a pathfinding library or implement the chosen algorithm to enable NPCs to navigate the game world autonomously.

#### Dynamic Pathfinding Updates

- Update the pathfinding data dynamically as the game world changes, to accommodate new obstacles or changes in the environment.

#### NPC Movement Logic

- Develop logic for NPC movement based on pathfinding data, ensuring that NPCs can autonomously navigate the game world in response to player actions or predefined behaviors.

This format ensures that each bolded item is on its own line as a heading, making the structure clearer and more readable.

### Artwork

Current graphics are low low low low effort.
