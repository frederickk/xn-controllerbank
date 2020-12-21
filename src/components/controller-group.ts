import {LitElement, html, customElement, property} from 'lit-element';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/image-icons.js';

// @ts-ignore
import Style from './controller-group.scss';

@customElement('controller-group')
export default class ControllerSlider extends LitElement {
  static get styles() {
		return [Style];
  }

  @property({type: String})
  icon = '';

  @property({type: String})
  save = "innerText";

  render() {
    return html`
      <div id="group">
        <iron-icon icon="${this.icon}"></iron-icon>
        <slot></slot>
      </div>`;
  }
}