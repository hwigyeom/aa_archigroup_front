import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AddSVG, DeleteSVG, ExcelSVG, PrintSVG, SaveSVG, SearchSVG } from './icons.js';

import './button.ts';

@customElement('page-container')
export class PageContainer extends LitElement {
  @property({ type: String, reflect: true }) title: string = '';

  @property({ type: String }) search: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) add: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) delete: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) excel: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) save: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) print: 'show' | 'hide' | 'disabled' = 'show';

  protected render() {
    return html`<header>
        <h3>${this.bullet()}${this.title}</h3>
        <section class="button-group">
          <slot name="buttons"></slot>
          <div class="button-secondary">
            ${this.buttonShow('search')
              ? html`<aa-button
                  class="buttons"
                  ?disabled=${this.buttonDisabled('search')}
                  @click=${(e: Event) => this.buttonClickHandler('search', e)}
                >
                  ${SearchSVG()}조회
                </aa-button>`
              : ''}
            ${this.buttonShow('add')
              ? html`<aa-button
                  ?disabled=${this.buttonDisabled('add')}
                  @click=${(e: Event) => this.buttonClickHandler('add', e)}
                >
                  ${AddSVG()}추가
                </aa-button>`
              : ''}
            ${this.buttonShow('delete')
              ? html`<aa-button
                  ?disabled=${this.buttonDisabled('delete')}
                  @click=${(e: Event) => this.buttonClickHandler('delete', e)}
                >
                  ${DeleteSVG()}삭제
                </aa-button>`
              : ''}
            ${this.buttonShow('excel')
              ? html`<aa-button
                  ?disabled=${this.buttonDisabled('excel')}
                  @click=${(e: Event) => this.buttonClickHandler('excel', e)}
                >
                  ${ExcelSVG()}엑셀다운
                </aa-button>`
              : ''}
            ${this.buttonShow('save')
              ? html`<aa-button
                  ?disabled=${this.buttonDisabled('save')}
                  @click=${(e: Event) => this.buttonClickHandler('save', e)}
                >
                  ${SaveSVG()}저장
                </aa-button>`
              : ''}
            ${this.buttonShow('print')
              ? html`<aa-button
                  ?disabled=${this.buttonDisabled('print')}
                  @click=${(e: Event) => this.buttonClickHandler('print', e)}
                >
                  ${PrintSVG()}인쇄
                </aa-button>`
              : ''}
          </div>
        </section>
      </header>
      <div class="content"><slot></slot></div>`;
  }

  private buttonDisabled(name: string): boolean {
    switch (name) {
      case 'search':
        return this.search === 'disabled';
      case 'add':
        return this.add === 'disabled';
      case 'delete':
        return this.delete === 'disabled';
      case 'excel':
        return this.excel === 'disabled';
      case 'save':
        return this.save === 'disabled';
      case 'print':
        return this.print === 'disabled';
      default:
        return false;
    }
  }

  private buttonShow(name: string): boolean {
    switch (name) {
      case 'search':
        return this.search !== 'hide';
      case 'add':
        return this.add !== 'hide';
      case 'delete':
        return this.delete !== 'hide';
      case 'excel':
        return this.excel !== 'hide';
      case 'save':
        return this.save !== 'hide';
      case 'print':
        return this.print !== 'hide';
      default:
        return false;
    }
  }

  private buttonClickHandler(name: string, e: Event) {
    this.dispatchEvent(new CustomEvent(name, e));
  }

  private bullet() {
    return html`<svg width="4" height="19" viewBox="0 0 4 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y=".5" width="4" height="18" rx="2" fill="#5F6A76" />
      <path d="M0 2.5a2 2 0 1 1 4 0v4H0z" fill="#2F3136" />
    </svg>`;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      border-top-left-radius: 16px;
      align-items: stretch;
      width: 100%;
      background-color: #fff;
      border: 1px solid var(--divider-color);
    }

    header {
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

    section.button-group {
      display: flex;
    }

    section.button-group > div {
      display: flex;
      flex-direction: row;
      margin-left: 4px;
    }
    section.button-group > div:first-child {
      margin-left: 0;
    }

    section.button-group > div > aa-button {
      margin-left: 4px;
    }
    section.button-group > div > aa-button:first-child {
      margin-left: 0;
    }

    h3 svg {
      margin-right: 10px;
    }

    div.content {
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
