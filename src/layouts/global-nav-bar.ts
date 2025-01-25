import { css, html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { HamburgerCollapsedSVG, HamburgerExtendedSVG, SearchSVG } from '../components/icons.js';
import { ICON_DEFAULT_COLOR } from '../components/constants.js';

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
    const icon = this.extended ? HamburgerExtendedSVG() : HamburgerCollapsedSVG();
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
              ><span>${SearchSVG('#fff')}</span><label>메뉴검색</label></a
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
    if (menuId === 'search') {
      this.dispatchEvent(new CustomEvent('menu-search', { bubbles: false, composed: false }));
    } else {
      if (this.selected !== menuId) {
        this.selected = menuId;
      }
    }
    if (!this.extended) {
      this.extended = true;
    }
  }

  private extenderClickHandler(e: Event) {
    e.preventDefault();
    this.extended = !this.extended;
  }

  private menuSelectTrigger() {
    const name = this.menus.find((item) => item.id === this.selected)?.name;

    if (!name) return;

    this.dispatchEvent(
      new CustomEvent('menu-select', { detail: { id: this.selected, name }, bubbles: false, composed: false })
    );
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
    } else if (changes.has('selected')) {
      this.menuSelectTrigger();
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
      z-index: 302;
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
      color: ${unsafeCSS(ICON_DEFAULT_COLOR)};
    }

    li > a > span {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 4px;
      height: 32px;
      width: 32px;
    }

    li > a img,
    li > a svg {
      opacity: 0.6;
    }

    li > a > span {
      border-radius: 6px;
    }

    li > a:hover > span,
    li > a.selected > span {
      background-color: rgba(255, 255, 255, 0.1);
    }

    li > a > label {
      display: block;
      word-break: break-all;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      font-size: 11px;
      text-align: center;
      cursor: pointer;
    }

    li > a.selected label {
      color: #fff;
    }

    li > a.selected > span img,
    li > a.selected > span svg {
      opacity: 1;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'global-nav-bar': GlobalNavigationBar;
  }
}
