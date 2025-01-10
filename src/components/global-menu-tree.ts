import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MenuSearch } from './menu-search.ts';
import './menu-search.ts';

export type MenuTreeNode = {
  id: string;
  name: string;
  url?: string;
  open?: boolean;
  selected?: boolean;
  children?: MenuTreeNode[];
};

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
                ${node.name}
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
      justify-content: flex-start;
      padding: 7px 7px 7px 0;
      text-decoration: none;
      color: var(--font-primary);
      font-size: 13px;
      font-family: Pretenard, Arial, sans-serif;
      font-weight: 400;
    }

    a.selected {
      color: var(--select-color);
    }

    a:before {
      content: '';
      display: flex;
      width: 14px;
      height: 16px;
      align-items: center;
      justify-content: center;
      margin-right: 6px;
    }

    a.closed:before {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiIGZpbGw9IiM5Q0E1QjEiPjxwYXRoIG9wYWNpdHk9Ii4yIiBkPSJNLjggMS45MzhhMiAyIDAgMCAxIDItMmg5LjlhMiAyIDAgMCAxIDIgMlYxMmEyIDIgMCAwIDEtMiAySDIuOGEyIDIgMCAwIDEtMi0yeiIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOC44IDh2MmExIDEgMCAxIDEtMiAwVjhoLTJhMSAxIDAgMSAxIDAtMmgyVjRhMSAxIDAgMSAxIDIgMHYyaDJhMSAxIDAgMSAxIDAgMnoiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNLjggMGgxNHYxNEguOHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=');
    }

    a.opened:before {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiIGZpbGw9IiM5Q0E1QjEiPjxwYXRoIG9wYWNpdHk9Ii4yIiBkPSJNLjkwMSAxLjkzOGEyIDIgMCAwIDEgMi0yaDkuOWEyIDIgMCAwIDEgMiAyVjEyYTIgMiAwIDAgMS0yIDJIMi45YTIgMiAwIDAgMS0yLTJ6Ii8+PHBhdGggZD0iTTEwLjkwMSA2aC02YTEgMSAwIDAgMCAwIDJoNmExIDEgMCAxIDAgMC0yIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iYSI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTS44IDBoMTR2MTRILjh6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+');
    }

    a.leaf:before {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNSAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNS44IDlWNGExIDEgMCAxIDEgMiAwdjRoNGExIDEgMCAxIDEgMCAyaC01YTEgMSAwIDAgMS0xLTEiIGZpbGw9IiM5Q0E1QjEiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNLjggMGgxNHYxNEguOHoiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=');
    }

    a.leaf.selected:before {
      background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjYSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNSA5VjRhMSAxIDAgMCAxIDIgMHY0aDRhMSAxIDAgMSAxIDAgMkg2YTEgMSAwIDAgMS0xLTEiIGZpbGw9IiNCNDA5NTAiLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJhIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDE0djE0SDB6Ii8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+');
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
