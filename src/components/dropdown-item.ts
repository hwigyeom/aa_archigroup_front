import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aa-dropdown-item')
export class DropdownItem extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: Boolean, reflect: true }) selected: boolean = false;

  get text(): string {
    return this.getText();
  }

  protected render() {
    return html`<div @click=${this.handleClick}><slot></slot></div>`;
  }

  private getText(): string {
    let text = '';
    const slot = this.shadowRoot?.querySelector('slot');
    if (slot) {
      const assignedNodes = slot.assignedNodes({ flatten: true });
      Array.from(assignedNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        }
      });
    }
    return text;
  }

  private handleClick() {
    this.dispatchEvent(
      new CustomEvent('select', { detail: { value: this.value, text: this.getText() }, bubbles: true, composed: true })
    );
  }

  static styles = css`
    div {
      font-family: var(--font-family), serif;
      font-size: 12px;
      color: var(--font-primary);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      overflow-y: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 24px;
      padding: 0 8px;
    }
    div:hover {
      background-color: #f6f7fa;
    }
    div:active {
      color: var(--select-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-dropdown-item': DropdownItem;
  }
}
