import {Controller} from './ts/controller';
import {MidiHelper} from './ts/midiHelper';
import {Select} from './ts/select';

export class WebmidiController {
  private saveButton_: HTMLInputElement | null = null;
  private clearButton_: HTMLInputElement | null = null;

  constructor() {
    this.saveButton_ = document.querySelector('#save-button');
    this.clearButton_ = document.querySelector('#clear-button');

    // Instantiate webmidi.
    const mh = new MidiHelper();
    mh.connect();

    // Instantiate selects.
    Array.from(document.querySelectorAll('select.midi-select')).forEach((select) => {
      new Select(`#${select.id}`);
    });

    // Instantiate sliders.
    Array.from(document.querySelectorAll('input.controller')).forEach((controller) => {
      new Controller(`#${controller.id}`, mh);
    });

    this.attach_();
  }

  saveState() {
    console.log('Saving state in localStorage');
    // const saves = document.querySelectorAll('*[data-save]');
    // saves.forEach((item: any) => {
    //   this.localStorageSaveHandler_(item);
    // });
  }

  private attach_() {
    if (this.clearButton_) {
      this.clearButton_.addEventListener('click', () => {
        console.log('Clearing saved localStorage states');
        localStorage.clear();
      });
    }

    if (this.saveButton_) {
      this.saveButton_.addEventListener('click', this.saveState.bind(this));
    }
  }
}

new WebmidiController();