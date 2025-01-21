import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SearchSVG } from '../components/icons.ts';

@customElement('menu-search')
export class MenuSearch extends LitElement {
  protected render() {
    return html`<input type="text" placeholder="메뉴검색" /><button>${SearchSVG()}</button>`;
  }

  public setFocus() {
    this.shadowRoot?.querySelector('input')?.focus();
  }

  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }

    input[type='text'] {
      box-sizing: border-box;
      height: 32px;
      width: 186px;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      border-radius: 4px;
      padding: 0 28px 0 8px;
      font-family: var(--font-fmaily), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
    }

    input[type='text']::placeholder {
      color: var(--font-placeholder);
    }
    input[type='text']:hover {
      border-color: var(--input-border-hover);
    }

    input[type='text']:focus {
      border-color: var(--input-border-active);
      outline: none;
    }

    button {
      height: 16px;
      width: 16px;
      padding: 0;
      background-color: transparent;
      border: none;
      margin-left: -25px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-search': MenuSearch;
  }
}
