import { css, html, LitElement, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getIcon } from '../components/icons.ts';

@customElement('session-timer')
export class SessionTimer extends LitElement {
  static BASE_SESSION_TIME = 60 * 20;

  @property({ type: Number }) sessionTime: number = SessionTimer.BASE_SESSION_TIME;
  @property({ type: Number }) remainingTime: number = this.sessionTime;
  @property({ type: Boolean }) sessionExpired: boolean = false;
  @property({ type: Boolean }) visible: boolean = false;

  protected render() {
    const hours = String(Math.floor(this.remainingTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((this.remainingTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(this.remainingTime % 60).padStart(2, '0');

    if (this.visible) {
      return html`${this.splitterSVG()} ${getIcon('svg', 'stopwatch')()}
        <span>${hours}:${minutes}:${seconds}</span>
        <aa-button color="primary" @click=${() => this.resetSession()}>시간연장</aa-button>`;
    } else {
      return html``;
    }
  }

  public resetSession(remain?: number | undefined) {
    this.remainingTime = typeof remain === 'undefined' ? this.sessionTime : remain;
  }

  public startTimer() {
    this.visible = true;
    const interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
      } else {
        clearInterval(interval);
        this.dispatchEvent(new CustomEvent('session-expired', { bubbles: true, composed: true }));
        this.visible = false;
      }
    }, 1000);
  }

  private splitterSVG() {
    return svg`<svg class="splitter" xmlns="http://www.w3.org/2000/svg" width="1" height="12" viewBox="0 0 1 12">
      <rect width="1" height="12" fill="#D9D9D9" />
    </svg>`;
  }

  static styles = css`
    :host {
      font-family: var(--font-family), serif;
      display: inline-flex;
      align-items: center;
      justify-content: flex-start;
    }

    svg.splitter {
      margin-right: 12px;
    }

    span {
      display: inline-block;
      width: 60px;
      font-size: 12px;
      color: var(--font-secondary);
      margin-left: 2px;
      margin-right: 10px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'session-timer': SessionTimer;
  }
}
