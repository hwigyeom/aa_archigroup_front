import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../components/button.js';
import './main-buttons.js';

@customElement('page-container')
export class PageContainer extends LitElement {
  @property({ type: String, reflect: true }) title: string = '';

  @property({ type: String }) search: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) add: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) delete: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) excel: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) save: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) print: 'show' | 'hide' | 'disabled' = 'show';

  @property({ type: Boolean, attribute: 'hide-main-buttons' }) hideMainButtons: boolean = false;
  @property({ type: Boolean, attribute: 'hide-header' }) hideHeader: boolean = false;

  protected render() {
    return html`${!this.hideHeader
        ? html`<header>
            <h3>${this.bullet()}${this.title}</h3>
            ${!this.hideMainButtons
              ? html`
                  <main-buttons
                    search=${this.search}
                    add=${this.add}
                    delete=${this.delete}
                    excel=${this.excel}
                    save=${this.save}
                    print=${this.print}
                    @search=${(e: Event) => this.dispatchEvent(new CustomEvent('search', e))}
                    @add=${(e: Event) => this.dispatchEvent(new CustomEvent('add', e))}
                    @delete=${(e: Event) => this.dispatchEvent(new CustomEvent('delete', e))}
                    @excel=${(e: Event) => this.dispatchEvent(new CustomEvent('excel', e))}
                    @save=${(e: Event) => this.dispatchEvent(new CustomEvent('save', e))}
                    @print=${(e: Event) => this.dispatchEvent(new CustomEvent('print', e))}
                  >
                    <slot name="buttons"></slot>
                  </main-buttons>
                `
              : ''}
          </header>`
        : ''}
      <div class="content"><slot></slot></div>`;
  }

  private bullet() {
    return html`<svg width="4" height="19" viewBox="0 0 4 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y=".5" width="4" height="18" rx="2" fill="#5F6A76" />
      <path d="M0 2.5a2 2 0 1 1 4 0v4H0z" fill="#2F3136" />
    </svg>`;
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border-top-left-radius: 16px;
      align-items: stretch;
      width: 100%;
      background-color: #fff;
      border: 1px solid var(--divider-color);
    }

    header {
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 72px;
      padding: 0 24px;
      border-bottom: 1px solid var(--divider-color);
      position: sticky;
      top: 49px;
      background-color: #fff;
      border-top-left-radius: 16px;
      z-index: 300;
    }

    h3 {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-fmaily), serif;
      font-weight: var(--font-weight-bold);
      font-size: 18px;
      color: var(--primary-color);
      flex-grow: 2;
    }

    h3 svg {
      margin-right: 10px;
    }

    div.content {
      display: flex;
      flex-grow: 1;
      padding: 16px 24px 24px 24px;
    }

    header:before {
      position: absolute;
      display: block;
      content: '';
      top: -1px;
      right: 0;
      left: -1px;
      height: 16px;
      background-color: var(--body-surface-color);
    }
    header:after {
      position: absolute;
      display: block;
      content: '';
      top: -1px;
      left: -1px;
      right: 0;
      height: 16px;
      background-color: #fff;
      border: 1px solid var(--divider-color);
      border-bottom: none;
      border-top-left-radius: 16px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'page-container': PageContainer;
  }
}
