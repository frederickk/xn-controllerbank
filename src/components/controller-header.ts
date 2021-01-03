import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/image-icons.js';

// @ts-ignore
import Style from './controller-header.scss';

@customElement('controller-header')
export default class ControllerHeader extends LitElement {
  static get styles() {
		return [Style];
  }

  @property({type: String})
  id = 'controller-header';

  @property({type: String})
  name = this.id;

  @property({type: String})
  icon = '';

  @property({type: String})
  save = 'innerText';

  render() {
    return html`
      <div id="group">
        <iron-icon icon="${this.icon}"></iron-icon>
        <slot></slot>
        <button id="${this.id}-remove-button" title="Remove controller" @click="${this.clickRemoveHandler_}"><iron-icon icon="icons:remove"></iron-icon></button>
        <button id="${this.id}-add-button" title="Add new controller" @click="${this.clickAddHandler_}"><iron-icon icon="icons:add"></iron-icon></button>
      </div>`;
  }

  clickRemoveHandler_() {
    const elem = this.shadowRoot?.host;
    const parent = elem?.parentElement;
    const name = (document.querySelector(`#${this.id}-name`) as HTMLElement)?.innerText;

    const r = confirm(`Remove '${name}'?`);
    if (r === true) {
      parent?.remove();
    }
  }

  clickAddHandler_() {
    const elem = this.shadowRoot?.host;
    const parent = elem?.parentElement;

    // const newElem = parent?.cloneNode(true);
    // TODO(frederickk): Improve this complex cloning implementation.
    const newElem = document.createElement('controller-container') as HTMLElement;

    if (newElem) {
      const id =
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) + Date.now();
      const index = id.slice(-2);

      const header = document.createElement('controller-header') as HTMLElement;
      header.setAttribute('id', id);
      const headerTitle = document.createElement('div') as HTMLElement;
      headerTitle.id = `${id}-name`;
      headerTitle.setAttribute('data-save', '1');
      headerTitle.setAttribute('contenteditable', 'true');
      headerTitle.innerText = `Controller ${index}`;
      header.appendChild(headerTitle);
      newElem.appendChild(header);

      const inputChannel = document.createElement('controller-input') as HTMLElement;
      inputChannel.setAttribute('id', `${id}-channel`);
      inputChannel.setAttribute('for', id);
      inputChannel.setAttribute('data-attr', 'channel');
      inputChannel.setAttribute('value', '1');
      inputChannel.setAttribute('min', '1');
      inputChannel.setAttribute('max', '16');
      inputChannel.innerText = 'Channel';
      newElem.appendChild(inputChannel);

      const inputCC = document.createElement('controller-input') as HTMLElement;
      inputCC.setAttribute('id', `${id}-cc`);
      inputCC.setAttribute('for', id);
      inputCC.setAttribute('data-attr', 'ccnum');
      inputCC.setAttribute('value', index);
      inputCC.innerText = 'CC Number';
      newElem.appendChild(inputCC);

      const slider = document.createElement('controller-slider') as HTMLElement;
      slider.setAttribute('id', `${id}-slider`);
      slider.setAttribute('name', id);
      slider.setAttribute('data-attr', 'cc');
      newElem.appendChild(slider);

      parent?.parentElement?.insertBefore(newElem, parent.nextSibling);
    }
  }

}