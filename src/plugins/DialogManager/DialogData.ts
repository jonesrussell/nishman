import { DialogueActor } from '../../data/DialogueTypes.ts';

export interface Answer {
  answerId: number;
  // Include other properties of an answer here
}

interface DialogObject {
  id: number;
  // Include other properties of a dialog object here
}

export default class DialogData {
  dialogData: any; // This will hold your dialog JSON structure
  currentDialog: any; // This will hold the current dialog state

  constructor() {
    this.dialogData = {}; // Load your dialog data here
    this.currentDialog = null; // Initialize current dialog state
  }

  loadDialogData(data: any) {
    this.dialogData = data;
    // Initialize the first dialog state
    this.currentDialog = this.dialogData.dialog[0];
  }

  getDialogueById(id: number) {
    let data = this.dialogData.dialog.find((dialog: DialogObject) => dialog.id === id);
    if (data) {
      // Find the actor by actorId from the actor array
      data.speaker = this.dialogData.actor.find((actor: any) => actor.id === data.actorId);
      if (data.speaker) {
        // Assuming you want to set the speaker's name as the speaker
        data.speaker = data.speaker.name.first;
      }

      // Loop over answers, get answerId, set answer to this.dialogData.answer.id's text
      if (data.answers) {
        data.answers = data.answers.map((answer: any) => {
          const answerText = this.dialogData.answer.find((a: any) => a.id === answer.answerId);
          return answerText ? answerText.text : '';
        });
      }
    }

    return data;
  }

  processText(text: string): string {
    return text.replace(/{actor: 0x00(\d+)}/g, (_match, actorId) => {
      const actor = this.dialogData.actor.find((a: DialogueActor) => a.id === parseInt(actorId, 16));
      return actor ? actor.name.first : 'Unknown';
    });
  }
}
