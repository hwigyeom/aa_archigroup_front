import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('dimmed-overlay')
export class DimmedOverlay extends LitElement {
  protected render() {
    return html`&nbsp;`;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 900;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'dimmed-overlay': DimmedOverlay;
  }
}
