import { css, html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from './icons.js';
import {
  CHECKBOX_CHECKED_DISABLED_BG_COLOR,
  CHECKBOX_CHECKED_DISABLED_BORDER_COLOR,
  CHECKBOX_CHECKED_DISABLED_CHECK_COLOR,
  CHECKBOX_HOVER_BORDER_COLOR,
} from './constants.js';

@customElement('aa-checkbox')
export class Checkbox extends LitElement {
  @property({ type: String }) name: string | null = null;
  @property({ type: String }) value: string = '';
  @property({ type: Boolean, reflect: true }) checked: boolean = false;
  @property({ type: Boolean, reflect: true }) indeterminate: boolean = false;
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  get state() {
    return this.checked ? 'checked' : this.indeterminate ? 'indeterminate' : 'unchecked';
  }

  updated(changes: PropertyValues) {
    if (changes.has('checked') && !changes.has('indeterminate') && this.indeterminate) {
      this.indeterminate = false;
    }
    if (changes.has('indeterminate') && !changes.has('checked') && this.checked) {
      this.checked = false;
    }
  }

  protected render() {
    return html`
      <input
        type="checkbox"
        id="checkbox"
        .indeterminate=${this.indeterminate}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        @change=${this.checkChangeHandler}
      /><label for="checkbox"><slot></slot></label>
    `;
  }

  public checkChangeHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    this.checked = target.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { state: this.state, checked: this.checked, indeterminate: this.indeterminate, value: this.value },
      })
    );
  }

  static styles = css`
    :host {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
    }

    input[type='checkbox'] {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      width: 16px;
      height: 16px;
    }

    input[type='checkbox']::before {
      display: inline-block;
      width: 16px;
      height: 16px;
      content: '';
      background: url('${unsafeCSS(getIcon('data-uri', 'checkbox')())}') no-repeat center center #fff;
    }

    input[type='checkbox']:hover::before {
      background-image: url('${unsafeCSS(getIcon('data-uri', 'checkbox')(CHECKBOX_HOVER_BORDER_COLOR))}');
    }

    input[type='checkbox']:disabled::before,
    input[type='checkbox']:disabled:hover::before {
      background-image: url('${unsafeCSS(
        getIcon('data-uri', 'checkbox')(CHECKBOX_CHECKED_DISABLED_BORDER_COLOR, CHECKBOX_CHECKED_DISABLED_BG_COLOR)
      )}');
    }

    input[type='checkbox']:checked::before {
      background-image: url('${unsafeCSS(getIcon('data-uri', 'checkbox-checked')())}');
    }

    input[type='checkbox']:checked:disabled::before,
    input[type='checkbox']:checked:disabled:hover::before {
      background-image: url('${unsafeCSS(
        getIcon('data-uri', 'checkbox-checked')(
          CHECKBOX_CHECKED_DISABLED_BORDER_COLOR,
          CHECKBOX_CHECKED_DISABLED_BG_COLOR,
          CHECKBOX_CHECKED_DISABLED_CHECK_COLOR
        )
      )}');
    }

    input[type='checkbox']:indeterminate::before,
    input[type='checkbox']:indeterminate:hover::before {
      background-image: url('${unsafeCSS(getIcon('data-uri', 'checkbox-indeterminate')())}');
    }

    input[type='checkbox']:indeterminate:disabled::before,
    input[type='checkbox']:indeterminate:disabled:hover::before {
      background-image: url('${unsafeCSS(
        getIcon('data-uri', 'checkbox-indeterminate')(
          CHECKBOX_CHECKED_DISABLED_BORDER_COLOR,
          CHECKBOX_CHECKED_DISABLED_BG_COLOR,
          CHECKBOX_CHECKED_DISABLED_BORDER_COLOR
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
