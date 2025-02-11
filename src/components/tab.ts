import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { TabItem } from './tab-item.js';

@customElement('aa-tab')
export class Tab extends LitElement {
  @property({ type: String, attribute: 'active-tab', reflect: true }) activeTab: string = '';

  @queryAssignedElements({ selector: 'aa-tab-item' }) tabItems!: NodeListOf<TabItem>;

  protected firstUpdated() {
    if (this.tabItems.length > 0) {
      this.selectTab(this.tabItems[0].id);
    }
  }

  protected render() {
    return html`
      <header>
        <nav>
          <ul>
            ${Array.from(this.tabItems).map(
              (item) =>
                html`<li @click=${() => this.selectTab(item.id)} class=${item.active ? 'active' : nothing}>
                  ${item.caption}
                </li>`
            )}
          </ul>
        </nav>
        <slot name="buttons"></slot>
      </header>
      <section>
        <slot></slot>
      </section>
    `;
  }

  private selectTab(id: string) {
    this.tabItems.forEach((item) => {
      item.active = item.id === id;
    });
    this.activeTab = id;
    this.dispatchEvent(new CustomEvent('tab-selected', { detail: { tab: id }, bubbles: true, composed: true }));
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      font-size: var(--font-size-default);
      color: var(--font-primary);
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #d3dae6;
      padding: 0;
      margin-bottom: 8px;
    }

    ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
      margin: 0;
      padding: 3px 0 0 0;
      gap: 15px;
    }

    li {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      font-weight: var(--font-weight-bold);
      color: var(--font-tertiary);
      height: 29px;
      border-bottom: none;
      margin: 0 0 -1px 0;
      padding: 0 2px;
      line-height: 17px;
      cursor: pointer;
    }

    li.active {
      color: var(--font-primary);
      border-bottom: 2px solid var(--primary-color);
    }

    ::slotted(.button-container) {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: 6px;
    }

    section {
      flex-grow: 2;
      display: flex;
      flex-direction: column;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-tab': Tab;
  }
}
