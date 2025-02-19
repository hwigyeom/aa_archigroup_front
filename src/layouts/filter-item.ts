import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aa-filter-item')
export class FilterItem extends LitElement {
  @property({ type: String }) label: string = '';
  @property({ type: Boolean }) required: boolean = false;
  @property({ type: Number }) column: number = 1;
  @property({ type: Number }) row: number = 1;
  @property({ type: Number, attribute: 'column-end' }) columnEnd: number = 0;
  @property({ type: Number, attribute: 'row-end' }) rowEnd: number = 0;
  @property({ type: Number, attribute: 'label-min-width' }) labelMinWidth: number = 0;
  protected render() {
    return html`
      <style>
        :host {
          grid-column-start: ${this.column};
          ${this.columnEnd > this.column ? `grid-column-end: ${this.columnEnd};` : nothing}
          grid-row-start: ${this.row};
          ${this.rowEnd > this.row ? `grid-row-end: ${this.rowEnd};` : nothing}
        }
        ${this.labelMinWidth > 0 ? `label { min-width: ${this.labelMinWidth}px; }` : nothing}
      </style>
      ${this.label ? html`<label class="${this.required ? 'required' : nothing}">${this.label}</label>` : nothing}
      <slot></slot>
    `;
  }

  static styles = css`
    :host {
      font-family: var(--font-family), serif;
      color: var(--font-secondary);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 4px;
    }
    label {
      display: flex;
      position: relative;
      justify-content: flex-end;
      font-weight: var(--font-weight-semi-bold);
      align-items: center;
      font-size: 12px;
      min-width: 60px;
      padding: 0;
      margin-right: 8px;
    }
    label::after {
      display: flex;
      align-items: center;
      justify-content: center;
      content: '';
      width: 8px;
    }
    label.required::after {
      display: flex;
      align-items: center;
      justify-content: center;
      content: '*';
      width: 6px;
      color: var(--state-negative);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-filter-item': FilterItem;
  }
}
