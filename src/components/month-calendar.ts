import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import { ICON_ACTIVE_COLOR, ICON_DISABLED_COLOR } from './constants.js';

const splitter = '-';

@customElement('aa-month-calendar')
export class MonthCalendar extends LitElement {
  @property({ type: Date }) date: Date | null = null;

  @property({ type: Number })
  get year(): number | null {
    return this.date?.getFullYear() ?? null;
  }
  set year(value: number | null) {
    if (typeof value === 'number') {
      let date: Date;
      if (this.date) {
        date = new Date(value, this.date.getMonth(), 1);
      } else {
        date = new Date(value, 0, 1);
      }
      this.setMonth(date);
    } else {
      this.setMonth(null);
    }
  }

  @property({ type: Number })
  get month(): number | null {
    if (this.date) {
      return this.date.getMonth() + 1;
    } else {
      return null;
    }
  }
  set month(value: number | null) {
    if (typeof value === 'number' && value > 0) {
      let date: Date;
      if (this.date) {
        date = new Date(this.date);
        date.setMonth(value - 1);
      } else {
        date = new Date(new Date().getFullYear(), value - 1, 1);
      }
      this.setMonth(date);
    } else {
      this.setMonth(null);
    }
  }

  @property({ type: String })
  get value(): string | null {
    if (this.date) {
      return `${this.date.getFullYear()}${String(this.date.getMonth() + 1).padStart(2, '0')}`;
    }
    return null;
  }
  set value(date: string | null) {
    if (date === null) {
      this.setMonth(null);
    } else {
      const newDate = this.parseDate(date);
      if (newDate) {
        this.setMonth(newDate);
      }
    }
  }

  @property({ type: String })
  get text(): string {
    if (this.date) {
      return `${this.date.getFullYear()}${splitter}${String(this.date.getMonth() + 1).padStart(2, '0')}`;
    }
    return '';
  }

  @state() private currentYear: number = new Date().getFullYear();

  protected render() {
    return html` <header>
        <div @click=${this.titleClickHandler} class="calendar-title">${this.currentYear}년</div>
        <div class="buttons">
          <button type="button" class="prev" @click=${this.prevYear}>이전</button>
          <button type="button" class="next" @click=${this.nextYear}>다음</button>
        </div>
      </header>
      <section class="calendar">
        ${Array.from({ length: 12 }, (_, i) => i).map((month) => {
          const date = new Date(this.currentYear, month, 1);
          return html`<div
            @click=${() => {
              this.setMonth(date);
            }}
            class="month-cell${date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth()
              ? ' this-month'
              : ''}${date.getFullYear() === this.date?.getFullYear() && date.getMonth() === this.date?.getMonth()
              ? ' selected'
              : ''}"
          >
            ${month + 1}월
          </div>`;
        })}
      </section>`;
  }

  private titleClickHandler() {
    this.dispatchEvent(
      new CustomEvent('year-clicked', {
        detail: { year: this.currentYear },
        bubbles: true,
        composed: true,
      })
    );
  }

  private setMonth(date: Date | null) {
    this.date = date;
    if (date) {
      this.currentYear = date.getFullYear();
    }
    this.dispatchEvent(new CustomEvent('month-selected', { detail: { date }, bubbles: true, composed: true }));
  }

  private prevYear() {
    this.currentYear--;
  }

  private nextYear() {
    this.currentYear++;
  }

  private parseDate(date: string): Date | null {
    if (!date) return null;

    const regex = /^(\d{4})[-/]?(\d{2})$/;
    const match = date.match(regex);

    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      return new Date(year, month, 1);
    } else {
      return null;
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      font-family: var(--font-family), serif;
      color: var(--secondary-color);
      font-size: var(--btn-font-size-small);
      flex-grow: 1;
      margin: 16px 8px;
      padding: 0;
    }

    header {
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 44px;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 8px;
      flex-shrink: 0;
    }

    .calendar-title {
      display: flex;
      align-items: center;
      font-size: 16px;
      padding-left: 8px;
      cursor: pointer;
      color: var(--primary-color);
      font-weight: var(--font-weight-bold);
    }

    .calendar-title::after {
      display: block;
      content: url('${unsafeCSS(getIcon('data-uri', 'caret-down-small')())}');
      width: 16px;
      height: 16px;
      margin-left: 4px;
    }

    .calendar-title:hover::after {
      content: url('${unsafeCSS(getIcon('data-uri', 'caret-down-small')(ICON_ACTIVE_COLOR))}');
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }

    .buttons > button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;
      border-radius: 12px;
      width: 24px;
      height: 24px;
    }

    .buttons > button:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .buttons > button:disabled:hover {
      background-color: transparent;
    }

    .buttons > button.next {
      content: url('${unsafeCSS(getIcon('data-uri', 'chevron-right')('#20293a'))}');
    }

    .buttons > button.prev {
      content: url('${unsafeCSS(getIcon('data-uri', 'chevron-left')('#20293a'))}');
    }

    .buttons > button:disabled.next {
      content: url('${unsafeCSS(getIcon('data-uri', 'chevron-right')(ICON_DISABLED_COLOR))}');
    }

    .buttons > button:disabled.prev {
      content: url('${unsafeCSS(getIcon('data-uri', 'chevron-left')(ICON_DISABLED_COLOR))}');
    }

    section.calendar {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(4, 1fr);
      align-items: center;
      justify-items: center;
      row-gap: 8px;
      column-gap: 14px;
      height: 100%;
      margin-top: 4px;
      padding: 0 3px;
    }

    .month-cell {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 8px;
      color: var(--primary-color);
      font-size: var(--font-size-small);
      cursor: pointer;
    }

    .month-cell.this-month {
      background-color: #e0eff9;
    }

    .month-cell.selected {
      background-color: var(--select-color);
      color: var(--font-inverse);
      font-weight: var(--font-weight-semi-bold);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-month-calendar': MonthCalendar;
  }
}
