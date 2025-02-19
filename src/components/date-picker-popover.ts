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

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);

    this.calendar.addEventListener('selected', this.calendarSelectedHandler.bind(this));
  }

  public show(value: string = '') {
    const alreadyExists = document.querySelectorAll('aa-date-picker-popover');
    if (alreadyExists.length > 0) {
      alreadyExists.forEach((popover) => {
        if (popover !== this) {
          popover.hide();
        }
      });
    }
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
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick);
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
      this.hide();
    }
  }

  private updatePopoverPosition() {
    if (!this.owner) return;

    const ownerRect = this.owner.getBoundingClientRect();
    const popoverRect = this.getBoundingClientRect();
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

    // 뷰포트 기준 가용 공간을 계산 (스크롤 오프셋 미포함)
    const spaceBelow = document.documentElement.clientHeight - ownerRect.bottom;
    const spaceAbove = ownerRect.top;
    const spaceLeft = ownerRect.right;

    let top: number;
    let left: number;

    // 수직 위치: 아래 공간이 부족하면 위쪽으로 출력
    if (spaceBelow < popoverRect.height && spaceAbove > popoverRect.height) {
      const popoverStyles = window.getComputedStyle(this);
      top =
        ownerRect.top -
        popoverRect.height -
        parseFloat(popoverStyles.marginBottom) -
        parseFloat(popoverStyles.marginTop);
    } else {
      top = ownerRect.bottom;
    }
    top += scrollTop; // 절대 좌표로 변환

    if (spaceLeft < popoverRect.width) {
      left = ownerRect.left;
    } else {
      left = ownerRect.right - popoverRect.width;
    }

    left += scrollLeft; // 절대 좌표로 변환

    this.style.top = `${top}px`;
    this.style.left = `${left}px`;
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
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-date-picker-popover': DatePickerPopover;
  }
}
