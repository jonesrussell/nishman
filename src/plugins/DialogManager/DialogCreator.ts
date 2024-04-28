import { Scene } from 'phaser';
import Dialog from 'phaser3-rex-plugins/templates/ui/dialog/Dialog';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

export default class DialogCreator {
  scene: Scene;
  rexUI: RexUIPlugin;
  dialog: Dialog;

  // Define constants
  private static readonly DIALOG_WIDTH = 100;
  private static readonly DIALOG_HEIGHT = 100;
  private static readonly DIALOG_BORDER_RADIUS = 20;
  private static readonly DIALOG_BORDER_COLOR = 0x1565c0;
  private static readonly TITLE_HEIGHT = 40;
  private static readonly TITLE_BORDER_COLOR = 0x003c8f;
  private static readonly FONT_SIZE = '24px';
  private static readonly SPACE_TITLE = 25;
  private static readonly SPACE_CONTENT = 25;
  private static readonly SPACE_ACTION = 15;
  private static readonly SPACE_LEFT = 20;
  private static readonly SPACE_RIGHT = 20;
  private static readonly SPACE_TOP = 20;
  private static readonly SPACE_BOTTOM = 20;
  private static readonly ACTIONS_ALIGN = 'right'; // 'center'|'left'|'right'

  setScene(scene: Scene, rexUI: RexUIPlugin) {
    this.scene = scene;
    this.rexUI = rexUI;
  }

  createDialog(
    x: number,
    y: number,
    title: string,
    content: string,
    answers: string[] = [],
  ) {
    this.dialog = this.rexUI.add.dialog({
      x: x,
      y: y,
      background: this.rexUI.add.roundRectangle(0, 0, DialogCreator.DIALOG_WIDTH, DialogCreator.DIALOG_HEIGHT, DialogCreator.DIALOG_BORDER_RADIUS, DialogCreator.DIALOG_BORDER_COLOR),
      title: this.rexUI.add.label({
        background: this.rexUI.add.roundRectangle(0, 0, DialogCreator.DIALOG_WIDTH, DialogCreator.TITLE_HEIGHT, DialogCreator.DIALOG_BORDER_RADIUS, DialogCreator.TITLE_BORDER_COLOR),
        text: this.scene.add.text(0, 0, title, {
          fontSize: DialogCreator.FONT_SIZE
        }),
        space: {
          left: DialogCreator.SPACE_LEFT,
          right: DialogCreator.SPACE_RIGHT,
          top: DialogCreator.SPACE_TOP,
          bottom: DialogCreator.SPACE_BOTTOM
        }
      }),
      content: this.scene.add.text(0, 0, content, {
        fontSize: DialogCreator.FONT_SIZE
      }),
      actions: answers.map(answer => this.createLabel(answer)),
      space: {
        title: DialogCreator.SPACE_TITLE,
        content: DialogCreator.SPACE_CONTENT,
        action: DialogCreator.SPACE_ACTION,
        left: DialogCreator.SPACE_LEFT,
        right: DialogCreator.SPACE_RIGHT,
        top: DialogCreator.SPACE_TOP,
        bottom: DialogCreator.SPACE_BOTTOM,
      },
      align: {
        actions: DialogCreator.ACTIONS_ALIGN, // 'center'|'left'|'right'
      },
      expand: {
        content: false, // Content is a pure text object
      }
    }).layout().popUp(1000);

    this.dialog
      .on('button.click', (button: Phaser.GameObjects.Text, _groupName: string, index: number, _event: Event) => {
        console.log(index + ': ' + button.text);
        this.dialog.destroy(); // Close and remove the dialog
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
      background: this.rexUI.add.roundRectangle(0, 0, 0, 0, DialogCreator.DIALOG_BORDER_RADIUS, 0x5e92f3),
      text: this.scene.add.text(0, 0, text, {
        fontSize: DialogCreator.FONT_SIZE
      }),
      space: {
        left: DialogCreator.SPACE_LEFT,
        right: DialogCreator.SPACE_RIGHT,
        top: DialogCreator.SPACE_TOP,
        bottom: DialogCreator.SPACE_BOTTOM
      }
    });
  }
}
