import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('aa-dimmed-overlay')
export class DimmedOverlay extends LitElement {
  //#region static
  static modalStack: HTMLElement[] = [];

  private static findOverlay() {
    const overlays = document.querySelectorAll('aa-dimmed-overlay');
    if (!overlays || overlays.length === 0) return;

    let found: DimmedOverlay | undefined = undefined;
    for (const item of overlays) {
      const overlay = item as DimmedOverlay;
      const style = window.getComputedStyle(overlay);
      if (style.display !== 'none' && style.visibility !== 'hidden') {
        found = overlay;
        break;
      }
    }
    return found;
  }

  static show(owner: HTMLElement) {
    let overlay = this.findOverlay();
    if (!overlay) {
      overlay = document.createElement('aa-dimmed-overlay') as DimmedOverlay;
      overlay.owner = owner;
    }
    this.modalStack.push(owner);
    document.body.insertBefore(overlay, owner);
    return overlay;
  }

  static hide() {
    const overlay = this.findOverlay();
    if (overlay && this.modalStack.length > 0) {
      this.modalStack.pop();
      if (this.modalStack.length === 0) {
        document.body.removeChild(overlay);
      } else {
        this.updateZIndex(overlay);
      }
    }
  }

  static updateZIndex(overlay: DimmedOverlay) {
    const topModal = this.modalStack[this.modalStack.length - 1];
    if (topModal) {
      const modalZIndex = Number(window.getComputedStyle(topModal).zIndex) || 900;
      const overlayZIndex = Math.floor(modalZIndex / 100) * 100;
      overlay.style.zIndex = overlayZIndex.toString();
      document.body.insertBefore(overlay, topModal);
    }
  }
  //#endregion

  @property({ type: HTMLElement }) owner: HTMLElement | undefined = undefined;

  protected render() {
    return html`&nbsp;`;
  }

  static styles = css`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      z-index: 900;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-dimmed-overlay': DimmedOverlay;
  }
}
