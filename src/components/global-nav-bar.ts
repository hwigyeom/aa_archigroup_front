import { css, html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import icons from './icons.js';

export type RootMenu = {
  id: string;
  name: string;
  icon: string;
};

@customElement('global-nav-bar')
export class GlobalNavigationBar extends LitElement {
  @property({ type: Boolean }) extended: boolean = true;
  @property({ type: String, reflect: true }) selected: string = '';

  @state()
  private menus: RootMenu[] = [];

  setMenus(menus: RootMenu[]) {
    this.menus = menus;
  }

  selectMenu(menuId: string) {
    this.selected = menuId;
  }

  protected render() {
    return html`${this.renderExtender()}${this.renderTopMenus()}`;
  }

  protected renderExtender() {
    const icon = this.extended
      ? html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#a)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm10.78 8.22a.75.75 0 0 1 0 1.06l-.72.72h2.44a.75.75 0 0 1 0 1.5h-2.44l.72.72a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z"
              fill="#20293A"
            />
          </g>
          <defs>
            <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath>
          </defs>
        </svg>`
      : html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#a)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm9.97 8.22a.75.75 0 0 0 0 1.06l.72.72H10a.75.75 0 0 0 0 1.5h2.44l-.72.72a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z"
              fill="#20293A"
            />
          </g>
          <defs>
            <clipPath id="a"><path fill="#fff" d="M0 0h16v16H0z" /></clipPath>
          </defs>
        </svg>`;
    return html`<a class="extender" href="#" @click=${this.extenderClickHandler}>${icon}</a>`;
  }

  protected firstUpdated(_changedProperties: PropertyValues) {
    super.firstUpdated(_changedProperties);
    this.manageBodyMenuOpenedClass();
  }

  private renderTopMenus() {
    return html`
      <nav>
        <ul>
          <li>
            <a href="#" @click=${this.menuSelectHandler} data-menu-id="search"
              ><span>${icons.search(icons.color.normal)}</span><label>메뉴검색</label></a
            >
          </li>
          ${this.menus.map(
            (item) =>
              html`<li>
                <a
                  href="#"
                  @click=${this.menuSelectHandler}
                  data-menu-id=${item.id}
                  class=${this.selected === item.id ? 'selected' : ''}
                  ><span><img src=${item.icon} alt=${item.name} /></span><label>${item.name}</label></a
                >
              </li>`
          )}
        </ul>
      </nav>
    `;
  }

  private menuSelectHandler(e: Event) {
    e.preventDefault();
    const anchor = e.currentTarget as HTMLAnchorElement;
    const menuId = anchor.dataset.menuId as string;
    const menuName = this.menus.find((item) => item.id === menuId)?.name;
    if (menuId === 'search') {
      this.dispatchEvent(new CustomEvent('menu-search', { bubbles: false, composed: false }));
    } else {
      if (this.selected !== menuId) {
        this.selected = menuId;
        this.dispatchEvent(
          new CustomEvent('menu-select', { detail: { id: menuId, name: menuName }, bubbles: false, composed: false })
        );
      }
    }
    if (!this.extended) {
      this.extended = true;
    }
  }

  private extenderClickHandler() {
    this.extended = !this.extended;
    this.requestUpdate();
  }

  private manageBodyMenuOpenedClass() {
    if (this.extended) {
      document.body.classList.add('menu-opened');
    } else {
      document.body.classList.remove('menu-opened');
    }
  }

  protected updated(changes: PropertyValues) {
    super.updated(changes);
    if (changes.has('extended')) {
      this.manageBodyMenuOpenedClass();
      this.requestUpdate();
    }
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      width: 58px;
      overflow: hidden;
      z-index: 2;
    }

    a.extender {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 58px;
      height: 48px;
    }

    nav {
      background-color: #20293a;
      position: absolute;
      top: 48px;
      width: 58px;
      bottom: 0;
      border-top-right-radius: 16px;
      scrollbar-width: none;
      overflow-y: auto;
    }
    nav::-webkit-scrollbar {
      display: none;
    }

    ul {
      list-style: none;
      padding: 16px 9px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    li {
      width: 40px;
      margin-bottom: 24px;
    }

    li > a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      color: ${unsafeCSS(icons.color.normal)};
    }
    li > a > span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4px;
      height: 32px;
      width: 32px;
    }
    li > a > span {
      border-radius: 6px;
    }
    li > a.selected > span {
      background-color: rgba(255, 255, 255, 0.1);
    }
    li > a > label {
      display: block;
      word-break: break-all;
      font-size: 11px;
      text-align: center;
    }
    li > a:hover label {
      color: #fff;
    }
    li > a.selected label {
      color: #fff;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'global-nav-bar': GlobalNavigationBar;
  }
}
