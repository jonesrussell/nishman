import Phaser, { Scene } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import DialogData from './DialogData.ts';
import DialogCreator from './DialogCreator.ts';

interface Answer {
  answerId: number;
  // Include other properties of an answer here
}

interface DialogObject {
  id: number;
  // Include other properties of a dialog object here
}

// export default class DialogManager extends Phaser.Plugins.BasePlugin {
//   dialogData: any; // This will hold your dialog JSON structure
//   currentDialog: any; // This will hold the current dialog state
//   scene: Phaser.Scene;
//   rexUI: RexUIPlugin;

//   constructor(pluginManager: Phaser.Plugins.PluginManager) {
//     super(pluginManager);
//     this.dialogData = {}; // Load your dialog data here
//     this.currentDialog = null; // Initialize current dialog state
//   }

//   setScene(scene: Phaser.Scene) {
//     this.scene = scene;
//     this.rexUI = this.scene.sys.rexUI;
//   }

//   loadDialogData(data: any) {
//     this.dialogData = data;
//     // Initialize the first dialog state
//     // this.currentDialog = this.dialogData.dialog[0];
//   }

//   processText(text: string): string {
//     return text.replace(/{actor: 0x00(\d+)}/g, (_match, actorId) => {
//       const actor = this.dialogData.actor.find((a: DialogueActor) => a.id === parseInt(actorId, 16));
//       return actor ? actor.name.first : 'Unknown';
//     });
//   }


// }

export default class DialogManager extends Phaser.Plugins.BasePlugin {
  dialogData: DialogData;
  dialogCreator: DialogCreator;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.dialogData = new DialogData();
    this.dialogCreator = new DialogCreator();
  }

  setScene(scene: Scene, rexUI: RexUIPlugin) {
    this.dialogCreator.setScene(scene, rexUI);
  }

  // Example function to handle user input and navigate dialog
  handleUserInput(answerId: number) {
    const answer = this.dialogData.currentDialog.answers.find((a: Answer) => a.answerId === answerId);
    if (answer) {
      const nextDialogId = answer.next;
      if (nextDialogId) {
        this.dialogData.currentDialog = this.dialogData.dialogData.dialog.find((d: DialogObject) => d.id === nextDialogId);
        // Display the next dialog text
        console.log(this.dialogData.processText(this.dialogData.currentDialog.text));
      } else {
        // End of dialog
        console.log('End of dialog.');
      }
    }
  }
}

