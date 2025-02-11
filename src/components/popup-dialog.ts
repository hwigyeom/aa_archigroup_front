import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DimmedOverlay } from './components.js';
import { getIcon } from './icons.ts';

export type PopupDialogOption = {
  id: string;
  title: string;
  url?: string;
  width?: number;
  height?: number;
};

@customElement('aa-popup-dialog')
export class PopupDialog extends LitElement {
  static async open(option: PopupDialogOption): Promise<unknown> {
    const dialog = document.createElement('aa-popup-dialog') as PopupDialog;
    const { id, title, url, width, height } = option;
    const maxZIndex = PopupDialog.maxZIndex() || 699;

    dialog.id = id;
    dialog.title = title;
    dialog.url = url || '';
    dialog.width = width || dialog.width;
    dialog.height = height || dialog.height;

    document.body.appendChild(dialog);
    dialog.style.zIndex = (maxZIndex + 2).toString();

    DimmedOverlay.show(dialog);

    return new Promise((resolve) => {
      dialog.addEventListener('close-dialog', (e: Event) => {
        const customEvent = e as CustomEvent;
        DimmedOverlay.hide();
        resolve(customEvent?.detail);
      });
    });
  }

  static find(id: string): PopupDialog | null {
    return document.querySelector(`aa-popup-dialog[id="${id}"]`) as PopupDialog;
  }

  static maxZIndex(): number {
    const dialogs = document.querySelectorAll('aa-popup-dialog');
    let max = 0;
    for (const dialog of dialogs) {
      const zIndex = Number(window.getComputedStyle(dialog).zIndex);
      if (zIndex > max) {
        max = zIndex;
      }
    }
    return max;
  }

  @property({ type: String, reflect: true }) id: string = '';
  @property({ type: String }) title: string = '팝업';
  @property({ type: String }) url: string = '';
  @property({ type: Number }) width: number = 380;
  @property({ type: Number }) height: number = 440;

  public close(returnObj: unknown) {
    this.dispatchEvent(new CustomEvent('close-dialog', { detail: returnObj, bubbles: true, composed: true }));
    this.remove();
  }

  protected firstUpdated() {
    this.loadContent();
  }

  protected render() {
    return html`
      <style>
        :host {
          width: ${this.width}px;
          height: ${this.height}px;
        }
      </style>
      <header>
        <h4>${this.title}</h4>
        <a href="#" @click=${this.closeHandler}>${getIcon('svg', 'close-outlined')()}</a>
      </header>
      <section>
        <slot></slot>
      </section>
    `;
  }

  private async loadContent() {
    if (this.url) {
      try {
        const response = await fetch(this.url);
        if (response.ok) {
          const content = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(content, 'text/html');
          this.innerHTML = '';
          Array.from(doc.body.childNodes).forEach((node) => {
            if (node.nodeName !== 'SCRIPT') {
              this.appendChild(node);
            }
          });

          // Execute scripts
          Array.from(doc.querySelectorAll('script')).forEach((oldScript) => {
            const newScript = document.createElement('script');
            newScript.text = oldScript.text;
            this.appendChild(newScript);
          });
        } else {
          console.error('Failed to load content:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to load content:', error);
      }
    }
  }

  private closeHandler(e: Event) {
    e.preventDefault();
    this.close(undefined);
  }

  static styles = css`
    :host {
      font-family: var(--font-family), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 701;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
      overflow: hidden;
      padding: 0 16px 24px 16px;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 50px;
      padding-top: 3px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--divider-color);
      flex-shrink: 0;
    }

    h4 {
      margin: 0;
      padding: 0 0 0 4px;
      color: var(--font-primary);
      font-weight: var(--font-weight-bold);
    }

    section {
      display: flex;
      flex-direction: column;
      flex-grow: 2;
      overflow-y: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-popup-dialog': PopupDialog;
  }
  interface Window {
    PopupDialog: typeof PopupDialog;
  }
}

window.PopupDialog = PopupDialog;
