import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('global-menu-tree')
export class GlobalMenuTree extends LitElement {
  protected render() {
    return html`<nav>menu tree</nav>`;
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      top: 48px;
      left: 58px;
      bottom: 0;
      width: 218px;
      padding: 24px 16px;
    }

    nav {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'global-menu-tree': GlobalMenuTree;
  }
}
