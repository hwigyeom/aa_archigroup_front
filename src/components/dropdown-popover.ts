import { css, LitElement, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Dropdown } from './dropdown.js';

@customElement('aa-dropdown-popover')
export class DropdownPopover extends LitElement {
  @property({ type: Dropdown }) owner: Dropdown | null = null;
  @property({ type: Boolean, reflect: true }) open: boolean = false;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    super.disconnectedCallback();
  }

  protected updated(changes: PropertyValues) {
    super.updated(changes);
    if (changes.has('open')) {
      this.updatePopover();
    }
  }

  private handleOutsideClick(e: MouseEvent) {
    if (!this.contains(e.target as Node) && !this.contains(e.target as Node)) {
      if (this.owner && !this.owner.contains(e.target as Node)) {
        this.open = this.owner.open = false;
        this.updatePopover();
      }
    }
  }

  private handleScroll(e: Event) {
    if (this.open && this.owner && !this.contains(e.target as Node)) {
      this.open = this.owner.open = false;
      this.updatePopover();
    }
  }

  private updatePopover() {
    if (!this.owner) return;

    const ownerRect = this.owner.getBoundingClientRect();
    const popoverRect = this.getBoundingClientRect();
    const popoverStyles = window.getComputedStyle(this);
    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;
    const popoverMargins = parseFloat(popoverStyles.marginTop) + parseFloat(popoverStyles.marginBottom);

    // 뷰포트 기준 가용 공간을 계산 (스크롤 오프셋 미포함)
    const spaceBelow = document.documentElement.clientHeight - ownerRect.bottom;
    const spaceAbove = ownerRect.top;

    let top: number;
    let height: number | null = null;

    if (spaceBelow < popoverRect.height && spaceAbove > popoverRect.height) {
      top = ownerRect.top - popoverRect.height - popoverMargins;
    } else if (spaceBelow < popoverRect.height && spaceAbove < popoverRect.height) {
      // Adjust height
      height = Math.max(spaceBelow, spaceAbove) - popoverMargins;
      top = spaceBelow > spaceAbove ? ownerRect.bottom : ownerRect.top - height;
    } else {
      top = ownerRect.bottom;
    }

    // 절대 좌표로 변환
    top += scrollTop;

    this.style.top = `${top}px`;
    this.style.left = `${ownerRect.left + scrollLeft}px`;
    this.style.width = `${ownerRect.width}px`;
    if (height) {
      this.style.height = `${height}px`;
    }
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      display: none;
      position: absolute;
      z-index: 720;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      margin: 4px 0 4px 0;
      border-radius: 4px;
      max-height: 500px;
      overflow-y: auto;
    }

    :host([open]) {
      display: block;
    }

    :host::-webkit-scrollbar {
      width: 10px;
    }
    :host::-webkit-scrollbar-track {
      background: transparent;
    }
    :host::-webkit-scrollbar-thumb {
      background-color: #9ca5b166;
      border-radius: 5px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    :host::-webkit-scrollbar-thumb:hover {
      background-color: #9ca5b1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-dropdown-popover': DropdownPopover;
  }
}
