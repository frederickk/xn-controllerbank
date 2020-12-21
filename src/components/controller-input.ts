import {LitElement, html, customElement, property} from 'lit-element';
import {StorageHelper} from '../ts/storageHelper';

// @ts-ignore
import Style from './controller-input.scss';

@customElement('controller-input')
export default class ControllerSlider extends LitElement {
  private sh_ = StorageHelper;
  // private mh_: MidiHelper;

  constructor() {
    super();
  }

  static get styles() {
		return [Style];
  }

  @property({type: String})
  id = 'controller-input';

  @property({type: String})
  name = this.id;

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
        <div id="${this.id}-label"><slot></slot></div>
        <input type="number" id="${this.id}" value="${this.value}" min="${this.min}" max="${this.max}" @change=${this.changeHandler_}" />
      </div>`;
  }

  firstUpdated() {
    const state = this.sh_.getState(this, 'value');
    if (state) {
      this.value = parseInt(state);
      console.log(`'${this.id}' initiated`, state);

      const event = new Event('change', {
        bubbles: true,
      });
      this.changeHandler_(event);
    }

    if (this.save) {
      this.dataset['save'] = this.save.toString();
    }
  }

  changeHandler_(event: Event) {
    const elem = event?.target as HTMLInputElement || this;
    const name = this.getAttribute('for');
    const attr = this.dataset.attr;

    this.value = parseInt(elem.value);
    if (name && attr) {
      document.querySelector(`[name=${name}]`)?.setAttribute(attr, this.value.toString());
    }

    this.sh_.setState(elem, 'value');
  }
}