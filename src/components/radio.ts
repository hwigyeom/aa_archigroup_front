import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RadioCheckedDataUri, RadioDataUri } from './icons.ts';
import {
  RADIO_CHECKED_BORDER_COLOR,
  RADIO_DISABLED_BG_COLOR,
  RADIO_DISABLED_BORDER_COLOR,
  RADIO_NORMAL_HOVER_BORDER_COLOR,
} from './constants.ts';

@customElement('aa-radio')
export class Radio extends LitElement {
  @property({ type: String }) value: string = '';
  @property({ type: String }) id: string = '';
  @property({ type: String }) name: string = '';
  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  protected render() {
    return html`<input
        type="radio"
        id="${this.id}"
        name="${this.name}"
        value=${this.value}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this._handleChange}
      /><label for=${this.value}><slot></slot></label>`;
  }

  private _handleChange(e: Event) {
    if (this.checked !== (e.target as HTMLInputElement).checked) {
      this.dispatchEvent(
        new CustomEvent('radio-change', {
          detail: { checked: this.checked, value: this.value },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  static styles = css`
    :host {
      display: inline-flex;
      justify-content: flex-start;
      font-family: var(--font-fmaily), serif;
      font-weight: var(--font-weight-normal);
    }

    input[type='radio'] {
      margin: 0;
      padding: 0;
    }
    input[type='radio']::before {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: url('${unsafeCSS(RadioDataUri())}') no-repeat center center #fff;
    }
    :host(:hover) input[type='radio']::before {
      background-image: url('${unsafeCSS(RadioDataUri(RADIO_NORMAL_HOVER_BORDER_COLOR))}');
    }
    :host([disabled]) input[type='radio']::before,
    :host([disabled]:hover) input[type='radio']::before {
      background-image: url('${unsafeCSS(RadioDataUri(RADIO_DISABLED_BORDER_COLOR, RADIO_DISABLED_BG_COLOR))}');
    }
    :host([checked]) input[type='radio']::before {
      background-image: url('${unsafeCSS(RadioCheckedDataUri(RADIO_CHECKED_BORDER_COLOR, RADIO_DISABLED_BG_COLOR))}');
    }
    :host([checked][disabled]) input[type='radio']::before {
      background-image: url('${unsafeCSS(RadioCheckedDataUri(RADIO_DISABLED_BORDER_COLOR, RADIO_DISABLED_BG_COLOR))}');
    }

    label {
      margin-left: 8px;
      color: var(--font-primary);
    }

    input[type='radio']:disabled + label {
      color: var(--font-disable);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-radio': Radio;
  }
}
