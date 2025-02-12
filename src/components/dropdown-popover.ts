import { css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Dropdown } from './dropdown.js';

@customElement('aa-dropdown-popover')
export class DropdownPopover extends LitElement {
  @property({ type: Dropdown }) owner: Dropdown | null = null;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    super.disconnectedCallback();
  }

  protected updated(changes: PropertyValues) {
    super.updated(changes);
    if (changes.has('open')) {
      this.updatePopover();
    }
  }

  private handleOutsideClick(e: MouseEvent) {
    if (!this.contains(e.target as Node) && !this.contains(e.target as Node)) {
      if (this.owner && !this.owner.contains(e.target as Node)) {
        this.open = this.owner.open = false;
        this.updatePopover();
      }
    }
  }

  private handleScroll(e: Event) {
    if (this.open && this.owner && !this.contains(e.target as Node)) {
      this.open = this.owner.open = false;
      this.updatePopover();
    }
  }

  private updatePopover() {
    if (!this.owner) return;
    const rect = this.owner.getBoundingClientRect();
    const popoverHeight = this.getBoundingClientRect().height;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    if (spaceBelow < popoverHeight && spaceAbove > popoverHeight) {
      // Display above
      this.style.top = `${rect.top - popoverHeight}px`;
    } else if (spaceBelow < popoverHeight && spaceAbove < popoverHeight) {
      // Adjust height
      const maxHeight = Math.max(spaceBelow, spaceAbove) - 8;
      this.style.height = `${maxHeight}px}`;
      this.style.top = spaceBelow > spaceAbove ? `${rect.bottom}px` : `${rect.top - maxHeight}px`;
    } else {
      this.style.top = `${rect.bottom}px`;
    }

    this.style.left = `${rect.left}px`;
    this.style.width = `${rect.width}px`;
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: none;
      position: absolute;
      z-index: 720;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      margin: 4px 0 4px 0;
      border-radius: 4px;
      max-height: 500px;
      overflow-y: auto;
    }

    :host([open]) {
      display: block;
    }

    :host::-webkit-scrollbar {
      width: 10px;
    }
    :host::-webkit-scrollbar-track {
      background: transparent;
    }
    :host::-webkit-scrollbar-thumb {
      background-color: #9ca5b166;
      border-radius: 5px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    :host::-webkit-scrollbar-thumb:hover {
      background-color: #9ca5b1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-dropdown-popover': DropdownPopover;
  }
}
