import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon, Icons } from './icons.ts';
import { ICON_DEFAULT_COLOR, ICON_INVERSE_COLOR } from './constants.ts';

@customElement('aa-button')
export class Button extends LitElement {
  @property({ type: String }) type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String }) size: 'large' | 'medium' | 'small' = 'medium';

  @property({ type: Boolean }) disabled: boolean = false;

  @property({ type: String }) color: 'primary' | 'generic' = 'generic';

  @property({ type: String }) icon: Icons | 'none' = 'none';

  protected render() {
    return html`<button
      type="${this.type}"
      class="${this.color} ${this.size}"
      ?disabled=${this.disabled}
      @click=${this.clickHandler}
    >
      ${this.icon !== 'none'
        ? getIcon('svg', this.icon)(this.color === 'generic' ? ICON_DEFAULT_COLOR : ICON_INVERSE_COLOR)
        : ''}
      <slot></slot>
    </button>`;
  }

  protected clickHandler(e: Event) {
    e.stopPropagation();
    this.dispatchEvent(new Event('click'));
  }

  static styles = css`
    :host {
      display: inline-flex;
      justify-content: flex-start;
      align-items: center;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      width: 100%;
    }

    svg,
    ::slotted(svg) {
      display: inline-block;
      margin-right: 4px;
    }

    button.large {
      height: 32px;
      font-size: var(--btn-font-size-large);
      padding: 0 10px;
    }

    button.medium {
      height: 24px;
      font-size: var(--btn-font-size-medium);
      padding: 0 8px;
    }

    button.small {
      height: 18px;
      font-size: var(--btn-font-size-small);
      border-radius: 3px;
      padding: 0 6px;
    }

    button.primary {
      color: var(--font-inverse);
      border: none;
      background-color: var(--primary-color);
    }

    button.primary:hover {
      background-color: var(--secondary-color);
    }

    button.primary:disabled {
      background-color: var(--primary-color);
      opacity: 0.2;
      cursor: not-allowed;
    }

    button.generic {
      background-color: var(--input-surface-normal);
      border: 1px solid var(--input-border-normal);
      color: var(--font-secondary);
    }

    button.generic:hover {
      border-color: var(--input-border-hover);
    }

    button.generic:active {
      border-color: var(--input-border-active);
    }

    button.generic:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    button.generic:disabled:hover {
      border-color: var(--input-border-normal);
    }

    button.generic:disabled:active {
      border-color: var(--input-border-normal);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-button': Button;
  }
}
