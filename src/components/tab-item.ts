import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aa-tab-item')
export class TabItem extends LitElement {
  @property({ type: String, attribute: true }) id: string = '';
  @property({ type: String, reflect: true }) caption: string = 'Tab';
  @property({ type: Boolean, reflect: true }) active: boolean = false;

  protected render() {
    return html`<slot></slot>`;
  }

  static styles = css`
    :host {
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-default);
      color: var(--font-primary);
      display: none;
    }
    :host([active]) {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-tab-item': TabItem;
  }
}
