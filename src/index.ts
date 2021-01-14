import {BluetoothHelper} from './ts/bluetoothHelper';
import {MidiHelper} from './ts/midiHelper';
import {StorageHelper} from './ts/storageHelper';
import './components/controller-button';
import './components/controller-container';
import './components/controller-group';
import './components/controller-header';
import './components/controller-input';
import './components/controller-slider';

export class WebmidiController {
  private saveButton_: HTMLInputElement | null = null;

  constructor() {
    // Instantiate webmidi in global Window.
    window.Midi = new MidiHelper();
    window.Midi.connect();

    // Instantiate web Bluetooth in global Window.
    window.Bluetooth = new BluetoothHelper({
      // acceptAllDevices: true, // Note: Debug only.
      filters: [{
        services: [BluetoothHelper.MIDI_UUID],
      }],
    });
    window.Bluetooth.callback = (data: any) => {
      console.log(data);
    }

    const connectBluetooth = document.querySelector('#connect-bluetooth');
    connectBluetooth?.addEventListener(('click'), () => {
      window.Bluetooth.connect();
    });

    this.saveButton_ = document.querySelector('#save-button');
    this.attach_();

    // TODO(frederickk): Save and recall controller amount and order.
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