import { css, html, LitElement, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getIcon } from '../components/icons.js';

@customElement('session-timer')
export class SessionTimer extends LitElement {
  static BASE_SESSION_TIME = 60 * 20;

  @property({ type: Number }) sessionTime: number = SessionTimer.BASE_SESSION_TIME;
  @property({ type: Number }) remainingTime: number = this.sessionTime;
  @property({ type: Boolean }) running: boolean = false;

  @state() private lastFrameTime: number = 0;
  @state() private animationFrameId: number | null = null;

  protected render() {
    const hours = String(Math.floor(this.remainingTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((this.remainingTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(this.remainingTime % 60).padStart(2, '0');

    if (this.running) {
      return html`${this.splitterSVG()} ${getIcon('svg', 'stopwatch')()}
        <span>${hours}:${minutes}:${seconds}</span>
        <aa-button color="primary" @click=${this.expandSessionHandler}>시간연장</aa-button>`;
    } else {
      return html``;
    }
  }

  public resetSessionTimer(remain?: number) {
    if (!this.running) return;

    this.remainingTime = typeof remain === 'number' ? remain : this.sessionTime;
    this.lastFrameTime = performance.now();
    this.requestUpdate();
  }

  public startSessionTimer(remain?: number) {
    if (this.running) return;

    this.running = true;

    this.remainingTime = typeof remain === 'number' ? remain : this.sessionTime;
    this.lastFrameTime = performance.now();

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.tick();
  }

  private tick() {
    const now = performance.now();
    const elapsed = now - this.lastFrameTime;

    if (elapsed >= 1000) {
      const secondsElapsed = Math.floor(elapsed / 1000);
      this.remainingTime -= secondsElapsed;
      this.lastFrameTime = now - (elapsed % 1000);

      if (this.remainingTime <= 0) {
        this.running = false;
        this.dispatchEvent(new CustomEvent('session-expired', { bubbles: true, composed: true }));
        cancelAnimationFrame(this.animationFrameId!);
      }

      this.requestUpdate();
    }
    if (this.running) this.animationFrameId = requestAnimationFrame(() => this.tick());
  }

  private expandSessionHandler() {
    this.dispatchEvent(new CustomEvent('expand-session', { bubbles: true, composed: true }));
    this.resetSessionTimer();
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
      width: 49px;
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
