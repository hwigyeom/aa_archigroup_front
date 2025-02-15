import { html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { StyleInfo, styleMap } from 'lit/directives/style-map.js';
import { textboxSharedStyles } from '../styles/textbox-shared-styles.ts';
import { DECIMAL_SEPARATOR, THOUSANDS_SEPARATOR } from './constants.ts';
import { KeyboardEventMixin } from '../mixins/KeyboardEventMixin.ts';

@customElement('aa-numeric-textbox')
export class NumericTextbox extends KeyboardEventMixin(LitElement) {
  @property({ type: String }) name: string | null = null;
  @property({ type: String }) type: 'normal' | 'currency' = 'normal';
  @property({ type: Number }) value: number | null = null;
  @property({ type: Number }) decimals: number = 0;
  @property({ type: Number }) max: number | null = null;
  @property({ type: Number }) min: number | null = null;
  @property({ type: Boolean, attribute: 'positive-only' }) positiveOnly: boolean = false;
  @property({ type: String }) placeholder: string = '';
  @property({ type: String }) align: 'left' | 'center' | 'right' = 'right';
  @property({ type: Boolean }) readonly: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;

  get text() {
    return this.value ? this.formatNumber(String(this.value)) : '';
  }

  @query('input') input!: HTMLInputElement;

  protected updated(changes: PropertyValues) {
    if (changes.has('value')) {
      if (this.value !== null) {
        if (this.max !== null && this.value > this.max) {
          this.value = this.max;
        }
        if (this.min !== null && this.value < this.min) {
          this.value = this.min;
        }
      }
      this.input.value = this.value ? this.formatNumber(String(this.value)) : '';
      this.dispatchEvent(
        new CustomEvent('change', { detail: { value: this.value, text: this.text }, bubbles: true, composed: true })
      );
    }
  }

  protected render() {
    const styles: StyleInfo = {};
    if (this.align !== 'left') {
      styles.textAlign = this.align;
    }

    return html`<input
      type="text"
      placeholder=${this.placeholder || nothing}
      ?readonly=${this.readonly}
      ?disabled=${this.disabled}
      @keydown=${this.keydownHandler}
      @beforeinput=${this.propagateEventHandler}
      @input=${this.inputHandler}
      @keyup=${this.propagateEventHandler}
      @change=${this.inputChangeHandler}
      style=${Object.keys(styles).length ? styleMap(styles) : nothing}
    />`;
  }

  private inputChangeHandler(e: Event) {
    const input = e.target as HTMLInputElement;
    const raw = this.rawNumber(input.value);

    input.value = this.formatNumber(raw);
    this.value = parseFloat(raw);
  }

  private keydownHandler(e: KeyboardEvent) {
    this.allowNumericOnlyKeydownHandler(e);
    this.propagateEventHandler(e);
  }

  private inputHandler(e: Event) {
    this.processInputTextHandler(e as InputEvent);
    this.propagateEventHandler(e);
  }

  private processInputTextHandler(e: InputEvent) {
    const input = e.target as HTMLInputElement;
    const raw = this.rawNumber(input.value);
    let start = 0;
    let end = 0;

    if (input.selectionStart !== null && input.selectionEnd !== null) {
      start = input.selectionStart;
      end = input.selectionEnd;
    }

    const thousandsCount = (input.value.match(new RegExp(THOUSANDS_SEPARATOR, 'g')) || []).length;

    if (this.isValidNumber(raw)) {
      let integerPart: string;
      let decimalPart: string = '';

      if (raw.includes(DECIMAL_SEPARATOR)) {
        const parts = raw.split(DECIMAL_SEPARATOR);
        integerPart = parts[0];
        decimalPart = `.${parts[1] || ''}`;
      } else {
        integerPart = raw;
      }

      if (this.type === 'currency') {
        const regex = /\B(?=(\d{3})+(?!\d))/g;
        if (integerPart[0] === '-') {
          integerPart = '-' + integerPart.slice(1).replace(regex, THOUSANDS_SEPARATOR);
        } else {
          integerPart = integerPart.replace(regex, THOUSANDS_SEPARATOR);
        }

        // 수정 전 1000 단위 구분자와 수정후 1000단위 구분자를 갯수의 차이를 구함
        const difference = (integerPart.match(new RegExp(THOUSANDS_SEPARATOR, 'g')) || []).length - thousandsCount;
        start = start + difference;
        end = end + difference;
      }

      input.value = `${integerPart}${decimalPart}`;
    } else {
      if (input.selectionEnd) {
        input.value = input.value.slice(0, input.selectionEnd - 1) + input.value.slice(input.selectionEnd);
        start = start - 1;
        end = end - 1;
      } else {
        input.value = input.value.slice(0, -1);
      }
    }

    if (start !== null && end !== null) {
      input.setSelectionRange(start, end);
    }
  }

  private isValidNumber(value: string): boolean {
    if (value.length === 0) return true;

    if (value.length >= 1) {
      if (this.positiveOnly && value[0] === '-') return false;
      if (!this.positiveOnly && value[0] === '-') return true;
    }
    const temp = value.replace(/^-/, '');
    if (temp.length === 2) {
      if (temp.startsWith('.')) return false;
      if (temp.startsWith('0') && temp[1] !== '.') return false;
    }

    const regex = new RegExp(`^-?\\d+([${DECIMAL_SEPARATOR}](\\d+)?)?$`);
    const parts = value.match(regex);

    if (!parts) return false;
    if (this.decimals <= 0 && parts[1]) return false;
    if (this.decimals > 0 && parts[2] && parts[2].length > this.decimals) return false;

    return regex.test(value);
  }

  private formatNumber(value: string | null): string {
    if (value === null) return '';

    const number = parseFloat(value);

    if (isNaN(number)) return '';

    const isNegative = number < 0;
    const absoluteNumber = Math.abs(number).toString();

    const parts = absoluteNumber.split(DECIMAL_SEPARATOR);
    let integerPart = parts[0];
    if (this.type === 'currency') {
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, THOUSANDS_SEPARATOR);
    }
    const decimalPart = this.decimals > 0 ? `${DECIMAL_SEPARATOR}${(parts[1] || '').padEnd(this.decimals, '0')}` : '';
    return `${isNegative ? '-' : ''}${integerPart}${decimalPart}`;
  }

  private rawNumber(value: string | null): string {
    return value ? value.replace(new RegExp(`[^\\d\\${DECIMAL_SEPARATOR}-]`, 'g'), '') : '';
  }

  static styles = [textboxSharedStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-numeric-textbox': NumericTextbox;
  }
}
