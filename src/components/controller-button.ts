import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/image-icons.js';

// @ts-ignore
import Style from './controller-button.scss';

@customElement('controller-button')
export default class ControllerSlider extends LitElement {
  static get styles() {
		return [Style];
  }

  @property({type: String})
  id = 'controller-button';

  @property({type: String})
  title = '';

  @property({type: String})
  icon = '';

  render() {
    return html`
      <button id="${this.id}">
        <iron-icon icon="${this.icon}"></iron-icon> <span class="desc">${this.title}</span>
      </button>`;
  }
}