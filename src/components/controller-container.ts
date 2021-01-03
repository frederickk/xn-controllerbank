import {LitElement, html, customElement} from 'lit-element';

// @ts-ignore
import Style from './controller-container.scss';

@customElement('controller-container')
export default class ControllerContainer extends LitElement {
  static get styles() {
		return [Style];
  }

  render() {
    return html`<slot></slot>`;
  }
}