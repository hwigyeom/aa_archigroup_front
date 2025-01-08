import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('menu-extender')
export class MenuExtender extends LitElement {
  @property({ type: Boolean }) extended: boolean = false;

  protected render() {
    return html`<a href="#">${this.icon()}</a>`;
  }

  private icon() {
    return this.extended ? this.extendedIcon() : this.collapsedIcon();
  }

  private extendedIcon() {
    return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm10.78 8.22a.75.75 0 0 1 0 1.06l-.72.72h2.44a.75.75 0 0 1 0 1.5h-2.44l.72.72a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z"
          fill="#20293A"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath>
      </defs>
    </svg>`;
  }

  private collapsedIcon() {
    return html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm9.97 8.22a.75.75 0 0 0 0 1.06l.72.72H10a.75.75 0 0 0 0 1.5h2.44l-.72.72a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z"
          fill="#20293A"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath>
      </defs>
    </svg>`;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 58px;
      height: 48px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-extender': MenuExtender;
  }
}
