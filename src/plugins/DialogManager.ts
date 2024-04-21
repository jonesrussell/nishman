import Phaser from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
// import '../types/phaser-rexui';
import { DialogueActor } from '../data/DialogueTypes.ts';

interface Answer {
  answerId: number;
  // Include other properties of an answer here
}

interface DialogObject {
  id: number;
  // Include other properties of a dialog object here
}

export default class DialogManager extends Phaser.Plugins.BasePlugin {
  dialogData: any; // This will hold your dialog JSON structure
  currentDialog: any; // This will hold the current dialog state
  scene: Phaser.Scene;
  rexUI: RexUIPlugin;

  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.dialogData = {}; // Load your dialog data here
    this.currentDialog = null; // Initialize current dialog state
  }

  setScene(scene: Phaser.Scene) {
    this.scene = scene;
    this.rexUI = this.scene.sys.rexUI;
  }

  createDialog(x: number, y: number, title: string, content: string, answers: string[] = []) {
    let dialog = this.rexUI.add.dialog({
      x: x,
      y: y,
      background: this.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
      title: this.rexUI.add.label({
        background: this.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
        text: this.scene.add.text(0, 0, title, {
          fontSize: '24px'
        }),
        space: {
          left: 15,
          right: 15,
          top: 10,
          bottom: 10
        }
      }),
      content: this.scene.add.text(0, 0, content, {
        fontSize: '24px'
      }),
      actions: answers.map(answer => this.createLabel(answer)),
      space: {
        title: 25,
        content: 25,
        action: 15,
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
      align: {
        actions: 'right', // 'center'|'left'|'right'
      },
      expand: {
        content: false, // Content is a pure text object
      }
    }).layout().popUp(1000);

    dialog
      .on('button.click', function (button: Phaser.GameObjects.Text, _groupName: string, index: number) {
        console.log(index + ': ' + button.text);
      })
      .on('button.over', function (button: Phaser.GameObjects.GameObject, _groupName: string, _index: number) {
        if (button instanceof Phaser.GameObjects.GameObject) {
          (button as any).getElement('background').setStrokeStyle(1, 0xffffff);
        }
      })
      .on('button.out', function (button: Phaser.GameObjects.GameObject, _groupName: string, _index: number) {
        if (button instanceof Phaser.GameObjects.GameObject) {
          (button as any).getElement('background').setStrokeStyle();
        }
      });
  }

  createLabel(text: string) {
    return this.rexUI.add.label({
      background: this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
      text: this.scene.add.text(0, 0, text, {
        fontSize: '24px'
      }),
      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    });
  }

  loadDialogData(data: any) {
    this.dialogData = data;
    // Initialize the first dialog state
    // this.currentDialog = this.dialogData.dialog[0];
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
}
