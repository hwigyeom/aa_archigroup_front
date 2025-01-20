import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CheckboxCheckedDataUri, CheckboxDataUri } from './icons.ts';
import {
  CHECKBOX_CHECKED_DISABLED_BG_COLOR,
  CHECKBOX_CHECKED_DISABLED_BORDER_COLOR,
  CHECKBOX_CHECKED_DISABLED_CHECK_COLOR,
  CHECKBOX_HOVER_BORDER_COLOR,
} from './constants.ts';

@customElement('aa-checkbox')
export class Checkbox extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: Boolean }) checked: boolean = false;
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: String }) value: string = '';

  protected render() {
    return html`
      <input
        type="checkbox"
        id=${this.name}
        name=${this.name}
        value=${this.value}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
      /><label for=${this.name}><slot></slot></label>
    `;
  }

  static styles = css`
    :host {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-fmaily), serif;
      font-weight: var(--font-weight-normal);
    }

    input[type='checkbox'] {
      margin: 0;
      padding: 0;
    }
    input[type='checkbox']:before {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: url('${unsafeCSS(CheckboxDataUri())}') no-repeat center center #fff;
    }
    input[type='checkbox']:hover:before {
      background-image: url('${unsafeCSS(CheckboxDataUri(CHECKBOX_HOVER_BORDER_COLOR))}');
    }
    input[type='checkbox']:disabled:before,
    input[type='checkbox']:disabled:hover:before {
      background-image: url('${unsafeCSS(
        CheckboxDataUri(CHECKBOX_CHECKED_DISABLED_BORDER_COLOR, CHECKBOX_CHECKED_DISABLED_BG_COLOR)
      )}');
    }
    input[type='checkbox']:checked:before {
      background-image: url('${unsafeCSS(CheckboxCheckedDataUri())}');
    }
    input[type='checkbox']:checked:disabled:before {
      background-image: url('${unsafeCSS(
        CheckboxCheckedDataUri(
          CHECKBOX_CHECKED_DISABLED_BORDER_COLOR,
          CHECKBOX_CHECKED_DISABLED_BG_COLOR,
          CHECKBOX_CHECKED_DISABLED_CHECK_COLOR
        )
      )}');
    }

    label {
      display: inline-block;
      margin-left: 8px;
    }

    input[type='checkbox']:disabled + label {
      color: var(--font-disable);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-checkbox': Checkbox;
  }
}
