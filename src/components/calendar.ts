import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { CalendarDayView } from './calendar-day-view.js';
import { CalendarMonthView } from './calendar-month-view.js';
import { CalendarYearView } from './calendar-year-view.ts';
import { DATE_SPLITTER } from './constants.ts';

import './calendar-day-view.js';
import './calendar-month-view.js';
import './calendar-year-view.js';

@customElement('aa-calendar')
export class Calendar extends LitElement {
  @property({ type: String }) mode: 'date' | 'month' | 'year' = 'date';
  @property({ type: Date }) date: Date | null = null;
  @property({ type: String, reflect: true }) value: string | null = null;
  @property({ type: String, reflect: true }) text: string | null = null;

  @state() private currentCalendar: 'date' | 'month' | 'year' = this.mode;
  @state() private currentYear: number = new Date().getFullYear();
  @state() private currentMonth: number = new Date().getMonth();

  @query('aa-calendar-day-view') private dayView!: CalendarDayView;
  @query('aa-calendar-month-view') private monthView!: CalendarMonthView;
  @query('aa-calendar-year-view') private yearView!: CalendarYearView;

  connectedCallback() {
    super.connectedCallback();
    this.currentCalendar = this.mode;
  }

  attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
    super.attributeChangedCallback(name, _oldVal, newVal);
    if (name === 'value') {
      const date = this.parseDate(newVal, this.mode);
      if (newVal !== '' && newVal != null && !date) {
        console.error(`aa-calendar[${name}]: Invalid date format: ${newVal}`);
      }
      this.date = date;
    }
  }

  protected update(changes: PropertyValues) {
    if (changes.has('date')) {
      this.value = this.formattedDateString(this.date, this.mode, '') ?? '';
      this.text = this.formattedDateString(this.date, this.mode, DATE_SPLITTER) ?? '';
      if (this.date) {
        this.currentYear = this.date.getFullYear();
        this.currentMonth = this.date.getMonth();
      }
    }
    super.update(changes);
  }

  protected render() {
    switch (this.currentCalendar) {
      case 'date':
        return html`<aa-calendar-day-view
          @month-clicked=${this.moveMonthViewHandler}
          @date-selected=${this.dateSelectedHandler}
          @change=${this.dateChangeHandler}
          .date=${this.date ? new Date(this.date) : null}
          .currentYear=${this.currentYear}
          .currentMonth=${this.currentMonth}
        ></aa-calendar-day-view>`;
      case 'month':
        return html`<aa-calendar-month-view
          @year-clicked=${this.moveYearViewHandler}
          @month-selected=${this.monthSelectedHandler}
          @change=${this.monthChangeHandler}
          .date=${this.date}
          .currentYear=${this.currentYear}
        ></aa-calendar-month-view>`;
      case 'year':
        return html`<aa-calendar-year-view
          @year-selected=${this.yearSelectedHandler}
          @change=${this.yearChangeHandler}
          .year=${this.date ? this.date.getFullYear() : null}
          .currentYear=${this.currentYear}
        ></aa-calendar-year-view>`;
      default:
        return html``;
    }
  }

  private dateSelectedHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'date') {
      this.dispatchEvent(
        new CustomEvent('selected', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: this.formattedDateString(e.detail.date, this.mode, ''),
            text: this.formattedDateString(e.detail.date, this.mode, DATE_SPLITTER),
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private dateChangeHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'date') {
      this.date = e.detail.date;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: this.formattedDateString(e.detail.date, this.mode, ''),
            text: this.formattedDateString(e.detail.date, this.mode, DATE_SPLITTER),
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async moveMonthViewHandler(e: CustomEvent) {
    e.stopPropagation();
    this.currentYear = this.dayView.currentYear;

    this.currentCalendar = 'month';
    await this.updateComplete;

    if (this.date) {
      const month = new Date(this.date);
      month.setDate(1);
      this.monthView.date = month;
    }
  }

  private async monthSelectedHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'month') {
      this.dispatchEvent(
        new CustomEvent('selected', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: this.formattedDateString(e.detail.date, this.mode, ''),
            text: this.formattedDateString(e.detail.date, this.mode, DATE_SPLITTER),
          },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    this.currentCalendar = 'date';
    await this.updateComplete;

    this.currentYear = e.detail.date.getFullYear();
    this.currentMonth = e.detail.date.getMonth();
    this.dayView.currentYear = this.currentYear;
    this.dayView.currentMonth = this.currentMonth;
  }

  private monthChangeHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'month') {
      this.date = e.detail.date;
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: this.formattedDateString(e.detail.date, this.mode, ''),
            text: this.formattedDateString(e.detail.date, this.mode, DATE_SPLITTER),
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private async moveYearViewHandler(e: CustomEvent) {
    e.stopPropagation();
    this.currentYear = this.monthView.currentYear;

    this.currentCalendar = 'year';

    await this.updateComplete;

    if (this.date) {
      this.yearView.year = this.date.getFullYear();
    }
  }

  private async yearSelectedHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'year') {
      this.dispatchEvent(
        new CustomEvent('selected', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: typeof e.detail.year === 'number' ? String(e.detail.year) : null,
            text: typeof e.detail.year === 'number' ? String(e.detail.year) : null,
          },
          bubbles: true,
          composed: true,
        })
      );
      return;
    }

    this.currentCalendar = 'month';

    await this.updateComplete;

    this.currentYear = e.detail.year;
    this.monthView.currentYear = this.currentYear;
  }

  private async yearChangeHandler(e: CustomEvent) {
    e.stopPropagation();
    if (this.mode === 'year') {
      this.date = new Date(e.detail.year, 0, 1);
      this.dispatchEvent(
        new CustomEvent('change', {
          detail: {
            mode: this.mode,
            ...e.detail,
            value: typeof e.detail.year === 'number' ? String(e.detail.year) : null,
            text: typeof e.detail.year === 'number' ? String(e.detail.year) : null,
          },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  private formattedDateString(date: Date | null, mode: string, splitter: string): string | null {
    if (!date) return null;
    switch (mode) {
      case 'date':
        return `${date.getFullYear()}${splitter}${String(date.getMonth() + 1).padStart(2, '0')}${splitter}${String(date.getDate()).padStart(2, '0')}`;
      case 'month':
        return `${date.getFullYear()}${splitter}${String(date.getMonth() + 1).padStart(2, '0')}`;
      case 'year':
        return `${date.getFullYear()}`;
      default:
        return null;
    }
  }

  private parseDate(date: string, mode: 'date' | 'month' | 'year'): Date | null {
    if (!date) return null;

    if (mode === 'year') {
      const year = parseInt(date, 10);
      if (isNaN(year)) {
        return null;
      }
      return new Date(year, 0, 1);
    }

    let regex = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})$/;
    if (mode === 'month') {
      regex = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})?$/;
    }

    const match = date.match(regex);

    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = mode === 'date' ? parseInt(match[3], 10) : 1;
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
      flex-grow: 1;
      margin: 0;
      padding: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-calendar': Calendar;
  }
}
