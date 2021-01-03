import {LitElement, html, customElement, property} from 'lit-element';
import {StorageHelper} from '../ts/storageHelper';

// @ts-ignore
import Style from './controller-slider.scss';

@customElement('controller-slider')
export default class ControllerSlider extends LitElement {
  private range_: HTMLInputElement | null;
  private label_: HTMLInputElement | null;
  private sh_ = StorageHelper;

  constructor() {
    super();

    this.range_ = null;
    this.label_ = null;
  }

  static get styles() {
    return [Style];
  }

  @property({type: String})
  id = 'controller-slider';

  @property({type: String})
  name = this.id;

  @property({type: Number})
  channel = 1;

  @property({type: Number})
  ccnum = 1;

  @property({type: Number})
  velocity = 127;

  @property({type: Number})
  value = 0;

  @property({type: Number})
  min = 0;

  @property({type: Number})
  max = 127;

  @property({type: String})
  save = "value";

  render() {
    return html`
      <div id="group">
        <input type="range" id="${this.id}" title="Adjust value" value="${this.value}" min="${this.min}" max="${this.max}" @input="${this.changeHandler_}" />
        <input type="number" id="${this.id}-label" title="Increment/decrement value" value="${this.value}" min="${this.min}" max="${this.max}" @change="${this.changeHandler_}" @input="${this.changeHandler_}" />
      </div>`;
  }

  firstUpdated() {
    this.range_ = (this.shadowRoot?.querySelector(`#group input[type=range]`) as HTMLInputElement);
    this.label_ = (this.shadowRoot?.querySelector(`input[type=number]`) as HTMLInputElement);

    const state = this.sh_.getState(this.range_, 'value');
    if (state) {
      this.label_.value = this.range_.value;
      console.log(`'${this.id}' initiated`, state);
    }

    if (this.save) {
      this.dataset['save'] = this.save.toString();
    }
  }

  updated(props: any) {
    // TODO(frederickk): Hacky way to ensure range and user input are synced.
    if (props.get('value')) {
      if (this.range_) {
        this.range_.value = props.get('value')?.toString();
      }
      if (this.label_) {
        this.label_.value = props.get('value')?.toString();
      }
    }

    this.sh_.setState(this.range_, 'value');
  }

  changeHandler_(event: Event) {
    const attr = this.dataset.attr?.toUpperCase();
    const channel = this.channel - 1;
    this.value = parseInt((event?.target as HTMLInputElement).value);

    if (attr === null || attr === undefined) {
      console.warn('Invalid or missing \'data-attr\'.', attr);
    } else {
      console.log(`"${attr}"`, window.Midi.CC, this.ccnum, this.value, channel);

      if (attr === 'NOTE_ON') {
        window.Midi.noteOn(this.value, this.velocity, channel);
      } else if (attr === 'NOTE_OFF') {
        window.Midi.noteOff(this.value, 0, channel);
      } else {
        window.Midi.sendMessage(window.Midi[attr], this.ccnum, this.value, channel);
      }

      if (window.Bluetooth) {
        const packet = new Uint8Array([
          window.Midi['HEADER'],
          window.Midi.getTimestampBytes().messageTimestamp,
          channel & 0x0F | window.Midi[attr],
          this.value & 0x7F,
          this.ccnum & 0x7F,
        ]);
        console.log(`🎹 ${packet}`);

        window.Bluetooth.send(packet);
      }
    }

  }
}