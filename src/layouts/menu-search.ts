import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { SearchSVG } from '../components/icons.js';
import type { MenuTreeNode } from './global-menu-tree.js';

@customElement('menu-search')
export class MenuSearch extends LitElement {
  @property({ type: String }) keyword: string = '';
  @property({ type: Array }) menus: MenuTreeNode[] = [];
  @property({ type: Array }) filteredMenus: MenuTreeNode[] = [];
  @property({ type: Boolean }) showResults: boolean = false;

  @query('input') private keywordInput!: HTMLInputElement;

  private get owner(): HTMLElement {
    const rootNode = this.getRootNode() as ShadowRoot;
    return rootNode.host as HTMLElement;
  }

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

  protected render() {
    return html`<div class="search-box">
        <input type="text" @keyup=${this.keywordInputPressHandler} placeholder="메뉴검색" /><button
          type="button"
          @mousedown=${this.buttonDownHandler}
        >
          ${SearchSVG()}
        </button>
      </div>
      ${this.showResults
        ? this.filteredMenus.length === 0
          ? html`<div class="search-results empty"></div>`
          : html`<div class="search-results">
              ${this.filteredMenus.map(
                (menu, index) => html`
                  <a
                    class="search-result"
                    data-index=${index}
                    href=${menu.url || nothing}
                    @click=${this.resultClickHandler}
                  >
                    ${this.formattedMenuName(menu.name)}
                  </a>
                `
              )}
            </div>`
        : html``}`;
  }

  public setFocus() {
    this.keywordInput.focus();
  }

  private search() {
    const keyword = this.keywordInput.value;

    if (!keyword) return;
    if (keyword.length < 2) return;
    if (!this.menus || this.menus.length === 0) return;

    this.filteredMenus = this.menus.filter((menu) => menu.name.toLowerCase().includes(keyword.toLowerCase()));

    this.keyword = keyword;
    this.showResults = true;
  }

  private keywordInputPressHandler(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      this.search();
    }
  }

  private buttonDownHandler(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.search();
  }

  private handleOutsideClick(e: MouseEvent) {
    if (this.showResults && !this.contains(e.target as Node) && !this.owner.contains(e.target as Node)) {
      this.reset();
    }
  }

  private handleScroll(e: Event) {
    if (this.showResults && !this.contains(e.target as Node)) {
      this.reset();
    }
  }

  private resultClickHandler(e: MouseEvent) {
    const target = e.target as HTMLAnchorElement;
    const index = Number(target.dataset.index);
    const menu = this.filteredMenus[index];

    this.dispatchEvent(new CustomEvent('menu-select', { detail: { menu: { ...menu } } }));
    this.reset();

    if (location.pathname === menu.url) {
      e.preventDefault();
    }
  }

  private formattedMenuName(name: string) {
    const regex = new RegExp(`(${this.keyword})`, 'gi');
    const formattedName = name.replace(regex, '<strong>$1</strong>');
    return html`${unsafeHTML(formattedName)}`;
  }

  private reset() {
    this.keywordInput.value = '';
    this.keyword = '';
    this.showResults = false;
    this.filteredMenus = [];
  }

  static styles = css`
    :host {
      display: block;
      flex-direction: column;
      font-family: var(--font-family), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
    }

    div.search-box {
      display: flex;
      align-items: center;
    }

    div.search-box input[type='text'] {
      box-sizing: border-box;
      height: 32px;
      width: 186px;
      border: 1px solid var(--input-border-normal);
      background-color: var(--input-surface-normal);
      border-radius: 4px;
      padding: 0 28px 0 8px;
      font-family: var(--font-family), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
    }

    div.search-box input[type='text']::placeholder {
      color: var(--font-placeholder);
    }

    div.search-box input[type='text']:hover {
      border-color: var(--input-border-hover);
    }

    div.search-box input[type='text']:focus {
      border-color: var(--input-border-active);
      outline: none;
    }

    div.search-box button {
      height: 16px;
      width: 16px;
      padding: 0;
      background-color: transparent;
      border: none;
      margin-left: -25px;
      cursor: pointer;
    }

    div.search-results {
      position: absolute;
      background-color: #fff;
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      width: 186px;
      margin: 4px 0;
      max-height: 200px;
      overflow-y: auto;
      z-index: 100;
    }
    div.search-results.empty {
      height: 100px;
    }

    a.search-result {
      display: block;
      color: var(--primary-color);
      font-weight: 400;
      padding: 8px;
      text-decoration: none;
    }

    a.search-result:hover {
      background-color: var(--surface-hover);
    }

    a.search-result strong {
      font-weight: var(--font-weight-bold);
    }

    div.search-results::-webkit-scrollbar {
      width: 10px;
    }
    div.search-results::-webkit-scrollbar-track {
      background: transparent;
    }
    div.search-results::-webkit-scrollbar-thumb {
      background-color: #9ca5b166;
      border-radius: 5px;
      border: 2px solid transparent;
      background-clip: padding-box;
    }
    div.search-results::-webkit-scrollbar-thumb:hover {
      background-color: #9ca5b1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'menu-search': MenuSearch;
  }
}
