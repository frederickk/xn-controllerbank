import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/device-icons.js';
import '@polymer/iron-icons/image-icons.js';

// @ts-ignore
import Style from './controller-button.scss';

@customElement('controller-button')
export default class ControllerButton extends LitElement {
  static get styles() {
		return [Style];
  }

  @property({type: String})
  id = 'controller-button';

  @property({type: String})
  label = '';

  @property({type: String})
  icon = '';

  @property({type: String})
  title = '';

  render() {
    return html`
      <button id="${this.id}" title="${this.title}">
        <iron-icon icon="${this.icon}"></iron-icon>
        ${this.label?
          html`<span class="desc">${this.label}</span>`:
          html``}
      </button>`;
  }
}