import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import { DATE_SPLITTER } from './constants.js';
import { DatePickerPopover } from './date-picker-popover.js';

import './date-picker-popover.js';

@customElement('aa-date-picker')
export class DatePicker extends LitElement {
  @property({ type: String }) type: 'date' | 'month' | 'year' = 'date';
  @property({ type: String }) name: string | null = null;
  @property({ type: String, reflect: true }) value: string = '';
  @property({ type: String }) placeholder: string | null = null;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;

  get text() {
    return this.input.value;
  }

  @query('input') private input!: HTMLInputElement;

  private open: boolean = false;
  private calendarPopover: DatePickerPopover;

  constructor() {
    super();
    this.calendarPopover = document.createElement('aa-date-picker-popover') as DatePickerPopover;
    this.calendarPopover.owner = this;
    this.calendarPopover.addEventListener('selected', this.popoverSelectedHandler.bind(this));
    this.calendarPopover.addEventListener('closed', (e) => {
      e.stopPropagation();
      this.open = false;
    });
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null) {
    super.attributeChangedCallback(name, _old, value);
    if (name === 'value' && value && !this.isValidDate(value)) {
      console.error(`aa-date-picker[${name}]: Invalid date format: ${value}`);
      this.value = '';
    }
  }

  protected updated(changes: PropertyValues) {
    if (changes.has('type')) {
      this.calendarPopover.type = this.type;
    }
    if (changes.has('value')) {
      this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value }, bubbles: true, composed: true }));
    }
  }

  protected render() {
    return html`<input
        type="text"
        placeholder=${this.placeholder}
        .value=${this.formatDate(this.value)}
        @keydown=${this.propagateEventHandler}
        @beforeinput=${this.propagateEventHandler}
        @input=${this.inputHandler}
        @keyup=${this.keyupHandler}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
      /><button type="button" ?disabled=${this.readonly || this.disabled} @click=${this.buttonClickHandler}>
        ${getIcon('svg', 'calendar')()}
      </button>`;
  }

  private inputHandler(event: Event) {
    this.processInputText(event as KeyboardEvent);
    this.propagateEventHandler(event);
  }

  private keyupHandler(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    this.propagateEventHandler(event);
  }

  private buttonClickHandler(e: Event) {
    if (!this.open) {
      e.stopPropagation();
      this.calendarPopover.show(this.value);
      this.open = true;
    }
  }

  private popoverSelectedHandler(e: Event) {
    e.stopPropagation();

    const event = e as CustomEvent;
    this.value = event.detail.value;
  }

  private propagateEventHandler(e: Event) {
    if (e.bubbles) {
      e.stopPropagation();
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newEvent = new e.constructor(e.type, e);
    this.dispatchEvent(newEvent);
  }

  private processInputText(e: KeyboardEvent): void {
    const input = e.target as HTMLInputElement;

    const rawValue = input.value.replace(/\D/g, '');
    if (this.isValidDate(rawValue)) {
      if (rawValue.length === (this.type === 'date' ? 8 : this.type === 'month' ? 6 : 4)) {
        this.value = rawValue;
        return;
      }
      input.value = this.formatDate(rawValue);
    } else {
      input.value = this.formatDate(rawValue.slice(0, -1));
    }
  }

  private isValidDate(value: string): boolean {
    if (value.length === 0) return true;
    const maxLength = this.type === 'date' ? 8 : this.type === 'month' ? 6 : 4;
    if (value.length > maxLength) return false;

    const monthString = value.substring(4, 6);
    const dayString = value.substring(6, 8);
    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(monthString, 10);
    const day = parseInt(dayString, 10);

    const monthValidation = () => {
      if (monthString.length == 1 && !['0', '1'].includes(monthString[0])) return false;
      if (month < 1 || month > 12) {
        return monthString.length === 1 && monthString[0] === '0';
      }
      return true;
    };

    const dayValidation = () => {
      if (day < 1 || day > 31) {
        return dayString.length === 1 && dayString[0] === '0';
      }
      if (dayString.length === 1 && !(month === 2 ? ['0', '1', '2'] : ['0', '1', '2', '3']).includes(dayString[0]))
        return false;
      // 31일까지 있는 월 체크
      if ([4, 6, 9, 11].includes(month) && day > 30) return false;
      // 2월 체크
      if (month === 2) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
        if (day > (isLeapYear ? 29 : 28)) return false;
      }
      return true;
    };

    return this.type === 'date'
      ? monthValidation() && dayValidation()
      : this.type === 'month'
        ? monthValidation()
        : true;
  }

  private formatDate(value: string, raw: boolean = false): string {
    const parts = value.match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
    if (!parts) return value;
    const [, year, month, day] = parts;
    let formattedValue = year;
    if (this.type === 'year') return formattedValue;
    if (month) formattedValue += `${raw ? '' : DATE_SPLITTER}${month}`;
    if (this.type === 'month') return formattedValue;
    if (day) formattedValue += `${raw ? '' : DATE_SPLITTER}${day}`;
    return formattedValue;
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
    }

    input {
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      background-color: var(--input-surface-normal);
      font-size: 12px;
      margin: 0;
      padding: 0 24px 0 8px;
      min-height: 24px;
      width: 100%;
    }

    input::placeholder {
      color: var(--font-placeholder);
    }

    button {
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

    :host(:hover) input {
      border-color: var(--input-border-hover);
    }

    :host(:hover) button {
      border-color: var(--input-border-hover);
    }

    :host([disabled]) input {
      border-color: var(--input-border-disable);
      background-color: var(--input-surface-disabled);
      color: var(--font-disable);
    }

    :host([disabled]) button {
      border-color: var(--input-border-disable);
      background-color: var(--input-surface-disabled);
      color: var(--font-disable);
    }

    :host(:hover) input:focus,
    input:focus {
      border-color: var(--input-border-active);
      outline: none;
    }

    :host(:hover) input:focus + button,
    input:focus + button {
      border-color: var(--input-border-active);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-date-picker': DatePicker;
  }
}
