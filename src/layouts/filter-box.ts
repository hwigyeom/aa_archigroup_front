import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FilterItem } from './filter-item.ts';

@customElement('aa-filter-box')
export class FilterBox extends LitElement {
  @property({ type: Number }) columns: number = 4;
  @property({ type: Number }) rows: number = 1;
  @property({ type: Number, attribute: 'label-min-width' }) labelMinWidth: number = 0;

  /*@queryAssignedElements({ selector: 'aa-filter-item' })
  private items!: FilterItem[];*/

  protected firstUpdated() {
    this.shadowRoot!.querySelector('slot')!.addEventListener('slotchange', this.handleSlotChange.bind(this));
  }

  protected render() {
    return html` <style>
        :host {
          grid-template-columns: repeat(${this.columns}, 1fr);
          grid-template-rows: repeat(${this.rows}, 24px);
        }
      </style>
      <slot></slot>`;
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });

    nodes.forEach((node) => {
      if (!(node instanceof FilterItem && node.tagName.toLowerCase() === 'aa-filter-item')) {
        node.parentNode?.removeChild(node);
      } else {
        if (this.labelMinWidth > 0) {
          const item = node as FilterItem;
          item.labelMinWidth = this.labelMinWidth;
        }
      }
    });
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: grid;
      row-gap: 6px;
      background-color: #fafafb;
      border: 1px solid #e8e9e9;
      padding: 12px 24px;
      min-height: 48px;
      border-radius: 6px;
      margin-bottom: 16px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-filter-box': FilterBox;
  }
}
