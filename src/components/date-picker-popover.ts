import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { DatePicker } from './date-picker.js';
import { Calendar } from './calendar.js';

import './calendar.js';

@customElement('aa-date-picker-popover')
export class DatePickerPopover extends LitElement {
  @state() type: 'date' | 'month' | 'year' = 'date';
  @state() value: string = '';

  @query('aa-calendar') private calendar!: Calendar;

  owner: HTMLElement | DatePicker | null = null;

  private handleOutsideClick = this.outsideClickHandler.bind(this);
  private handleOutsideScroll = this.outsideScrollHandler.bind(this);

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this.calendar.addEventListener('selected', this.calendarSelectedHandler.bind(this));
  }

  public show(value: string) {
    this.value = value;
    document.body.appendChild(this);
  }

  public hide() {
    this.remove();
    this.value = '';
    this.calendar.dispatchEvent(new CustomEvent('closed', { bubbles: true, composed: true }));
  }

  connectedCallback() {
    super.connectedCallback();
    this.updatePopoverPosition();
    document.addEventListener('click', this.handleOutsideClick);
    window.addEventListener('scroll', this.handleOutsideScroll);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
    window.removeEventListener('scroll', this.handleOutsideScroll);
    super.disconnectedCallback();
  }

  protected render() {
    return html`<aa-calendar .mode=${this.type} value=${this.value}></aa-calendar>`;
  }

  private calendarSelectedHandler(e: Event) {
    e.stopPropagation();
    setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('selected', { detail: { ...(e as CustomEvent).detail }, bubbles: true, composed: true })
      );
      this.hide();
    }, 100);
  }

  private outsideClickHandler(e: MouseEvent) {
    if (!this.contains(e.target as Node)) {
      // if (this.owner && !this.owner.contains(e.target as Node)) {
      this.hide();
      this.dispatchEvent(new CustomEvent('closed', { bubbles: true, composed: true }));
      // }
    }
  }

  private outsideScrollHandler(e: Event) {
    if (!this.contains(e.target as Node)) {
      this.hide();
    }
  }

  private updatePopoverPosition() {
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
      this.style.left = `${ownerRect.right - popoverRect.width}px`;
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      position: absolute;
      z-index: 720;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      margin: 4px 0;
      border-radius: 8px;
      height: 298px;
      width: 292px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-date-picker-popover': DatePickerPopover;
  }
}
