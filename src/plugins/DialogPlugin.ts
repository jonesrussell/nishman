import Phaser from 'phaser';
import { DialogueActor } from '../data/DialogueTypes';

interface Answer {
  answerId: number;
  // Include other properties of an answer here
}

interface DialogObject {
  id: number;
  // Include other properties of a dialog object here
}

export default class DialogPlugin extends Phaser.Plugins.BasePlugin {
  dialogData: any; // This will hold your dialog JSON structure
  currentDialog: any; // This will hold the current dialog state

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.dialogData = {}; // Load your dialog data here
    this.currentDialog = null; // Initialize current dialog state
  }

  init() {
    console.log('init');
  }

  loadDialogData(data: any) {
    this.dialogData = data;
    // Initialize the first dialog state
    // this.currentDialog = this.dialogData.dialog[0];
  }

  converse(dialogId: number) {
    // Find the dialog by its ID
    const dialog = this.dialogData.dialog.find((d: DialogObject) => d.id === dialogId);
    if (dialog) {
      this.currentDialog = dialog;
      // Process and display the dialog text
      const processedText = this.processText(this.currentDialog.text);
      console.log(processedText); // Replace this with actual display logic
    } else {
      console.error(`Dialog with ID ${dialogId} not found.`);
    }
  }

  processText(text: string): string {
    return text.replace(/{actor: 0x00(\d+)}/g, (_match, actorId) => {
      const actor = this.dialogData.actor.find((a: DialogueActor) => a.id === parseInt(actorId, 16));
      return actor ? actor.name.first : 'Unknown';
    });
  }

  // Example function to handle user input and navigate dialog
  handleUserInput(answerId: number) {
    const answer = this.currentDialog.answers.find((a: Answer) => a.answerId === answerId);
    if (answer) {
      const nextDialogId = answer.next;
      if (nextDialogId) {
        this.currentDialog = this.dialogData.dialog.find((d: DialogObject) => d.id === nextDialogId);
        // Display the next dialog text
        console.log(this.processText(this.currentDialog.text));
      } else {
        // End of dialog
        console.log('End of dialog.');
      }
    }
  }
}
