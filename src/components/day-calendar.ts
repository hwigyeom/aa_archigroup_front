import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import { ICON_ACTIVE_COLOR, ICON_DISABLED_COLOR } from './constants.js';

const splitter = '-';

@customElement('aa-day-calendar')
export class DayCalendar extends LitElement {
  @property({ type: Date }) date: Date | null = null;

  @property({ type: Number })
  get year(): number | null {
    return this.date?.getFullYear() ?? null;
  }
  set year(value: number | null) {
    if (typeof value === 'number') {
      let date: Date;
      if (this.date) {
        date = new Date(value, this.date.getMonth(), this.date.getDate());
      } else {
        date = new Date(value, 0, 1);
      }
      this.setDate(date);
    } else {
      this.setDate(null);
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
      this.setDate(date);
    } else {
      this.setDate(null);
    }
  }

  @property({ type: Number })
  get day(): number | null {
    if (this.date) {
      return this.date.getDate();
    } else {
      return null;
    }
  }
  set day(value: number | null) {
    if (typeof value === 'number' && value > 0) {
      let date: Date;
      if (this.date) {
        date = new Date(this.date);
        date.setDate(value);
      } else {
        date = new Date(new Date().getFullYear(), new Date().getMonth(), value);
      }
      this.setDate(date);
    } else {
      this.setDate(null);
    }
  }

  @property({ type: String })
  get value(): string | null {
    if (this.date) {
      return `${this.date.getFullYear()}${String(this.date.getMonth() + 1).padStart(2, '0')}${String(
        this.date.getDate()
      ).padStart(2, '0')}`;
    }
    return null;
  }
  set value(value: string | null) {
    if (value) {
      const date = this.parseDate(value);
      this.setDate(date);
    } else {
      this.setDate(null);
    }
  }

  @property({ type: String })
  get text(): string {
    if (this.date) {
      return `${this.date.getFullYear()}${splitter}${String(this.date.getMonth() + 1).padStart(2, '0')}${splitter}${String(this.date.getDate()).padStart(2, '0')}`;
    }
    return '';
  }

  @state() private currentYear: number = new Date().getFullYear();
  @state() private currentMonth: number = new Date().getMonth();

  protected render() {
    return html`
      <header>
        <div @click=${this.titleClickHandler} class="calendar-title">
          ${this.currentYear}년 ${String(this.currentMonth + 1).padStart(2, '0')}월
        </div>
        <div class="buttons">
          <button type="button" class="prev" @click=${this.prevMonth}>이전</button>
          <button type="button" class="next" @click=${this.nextMonth}>다음</button>
        </div>
      </header>
      <section class="calendar">
        ${['일', '월', '화', '수', '목', '금', '토'].map(
          (day, idx) =>
            html`<div class="day-header${idx === 0 ? ' day-sun' : ''}${idx === 6 ? ' day-sat' : ''}">${day}</div>`
        )}
        ${this.getCalendarDays().map((week) =>
          week.map(
            (day, idx) =>
              html`<div
                data-date=${day.getDate()}
                @click=${this.dayInCurrentMonth(day)
                  ? () => this.setDate(day)
                  : () => this.moveMonth(day.getFullYear(), day.getMonth())}
                class="day-cell${idx === 0 ? ' day-sun' : ''}${idx === 6 ? ' day-sat' : ''}${day.getMonth() !==
                this.currentMonth
                  ? ' day-other'
                  : ''}${day.toDateString() === new Date().toDateString() ? ' day-today' : ''}${day.toDateString() ===
                this.date?.toDateString()
                  ? ' selected'
                  : ''}"
              >
                ${day.getDate()}
              </div>`
          )
        )}
      </section>
    `;
  }

  private setDate(date: Date | null) {
    this.date = date;
    if (date) {
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth();
      this.dispatchEvent(
        new CustomEvent('date-selected', {
          detail: { date, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private titleClickHandler() {
    this.dispatchEvent(
      new CustomEvent('month-clicked', {
        detail: { year: this.currentYear, month: this.currentMonth },
        bubbles: true,
        composed: true,
      })
    );
  }

  private prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear -= 1;
    } else {
      this.currentMonth -= 1;
    }
  }

  private nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear += 1;
    } else {
      this.currentMonth += 1;
    }
  }

  private moveMonth(year: number, month: number) {
    this.currentYear = year;
    this.currentMonth = month;
  }

  private getCalendarDays() {
    const startDate = new Date(this.currentYear, this.currentMonth, 1);
    const endDate = new Date(this.currentYear, this.currentMonth + 1, 0);

    const days: Date[][] = [];
    let week: Date[] = [];
    const prevMonthDaysCount = startDate.getDay();

    // 이전 월 날짜를 채움
    for (let i = prevMonthDaysCount; i > 0; i--) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() - i);
      week.push(day);
    }

    // 현재 월 날짜를 채움
    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      if (week.length === 7) {
        days.push(week);
        week = [];
      }
      week.push(new Date(day));
    }

    // 다음 월 날짜를 채움
    for (let i = 1; days.length < 6 || (days.length === 6 && week.length < 7); i++) {
      if (week.length === 7) {
        days.push(week);
        week = [];
      }
      const day = new Date(endDate);
      day.setDate(day.getDate() + i);
      week.push(day);
    }

    return days;
  }

  private dayInCurrentMonth(day: Date) {
    return day.getFullYear() === this.currentYear && day.getMonth() === this.currentMonth;
  }

  private parseDate(date: string): Date | null {
    if (!date) return null;

    const regex = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})$/;
    const match = date.match(regex);

    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
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
      grid-template-columns: repeat(7, minmax(24px, 1fr));
      grid-template-rows: 29px repeat(6, minmax(24px, 1fr));
      align-items: center;
      justify-items: center;
      gap: 8px;
      height: 100%;
    }

    .day-header {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--tertiary-color);
    }

    .day-header.day-sun {
      color: #b40b4e;
    }

    .day-cell {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 24px;
      width: 24px;
      border-radius: 12px;
      color: var(--primary-color);
      font-size: var(--font-size-small);
      cursor: pointer;
    }

    .day-cell.day-sun {
      color: #b40b4e;
    }

    .day-cell.day-other {
      color: var(--font-disable);
    }

    .day-cell.day-today {
      background-color: #e0eff9;
    }

    .day-cell.selected {
      background-color: var(--select-color);
      color: var(--font-inverse);
      font-weight: var(--font-weight-semi-bold);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-day-calendar': DayCalendar;
  }
}
