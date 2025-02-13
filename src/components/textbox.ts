import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

@customElement('aa-textbox')
export class Textbox extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: String }) type: 'text' | 'password' = 'text';
  @property({ type: String, reflect: true }) value: string = '';
  @property({ type: String }) placeholder: string = '';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;
  @property({ type: Boolean, reflect: true }) readonly: boolean = false;
  @property({ type: String }) align: 'left' | 'center' | 'right' = 'left';

  protected render() {
    const styles: { [key: string]: string } = {};

    if (this.align !== 'left') {
      styles.textAlign = this.align;
    }

    return html`<input
      type=${this.type}
      id=${this.name}
      name=${this.name}
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      value=${this.value}
      placeholder=${this.placeholder}
      @change=${this.textChangeHandler}
      @keydown=${this.propagateEventHandler}
      @keyup=${this.propagateEventHandler}
      @input=${this.propagateEventHandler}
      style=${styleMap(styles)}
    />`;
  }

  private textChangeHandler(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.propagateEventHandler(e);
  }

  private propagateEventHandler(e: Event) {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newEvent = new e.constructor(e.type, e);
    this.dispatchEvent(newEvent);
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

    input[type='text'] {
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      background-color: var(--input-surface-normal);
      font-size: 12px;
      margin: 0;
      padding: 0 8px;
      min-height: 24px;
      width: 100%;
    }

    input[type='text']::placeholder {
      color: var(--font-placeholder);
    }

    input[type='text']:hover {
      border-color: var(--input-border-hover);
    }

    input[type='text']:focus {
      border-color: var(--input-border-active);
      outline: none;
    }

    input[type='text']:disabled {
      border-color: var(--input-border-disable);
      background-color: var(--input-surface-disabled);
      color: var(--font-disable);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-textbox': Textbox;
  }
}
