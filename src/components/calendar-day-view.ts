import { css, html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import { DATE_SPLITTER, ICON_ACTIVE_COLOR, ICON_DISABLED_COLOR } from './constants.js';

@customElement('aa-calendar-day-view')
export class CalendarDayView extends LitElement {
  @property({ type: Date }) date: Date | null = null;
  @property({ type: String, reflect: true }) value: string | null = null;
  @property({ type: String, reflect: true }) text: string | null = null;
  @property({ type: Number }) currentYear: number = new Date().getFullYear();
  @property({ type: Number }) currentMonth: number = new Date().getMonth();

  get year(): number | null {
    return this.date?.getFullYear() ?? null;
  }

  get month(): number | null {
    return this.date ? this.date.getMonth() + 1 : null;
  }

  get day(): number | null {
    return this.date?.getDate() ?? null;
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'value') {
      const date = this.parseDate(value || '');
      if (value && !date) {
        console.error(`aa-calendar-day-view[${name}]: Invalid date format: ${value}`);
      }
      this.date = date;
    }
  }

  protected update(changes: PropertyValues) {
    if (changes.has('date')) {
      this.value = this.date
        ? `${this.date.getFullYear()}${String(this.date.getMonth() + 1).padStart(2, '0')}${String(this.date.getDate()).padStart(2, '0')}`
        : '';
      this.text = this.date
        ? `${this.date.getFullYear()}${DATE_SPLITTER}${String(this.date.getMonth() + 1).padStart(2, '0')}${DATE_SPLITTER}${String(this.date.getDate()).padStart(2, '0')}`
        : '';
      if (this.date) {
        this.currentYear = this.date.getFullYear();
        this.currentMonth = this.date.getMonth();
      }
    }
    super.update(changes);
  }

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
                  ? () => this.setDate(day, true)
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

  private setDate(date: Date | null, event: boolean = false) {
    this.date = date;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          date,
          year: date?.getFullYear() ?? null,
          month: date ? date.getMonth() + 1 : null,
          day: date?.getDate() ?? null,
        },
        bubbles: true,
        composed: true,
      })
    );

    if (date) {
      if (event) {
        this.dispatchEvent(
          new CustomEvent('date-selected', {
            detail: { date, year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() },
            bubbles: true,
            composed: true,
          })
        );
      }
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
    'aa-calendar-day-view': CalendarDayView;
  }
}
