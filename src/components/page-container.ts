import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import icons from './icons.js';
import './button-generic.ts';
import './button-primary.ts';

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
          <div class="button-primary">
            ${this.buttonShow('excel')
              ? html`<button-primary
                  class="buttons"
                  ?disabled=${this.buttonDisabled('excel')}
                  @click=${(e: Event) => this.buttonClickHandler('excel', e)}
                >
                  ${icons.excel(icons.color.inverse)}엑셀다운
                </button-primary>`
              : ''}
            ${this.buttonShow('save')
              ? html`<button-primary
                  class="buttons"
                  ?disabled=${this.buttonDisabled('save')}
                  @click=${(e: Event) => this.buttonClickHandler('save', e)}
                >
                  ${icons.save(icons.color.inverse)}저장
                </button-primary>`
              : ''}
            ${this.buttonShow('print')
              ? html`<button-primary
                  class="buttons"
                  ?disabled=${this.buttonDisabled('print')}
                  @click=${(e: Event) => this.buttonClickHandler('print', e)}
                >
                  ${icons.print(icons.color.inverse)}인쇄
                </button-primary>`
              : ''}
          </div>
          <div class="button-secondary">
            ${this.buttonShow('search')
              ? html`<button-generic
                  class="buttons"
                  ?disabled=${this.buttonDisabled('search')}
                  @click=${(e: Event) => this.buttonClickHandler('search', e)}
                >
                  ${icons.search()}조회
                </button-generic>`
              : ''}
            ${this.buttonShow('add')
              ? html`<button-generic
                  class="buttons"
                  ?disabled=${this.buttonDisabled('add')}
                  @click=${(e: Event) => this.buttonClickHandler('add', e)}
                >
                  ${icons.add()}추가
                </button-generic>`
              : ''}
            ${this.buttonShow('delete')
              ? html`<button-generic
                  class="buttons"
                  ?disabled=${this.buttonDisabled('delete')}
                  @click=${(e: Event) => this.buttonClickHandler('delete', e)}
                >
                  ${icons.delete()}삭제
                </button-generic>`
              : ''}
          </div>
          <div class="button-additional">
            <slot name="buttons"></slot>
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
      font-size: 18px;
      font-weight: 700;
      position: sticky;
      top: 49px;
      background-color: #fff;
      border-top-left-radius: 16px;
    }

    h3 {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      color: var(--primary-color);
      flex-grow: 2;
    }

    section.button-group {
      display: flex;
      flex-direction: row-reverse;
    }

    section.button-group > div {
      display: flex;
      flex-direction: row;
      margin-right: 10px;
    }
    section.button-group > div:first-child {
      margin-right: 0;
    }

    section.button-group > div > .buttons {
      margin-left: 4px;
    }
    section.button-group > div > .buttons:first-child {
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
