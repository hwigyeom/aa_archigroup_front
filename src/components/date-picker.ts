import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from './icons.ts';
import { DATE_SPLITTER } from './constants.ts';

@customElement('aa-date-picker')
export class DatePicker extends LitElement {
  @property({ type: String }) name: string | null = null;
  @property({ type: String, reflect: true }) value: string = '';
  @property({ type: String, reflect: true }) text: string = '';
  @property({ type: String }) placeholder: string | null = null;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;

  protected render() {
    return html`<input
        type="text"
        placeholder=${this.placeholder}
        .value=${this.formatDate(this.value)}
        @keydown=${this.propagateEventHandler}
        @beforeinput=${this.propagateEventHandler}
        @input=${this.handleInput}
        @keyup=${this.handleKeyPress}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
      /><button type="button" ?disabled=${this.readonly || this.disabled}>${getIcon('svg', 'calendar')()}</button>`;
  }

  private handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const rawValue = input.value.replace(/-/g, '');
    if (/^\d*$/.test(rawValue) && rawValue.length <= 8) {
      this.value = rawValue;
      input.value = this.formatDate(this.value);
    } else {
      input.value = this.formatDate(this.value);
    }
    this.propagateEventHandler(event);
  }

  private handleKeyPress(event: KeyboardEvent) {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
    this.propagateEventHandler(event);
  }

  private propagateEventHandler(e: Event) {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newEvent = new e.constructor(e.type, e);
    this.dispatchEvent(newEvent);
  }

  private formatDate(value: string): string {
    const parts = value.match(/(\d{0,4})(\d{0,2})(\d{0,2})/);
    if (!parts) return value;
    const [, year, month, day] = parts;
    let formattedValue = year;
    if (month) formattedValue += `${DATE_SPLITTER}${month}`;
    if (day) formattedValue += `${DATE_SPLITTER}${day}`;
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
