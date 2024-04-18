// phaser-rexui.d.ts
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

declare module 'phaser' {
  namespace Phaser.Types.Scenes {
    interface Systems {
      rexUI: RexUIPlugin; // You can replace 'any' with a more specific type if you have one
    }
  }
}
