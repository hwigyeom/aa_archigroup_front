import { css, html, unsafeCSS, LitElement, PropertyValues, TemplateResult, svg } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { MenuSearch } from './menu-search.js';
import { ICON_DEFAULT_COLOR } from '../components/constants.js';

import './menu-search.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export type MenuTreeNode = {
  id: string;
  name: string;
  url?: string;
  open?: boolean;
  selected?: boolean;
  children?: MenuTreeNode[];
};

const closedBullet = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill="${color}">
    <path opacity=".2" d="M0 1.938a2 2 0 0 1 2-2h9.9a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 8v2a1 1 0 1 1-2 0V8H4a1 1 0 0 1 0-2h2V4a1 1 0 0 1 2 0v2h2a1 1 0 1 1 0 2z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h14v14H0z"/>
    </clipPath>
  </defs>
</svg>`;

const openedBullet = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill="${color}">
    <path opacity=".2" d="M.1 1.938a2 2 0 0 1 2-2H12a2 2 0 0 1 2 2V12a2 2 0 0 1-2 2H2.1a2 2 0 0 1-2-2z"/>
    <path d="M10.1 6h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h14v14H0z"/>
    </clipPath>
  </defs>
</svg>`;

const leafBullet = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 9V4a1 1 0 0 1 2 0v4h4a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h14v14H0z"/>
    </clipPath>
  </defs>
</svg>
`;

const emptyImage = `<svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="6" y="8.5" width="53" height="47" rx="2.5" fill="#E5E6EF" stroke="#E5E6EF" stroke-width="3"/>
  <rect x="7.5" y="18" width="50" height="36" rx="2" fill="#fff"/>
  <path d="M16.5 29h31m-31 10h15.196" stroke="#E5E6EF" stroke-width="3" stroke-linecap="round"/>
  <path d="M51.166 64C58.53 64 64.5 58.03 64.5 50.666s-5.97-13.333-13.334-13.333-13.333 5.97-13.333 13.333S43.803 64 51.166 64" fill="#E5E6EF"/>
  <path d="M45.833 56 56.5 45.333M56.5 56 45.833 45.333" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
</svg>
`;

@customElement('global-menu-tree')
export class GlobalMenuTree extends LitElement {
  @property({ type: String }) title: string = '';
  @property({ type: Array }) menus: MenuTreeNode[] = [];

  @query('menu-search') private menuSearch!: MenuSearch;

  protected render() {
    const empty = !this.menus || this.menus.length === 0;
    return html`<menu-search></menu-search>
      <h2>${this.title}</h2>
      <nav class=${ifDefined(empty ? 'empty' : undefined)}>
        ${!empty ? html`${this.menuTreeRender(this.menus)}` : html`${this.emptyMessageRender()}`}
      </nav>`;
  }

  public setSearchFocus() {
    setTimeout(() => this.menuSearch.setFocus());
  }

  public extendParents(menuId: string) {
    this.menus = this.getMenuOpenedData(menuId, false);
  }

  public selectMenu(menuId: string) {
    this.menus = this.getMenuOpenedData(menuId, true);
  }

  protected updated(changes: PropertyValues) {
    super.update(changes);
    if (changes.has('menus')) {
      this.getUpdateComplete().then(() => {
        this.shadowRoot?.querySelectorAll('span.menu-name').forEach((el) => {
          const span = el as HTMLSpanElement;
          if (span.offsetWidth < span.scrollWidth) {
            span.title = span.textContent || '';
          }
        });
      });
    }
  }

  private menuTreeRender(nodes: MenuTreeNode[]) {
    return html`
      <ul>
        ${nodes.map(
          (node): TemplateResult => html`
            <li>
              <a
                class="${this.getTreeNodeTypeClassNames(node)}"
                href="${node.url || '#'}"
                @click=${this.menuClickHandler}
              >
                <span class="menu-name">${node.name}</span>
              </a>
              ${node.children ? this.menuTreeRender(node.children) : ''}
            </li>
          `
        )}
      </ul>
    `;
  }

  private emptyMessageRender() {
    return html`<div>${svg`${unsafeHTML(emptyImage)}`}<span>선택된 메뉴가 없습니다.</span></div>`;
  }

  private pathTo(menuId: string): string[] {
    const path: string[] = [];
    const findPath = (nodes: MenuTreeNode[]) => {
      for (const node of nodes) {
        if (node.id === menuId) {
          path.push(node.id);
          return true;
        }
        if (node.children && findPath(node.children)) {
          path.push(node.id);
          return true;
        }
      }
      return false;
    };
    findPath(this.menus);
    return path.reverse();
  }

  private getMenuOpenedData(menuId: string, toLeaf: boolean = true): MenuTreeNode[] {
    if (!this.menus || this.menus.length === 0) return this.menus;

    const path = this.pathTo(menuId);

    if (path.length === 0) return this.menus;

    const newMenus = JSON.parse(JSON.stringify(this.menus));
    this.removeSelected(newMenus);

    let currentMenus: MenuTreeNode[] = newMenus;

    for (const [index, id] of path.entries()) {
      const menu = currentMenus.find((item) => item.id === id);
      if (!menu) break;
      if (toLeaf && index === path.length - 1) {
        menu.selected = true;
      } else {
        menu.open = true;
      }
      currentMenus = menu.children ?? [];
    }

    return newMenus;
  }

  private removeSelected(menus: MenuTreeNode[]) {
    menus.forEach((menu) => {
      if (menu.selected) menu.selected = false;
      if (menu.children) {
        this.removeSelected(menu.children);
      }
    });
  }

  private getTreeNodeTypeClassNames(node: MenuTreeNode) {
    if (node.children) {
      return node.open ? 'opened' : 'closed';
    } else {
      return `leaf${node.selected ? ' selected' : ''}`;
    }
  }

  private menuClickHandler(e: Event) {
    const target = e.currentTarget as HTMLAnchorElement;
    if (!target.classList.contains('leaf')) {
      e.preventDefault();
      if (target.classList.contains('opened')) {
        target.classList.remove('opened');
        target.classList.add('closed');
      } else {
        target.classList.remove('closed');
        target.classList.add('opened');
      }
    } else if (target.classList.contains('selected')) {
      e.preventDefault();
    }
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      flex-direction: column;
      top: 48px;
      left: 58px;
      bottom: 0;
      width: 218px;
      padding: 24px 4px 16px 16px;
    }

    h2 {
      margin: 24px 0 16px 0;
      font-family: var(--font-fmaily), serif;
      font-weight: var(--font-weight-bold);
      font-size: 16px;
      color: var(--font-primary);
    }

    nav {
      flex-grow: 2;
      overflow-y: auto;
      overflow-x: hidden;
    }

    nav.empty {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
    }

    nav.empty > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: -80px;
      margin-left: -8px;
      color: var(--font-secondary);
    }

    nav.empty > div > svg {
      display: block;
    }

    nav.empty > div > span {
      display: block;
      color: var(--font-tertiary);
      font-weight: 200;
      margin-top: 8px;
    }

    nav::-webkit-scrollbar {
      width: 5px;
    }
    nav::-webkit-scrollbar-track {
      background: transparent;
    }
    nav::-webkit-scrollbar-thumb {
      background: #9ca5b166;
      border-radius: 3px;
    }
    nav::-webkit-scrollbar-thumb:hover {
      background-color: #9ca5b1;
    }

    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      padding: 0;
      margin: 0 0 0 10px;
    }

    nav > ul {
      margin-left: 0;
    }

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 188px;
      justify-content: flex-start;
      padding: 7px 7px 7px 14px;
      text-decoration: none;
      font-family: var(--font-fmaily), serif;
      color: var(--font-primary);
      font-size: var(--font-size-small);
      font-weight: var(--font-weight-normal);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    a > span.menu-name {
      display: inline-block;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    a:hover {
      font-weight: var(--font-weight-semi-bold);
    }

    a.selected {
      color: var(--select-color);
      font-weight: var(--font-weight-semi-bold);
    }

    a:before {
      content: '';
      display: flex;
      width: 14px;
      height: 14px;
      margin-left: -14px;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
    }

    a.closed:before {
      background-image: url('${unsafeCSS(`data:image/svg+xml;base64,${btoa(closedBullet())}`)}');
    }

    a.opened:before {
      background-image: url('${unsafeCSS(`data:image/svg+xml;base64,${btoa(openedBullet())}`)}');
    }

    a.leaf:before {
      background-image: url('${unsafeCSS(`data:image/svg+xml;base64,${btoa(leafBullet())}`)}');
    }

    a.leaf.selected:before {
      background-image: url('${unsafeCSS(`data:image/svg+xml;base64,${btoa(leafBullet('#b40950'))}`)}');
    }

    a.closed + ul {
      display: none;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'global-menu-tree': GlobalMenuTree;
  }
}
