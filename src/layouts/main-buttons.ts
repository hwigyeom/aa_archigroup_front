import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AddSVG, DeleteSVG, ExcelSVG, PrintSVG, SaveSVG, SearchSVG } from '../components/icons.ts';

@customElement('main-buttons')
export class MainButtons extends LitElement {
  @property({ type: String }) search: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) add: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) delete: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) excel: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) save: 'show' | 'hide' | 'disabled' = 'show';
  @property({ type: String }) print: 'show' | 'hide' | 'disabled' = 'show';

  protected render() {
    return html`<slot name="buttons"></slot>
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
      </div>`;
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

  static styles = css`
    :host {
      display: flex;
    }

    div {
      display: flex;
      flex-direction: row;
      margin-left: 4px;
    }
    div:first-child {
      margin-left: 0;
    }
    div > aa-button {
      margin-left: 4px;
    }
    div > aa-button:first-child {
      margin-left: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'main-buttons': MainButtons;
  }
}
