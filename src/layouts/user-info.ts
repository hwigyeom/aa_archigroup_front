import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { LogoutSVG, UserInfoSVG } from '../components/icons.js';
import { SessionTimer } from './session-timer.js';

import './session-timer.js';

@customElement('user-info')
export class UserInfo extends LitElement {
  @property({ type: String }) name: string = '';
  @property({ type: Number }) sessionTime: number = SessionTimer.BASE_SESSION_TIME;

  @state() private sessionTimerStarted: boolean = false;

  @query('session-timer') private sessionTimer!: SessionTimer;

  public startSessionTimer(remain?: number) {
    if (this.sessionTimerStarted) return;

    this.sessionTimerStarted = true;
    if (typeof remain === 'number') {
      this.sessionTimer.remainingTime = remain;
    } else {
      this.sessionTimer.remainingTime = this.sessionTime;
    }
    this.sessionTimer.startTimer();
  }

  public resetSessionTimer(remain?: number) {
    if (!this.sessionTimerStarted) return;
    this.sessionTimer.resetSession(remain);
  }

  protected render() {
    return html`${this.userIcon()}
      <span>${this.name}</span>
      <session-timer
        sessionTime="${this.sessionTime}"
        ?visible=${this.sessionTimerStarted}
        @session-expired=${this.sessionExpiredHandler}
      ></session-timer>
      <button type="button" @click=${this.logoutHandler}>${this.logoutIcon()} 로그아웃</button> `;
  }

  private sessionExpiredHandler() {
    this.sessionTimerStarted = false;
    this.dispatchEvent(new CustomEvent('session-expired', { bubbles: true, composed: true }));
  }

  private logoutHandler(e: Event) {
    e.preventDefault();

    const options: EventInit = {
      bubbles: false,
      composed: false,
    };

    this.dispatchEvent(new CustomEvent('logout', options));
  }

  private userIcon() {
    return UserInfoSVG();
  }

  private logoutIcon() {
    return LogoutSVG();
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 24px;
    }

    span {
      margin: 0 12px 0 8px;
      color: var(--font-secondary);
      font-size: 12px;
    }

    button {
      display: inline-flex;
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      height: 24px;
      align-items: center;
      font-family: var(--font-family), serif;
      font-weight: var(--font-weight-normal);
      font-size: 12px;
      color: var(--font-secondary);
      cursor: pointer;
      margin-left: 4px;
    }

    button:hover {
      border-color: var(--input-border-hover);
    }

    button:active {
      border-color: var(--input-border-active);
    }

    button > svg {
      margin-right: 4px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'user-info': UserInfo;
  }
}
