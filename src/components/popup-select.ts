import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from './icons.ts';

@customElement('aa-popup-select')
export class PopupSelect extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: String, reflect: true }) value: string = '';
  @property({ type: String, reflect: true }) text: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: Boolean }) disabled: boolean = false;
  @property({ type: Boolean }) readonly: boolean = false;

  protected render() {
    return html`<input
        type="text"
        id=${this.name}
        name=${this.name}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        value=${this.text}
        @change=${(e: Event) => {
          e.stopPropagation();
          this.text = (e.target as HTMLInputElement).value;
          this.dispatchEvent(
            new CustomEvent('text-change', { bubbles: true, composed: true, detail: { text: this.text } })
          );
        }}
      /><button
        type="button"
        @click=${(e: Event) => this.dispatchEvent(new CustomEvent('button-click', e))}
        ?disabled=${this.readonly || this.disabled}
      >
        ${getIcon('svg', 'new-window')()}
      </button>`;
  }

  public setData({ value, text }: { value: string; text: string }) {
    this.value = value;
    this.text = text;
  }

  public setValue(value: string) {
    this.value = value;
  }

  public setText(text: string) {
    this.text = text;
  }

  protected updated(changes: PropertyValues) {
    super.updated(changes);

    if (changes.has('value') || changes.has('text')) {
      this.dispatchEvent(
        new CustomEvent('data-change', {
          bubbles: true,
          composed: true,
          detail: { value: this.value, text: this.text },
        })
      );
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
      font-family: var(--font-fmaily), serif;
      font-weight: var(--font-weight-normal);
    }

    input[type='text'] {
      font-family: var(--font-fmaily), serif;
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

    input[type='text']::placeholder {
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

    :host(:hover) input[type='text'] {
      border-color: var(--input-border-hover);
    }
    :host(:hover) button {
      border-color: var(--input-border-hover);
    }
    :host([disabled]) input[type='text'] {
      border-color: var(--input-border-disable);
      background-color: var(--input-surface-disabled);
      color: var(--font-disable);
    }
    :host([disabled]) button {
      border-color: var(--input-border-disable);
    }

    input[type='text']:focus {
      border-color: var(--input-border-active);
      outline: none;
    }
    input[type='text']:focus + button {
      border-color: var(--input-border-active);
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `;
}
