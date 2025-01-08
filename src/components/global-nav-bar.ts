import { css, html, LitElement, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import icons from './icons.js';

export type TopMenu = {
  id: string;
  name: string;
  icon: string;
};

@customElement('global-nav-bar')
export class GlobalNavigationBar extends LitElement {
  @property({ type: Boolean }) extended: boolean = false;

  @property({ type: String, reflect: true }) selected: string = 'menu-01';

  @state()
  private menus: TopMenu[] = [
    { id: 'menu-01', name: '실적보고', icon: 'public/images/icon-menu-01.svg' },
    { id: 'menu-02', name: '프로젝트 관리', icon: 'public/images/icon-menu-02.svg' },
    { id: 'menu-03', name: '자원관리', icon: 'public/images/icon-menu-03.svg' },
    { id: 'menu-04', name: '시스템 관리', icon: 'public/images/icon-menu-04.svg' },
  ];

  protected render() {
    return html`<menu-extender ?extened=${this.extended}></menu-extender>${this.renderTopMenus()}`;
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
    if (menuId === 'search') {
      this.dispatchEvent(new CustomEvent('menu-search', { bubbles: false, composed: false }));
    } else {
      if (this.selected !== menuId) {
        this.selected = menuId;
        this.dispatchEvent(new CustomEvent('menu-select', { detail: menuId, bubbles: false, composed: false }));
      }
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

    nav {
      background-color: #20293a;
      position: absolute;
      top: 48px;
      width: 58px;
      bottom: 0;
      border-top-right-radius: 16px;
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
