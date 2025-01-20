import { css, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { Radio } from './radio.ts';

@customElement('aa-radio-group')
export class RadioGroup extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: String, reflect: true }) value: string = '';
  @property({ type: Boolean, reflect: true }) disabled: boolean = false;

  @queryAssignedElements({ selector: 'aa-radio' })
  private radios!: Radio[];

  protected render() {
    return html`<slot @radio-change=${this._handleRadioChange}></slot>`;
  }

  protected firstUpdated() {
    this.shadowRoot!.querySelector('slot')!.addEventListener('slotchange', this.handleSlotChange.bind(this));
  }

  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });

    nodes.forEach((node, idx) => {
      if (!(node instanceof Radio && node.tagName.toLowerCase() === 'aa-radio')) {
        node.parentNode?.removeChild(node);
      } else {
        node.setAttribute('id', `${this.name}-${idx + 1}`);
        node.setAttribute('name', this.name);
        (node as Radio).disabled = this.disabled;
      }
    });
  }

  protected update(changes: PropertyValues) {
    super.update(changes);
    if (changes.has('disabled')) {
      this.radios.forEach((radio) => {
        radio.disabled = this.disabled;
      });
    }
  }

  private _handleRadioChange(e: CustomEvent) {
    const value = e.detail.value;
    this.value = value;

    this.radios.forEach((radio) => {
      radio.checked = radio.value === value;
    });
  }

  static styles = css`
    :host {
      display: inline-flex;
    }

    ::slotted(aa-radio) {
      margin-right: 8px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-radio-group': RadioGroup;
  }
}
