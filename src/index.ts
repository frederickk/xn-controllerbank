import {MidiHelper} from './ts/midiHelper';

// Instantiate webmidi in global Window.
window.Midi = new MidiHelper();
window.Midi.connect();

import {StorageHelper} from './ts/storageHelper';
import './components/controller-button';
import './components/controller-container';
import './components/controller-group';
import './components/controller-input';
import './components/controller-slider';

export class WebmidiController {
  private saveButton_: HTMLInputElement | null = null;

  constructor() {
    this.saveButton_ = document.querySelector('#save-button');
    this.attach_();
  }

  saveState() {
    const saves = document.querySelectorAll('*[data-save]');
    saves.forEach((item: any) => {
      console.log(item.id, `'${item.dataset.save}'`, item[item.dataset.save]);
      StorageHelper.setState(item, item.dataset.save);
    });

    console.log('Saving state in localStorage');
  }

  private attach_() {
    this.saveButton_?.addEventListener('click', this.saveState.bind(this));
  }
}

new WebmidiController();