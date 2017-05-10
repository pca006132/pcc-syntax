'use babel';

import PccSyntaxView from './pcc-syntax-view';
import { CompositeDisposable } from 'atom';

export default {

  pccSyntaxView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pccSyntaxView = new PccSyntaxView(state.pccSyntaxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pccSyntaxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pcc-syntax:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pccSyntaxView.destroy();
  },

  serialize() {
    return {
      pccSyntaxViewState: this.pccSyntaxView.serialize()
    };
  },

  toggle() {
    console.log('PccSyntax was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
