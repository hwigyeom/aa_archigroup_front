import { css, html, unsafeCSS, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MenuSearch } from './menu-search.ts';
import { ICON_DEFAULT_COLOR } from './constants.js';

import './menu-search.ts';

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

@customElement('global-menu-tree')
export class GlobalMenuTree extends LitElement {
  @property({ type: String }) title: string = '';
  @property({ type: Array }) menus: MenuTreeNode[] = [];

  @query('menu-search') private menuSearch!: MenuSearch;

  protected render() {
    return html`<menu-search></menu-search>
      <h2>${this.title}</h2>
      <nav>${this.menuTreeRender(this.menus)}</nav>`;
  }

  public setSearchFocus() {
    setTimeout(() => this.menuSearch.setFocus());
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
    }
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
      font-family: Pretenard, Arial, sans-serif;
      font-size: 16px;
      font-weight: 700;
      color: var(--font-primary);
    }

    nav {
      flex-grow: 2;
      overflow-y: auto;
      overflow-x: hidden;
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
      color: var(--font-primary);
      font-size: 13px;
      font-family: Pretenard, Arial, sans-serif;
      font-weight: 400;
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

    a.selected {
      color: var(--select-color);
    }

    a:before {
      content: '';
      display: flex;
      width: 14px;
      height: 16px;
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
