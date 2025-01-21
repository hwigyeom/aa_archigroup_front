import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DimmedOverlay } from './dimmed-overlay.ts';

@customElement('aa-loading')
export class Loading extends LitElement {
  static show(message: string) {
    const loading = document.createElement('aa-loading') as Loading;
    const overlay = document.createElement('dimmed-overlay') as DimmedOverlay;

    if (message) {
      loading.message = message;
    }

    document.body.appendChild(overlay);
    document.body.appendChild(loading);
  }

  static hide() {
    const loading = document.querySelector('aa-loading') as Loading;
    const overlay = document.querySelector('dimmed-overlay') as DimmedOverlay;

    if (loading) {
      document.body.removeChild(loading);
    }
    if (overlay) {
      document.body.removeChild(overlay);
    }
  }
  @property({ type: String }) message: string = '로딩중입니다.';

  protected render() {
    return html`
      <span class="spinner"></span>
      ${this.message ? html`<span class="message">${this.message}</span>` : ''}
    `;
  }

  static styles = css`
    :host {
      font-family: var(--font-fmaily), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 995;
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
      width: 300px;
      height: 176px;
      overflow: hidden;
      f;
    }

    .spinner {
      display: block;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: conic-gradient(#0000 10%, #b40950);
      -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
      animation: spinner-rotate 1s infinite linear;
    }

    @keyframes spinner-rotate {
      to {
        transform: rotate(1turn);
      }
    }

    .message {
      margin-top: 16px;
      display: block;
      font-size: var(--font-size-default);
      color: var(--font-primary);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-loading': Loading;
  }
  interface Window {
    Loading: typeof Loading;
  }
}

window.Loading = Loading;
