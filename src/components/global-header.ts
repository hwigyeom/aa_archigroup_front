import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import './menu-extender.js';

@customElement('global-header')
export class GlobalHeader extends LitElement {
  @property() logo: string = '';
  @property() logoAlt: string = '';

  protected render() {
    return html`<h1><img src=${this.logo} alt=${this.logoAlt} /></h1>
      <slot></slot>`;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      height: 48px;
      margin-left: 58px;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
      background-color: var(--body-surface-color);
    }

    h1 {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0 0 0 16px;
      margin: 0;
      flex-grow: 2;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'global-header': GlobalHeader;
  }
}
