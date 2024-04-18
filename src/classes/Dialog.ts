// src/classes/Dialog.ts
import Phaser from 'phaser';
import '../types/phaser-rexui.d.ts';

export default class Dialog {
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  createDialog(x: number, y: number, title: string, content: string, actions: string[]) {
    let dialog = this.scene.sys.rexUI.add.dialog({
      x: x,
      y: y,
      background: this.scene.sys.rexUI.add.roundRectangle(0, 0, 100, 100, 20, 0x1565c0),
      title: this.scene.sys.rexUI.add.label({
        background: this.scene.sys.rexUI.add.roundRectangle(0, 0, 100, 40, 20, 0x003c8f),
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
      actions: actions.map(action => this.createLabel(action)),
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
    return this.scene.sys.rexUI.add.label({
      background: this.scene.sys.rexUI.add.roundRectangle(0, 0, 0, 0, 20, 0x5e92f3),
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
}
