import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import { ICON_DISABLED_COLOR } from './constants.js';

@customElement('aa-calendar-year-view')
export class CalendarYearView extends LitElement {
  @property({ type: Number }) year: number | null = null;

  @property({ type: String })
  get value(): string | null {
    return this.year?.toString() ?? null;
  }
  set value(year: string | null) {
    if (year) {
      this.setYear(parseInt(year, 10));
    } else {
      this.setYear(null);
    }
  }

  @property({ type: String })
  get text(): string {
    return this.year?.toString() ?? '';
  }

  @property({ type: Number }) currentYear: number = new Date().getFullYear();

  protected render() {
    const { start, end } = this.findYearRange(this.currentYear);
    return html`
      <header>
        <div class="calendar-title">${start}~${end}년</div>
        <div class="buttons">
          <button type="button" class="prev" @click=${() => (this.currentYear = start - 1)}>이전</button>
          <button type="button" class="next" @click=${() => (this.currentYear = end + 1)}>다음</button>
        </div>
      </header>
      <section class="calendar">
        ${Array.from({ length: end - start + 1 }, (_, i) => start + i).map((year) => {
          return html`<div
            @click=${() => {
              this.setYear(year, true);
            }}
            class="year-cell${year === new Date().getFullYear() ? ' this-year' : ''}${year === this.year
              ? ' selected'
              : ''}"
          >
            ${year}
          </div>`;
        })}
      </section>
    `;
  }

  private setYear(year: number | null, event: boolean = false) {
    this.year = year;
    this.dispatchEvent(new CustomEvent('change', { detail: { year }, bubbles: true, composed: true }));

    if (year !== null) {
      if (event) {
        this.dispatchEvent(new CustomEvent('year-selected', { detail: { year }, bubbles: true, composed: true }));
      }
    }
  }

  private findYearRange(year: number, groupSize: number = 12): { start: number; end: number } {
    const baseYear = 1;
    const rangeStart = Math.floor((year - baseYear) / groupSize) * groupSize + baseYear;
    return { start: rangeStart, end: rangeStart + groupSize - 1 };
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
      margin: 8px 16px;
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
      color: var(--primary-color);
      font-weight: var(--font-weight-bold);
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
      margin-bottom: 8px;
    }

    .year-cell {
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

    .year-cell.this-year {
      background-color: #e0eff9;
    }

    .year-cell.selected {
      background-color: var(--select-color);
      color: var(--font-inverse);
      font-weight: var(--font-weight-semi-bold);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-calendar-year-view': CalendarYearView;
  }
}
