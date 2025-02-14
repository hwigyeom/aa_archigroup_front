import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { DatePicker } from './date-picker.js';
import { Calendar } from './calendar.js';

import './calendar.js';

@customElement('aa-date-picker-popover')
export class DatePickerPopover extends LitElement {
  @property({ type: HTMLElement }) owner: HTMLElement | null = null;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  @query('aa-calenar') private calendar!: Calendar;

  private get picker(): DatePicker | null {
    return this.owner as DatePicker;
  }

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

  protected render() {
    return this.open ? html`<aa-calendar></aa-calendar>` : html``;
  }

  private handleOutsideClick(e: MouseEvent) {
    if (!this.contains(e.target as Node) && !this.contains(e.target as Node)) {
      if (this.owner && !this.owner.contains(e.target as Node)) {
        // this.open = this.owner.open = false;
        this.open = false;
        this.updatePopover();
      }
    }
  }

  private handleScroll(e: Event) {
    if (this.open && this.owner && !this.contains(e.target as Node)) {
      // this.open = this.owner.open = false;
      this.open = false;
      this.updatePopover();
    }
  }

  private updatePopover() {
    if (!this.owner) return;
    const ownerRect = this.owner.getBoundingClientRect();
    const popoverRect = this.getBoundingClientRect();
    const spaceBelow = window.innerHeight - ownerRect.bottom;
    const spaceAbove = ownerRect.top;
    const spaceLeft = ownerRect.right;
    if (spaceBelow < popoverRect.height && spaceAbove > popoverRect.height) {
      // Display above
      this.style.top = `${ownerRect.top - popoverRect.height}px`;
    } else {
      this.style.top = `${ownerRect.bottom}px`;
    }
    if (spaceLeft < popoverRect.width) {
      this.style.left = `${ownerRect.left}px`;
    } else {
      this.style.right = `${ownerRect.right}px`;
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: none;
      position: absolute;
      z-index: 720;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      margin: 4px 0;
      border-radius: 8px;
      height: 298px;
      width: 292px;
    }

    :host([open]) {
      display: flex;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-date-picker-popover': DatePickerPopover;
  }
}
