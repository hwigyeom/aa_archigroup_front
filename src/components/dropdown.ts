import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DropdownPopover } from './dropdown-popover.js';
import { getIcon } from './icons.js';
import { DropdownItem } from './dropdown-item.ts';

@customElement('aa-dropdown')
export class Dropdown extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) readonly: boolean = false;
  @property({ type: Boolean, reflect: true }) open: boolean = false;
  @property({ type: String }) placeholder: string = '';

  private _value: string = '';
  @property({ type: String, reflect: true })
  get value() {
    return this._value;
  }
  set value(newValue: string) {
    const oldValue = this._value;
    this._value = newValue;
    this.requestUpdate('value', oldValue);
    this.updateTextFromValue();
  }
  private _text: string = '';
  @property({ type: String, reflect: true })
  get text() {
    return this._text;
  }

  private popoverElement: DropdownPopover | null = null;

  public toggle() {
    if (this.popoverElement && !this.disabled && !this.readonly) {
      this.open = this.popoverElement.open = !this.popoverElement.open;
    }
  }

  public bindItems(items: { value: string; text: string }[]) {
    if (this.popoverElement) {
      this.popoverElement.shadowRoot?.querySelectorAll('aa-dropdown-item').forEach((item) => {
        item.remove();
      });
      const fragment = document.createDocumentFragment();
      items.forEach((item) => {
        const dropdownItem = document.createElement('aa-dropdown-item');
        dropdownItem.value = item.value;
        dropdownItem.textContent = item.text;
        fragment.appendChild(dropdownItem);
      });
      if (fragment.childElementCount > 0) {
        this.popoverElement.shadowRoot?.appendChild(fragment);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.popoverElement) {
      this.popoverElement = document.createElement('aa-dropdown-popover') as DropdownPopover;
      this.popoverElement.owner = this;
      this.popoverElement.addEventListener('select', this.handleSelect.bind(this));
      document.body.appendChild(this.popoverElement);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removePopover();
  }

  protected firstUpdated() {
    this.shadowRoot!.querySelector('slot')!.addEventListener('slotchange', this.handleSlotChange.bind(this));
  }

  protected render() {
    return html`
      <div class="dropdown" @click=${this.toggle}>
        ${this.text || !this.placeholder ? html`<span class="text">${this.text}</span>` : ''}
        ${!this.text && this.placeholder ? html`<span class="placeholder">${this.placeholder}</span>` : ''}
        <button type="button" ?disabled=${this.readonly || this.disabled}>
          ${this.popoverElement && this.open ? getIcon('svg', 'chevron-up')() : getIcon('svg', 'chevron-down')()}
        </button>
      </div>
      <slot></slot>
    `;
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });

    nodes.forEach((node) => {
      if (node instanceof HTMLElement && node.tagName.toLowerCase() === 'aa-dropdown-item') {
        this.popoverElement!.shadowRoot!.appendChild(node);
      } else {
        node.parentNode?.removeChild(node);
      }
    });

    this.updateTextFromValue();
  }

  private removePopover() {
    if (this.popoverElement) {
      document.body.removeChild(this.popoverElement);
    }
  }

  private handleSelect(e: Event) {
    const detail = (e as CustomEvent).detail;
    if (this.value !== detail.value) {
      this.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }));
    }
    this.value = detail.value;
    this.toggle();
  }

  private async updateTextFromValue() {
    const dropdownItems = this.popoverElement?.shadowRoot?.querySelectorAll('aa-dropdown-item');
    if (dropdownItems) {
      let matched: DropdownItem | null = null;

      for (const dropdownItem of dropdownItems) {
        if (dropdownItem.value === this.value) {
          matched = dropdownItem;
          break;
        }
      }

      await this.updateComplete;

      if (matched) {
        const oldText = this.text;
        this._text = matched.text;
        this.requestUpdate('text', oldText);
      } else {
        const oldValue = this.value;
        const oldText = this.text;
        this._value = '';
        this._text = '';
        this.requestUpdate('value', oldValue);
        this.requestUpdate('text', oldText);
      }
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      min-width: 150px;
    }

    div.dropdown {
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      background-color: var(--input-surface-normal);
      font-size: 12px;
      padding: 0 0 0 8px;
      margin: 0;
      min-height: 24px;
      width: 100%;
      cursor: pointer;
    }

    div.dropdown > span.placeholder {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
      color: var(--font-placeholder);
    }
    div.dropdown > span.text {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-grow: 1;
      color: var(--font-primary);
    }

    div.dropdown > button {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-left: 1px solid var(--input-border-normal);
      cursor: pointer;
      background-color: transparent;
      padding: 4px;
      margin: 0 0 0 -26px;
    }

    div.dropdown:hover {
      border-color: var(--input-border-hover);
    }
    div.dropdown:hover button {
      border-color: var(--input-border-hover);
    }

    :host([open]) div.dropdown {
      border-color: var(--input-border-active);
    }
    :host([open]) div.dropdown button {
      border-color: var(--input-border-active);
    }

    :host([disabled]) div.dropdown {
      border-color: var(--input-border-disable);
      background-color: var(--input-surface-disabled);
      cursor: not-allowed;
    }
    :host([disabled]) div.dropdown span.text,
    :host([disabled]) div.dropdown span.placeholder {
      color: var(--font-disable);
    }
    :host([disabled]) div.dropdown button {
      border-color: var(--input-border-disable);
    }

    div.dropdown > button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-dropdown': Dropdown;
  }
}
