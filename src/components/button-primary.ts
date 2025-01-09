import { ButtonGeneric } from './button-generic.ts';
import { customElement } from 'lit/decorators.js';

@customElement('button-primary')
export class ButtonPrimary extends ButtonGeneric {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
    this.color = 'primary';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'button-primary': ButtonPrimary;
  }
}
