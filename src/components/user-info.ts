import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { LogoutSVG, UserInfoSVG } from './icons.js';

@customElement('user-info')
export class UserInfo extends LitElement {
  @property({ type: String }) name: string = '';

  protected render() {
    return html`${this.userIcon()}
      <span>${this.name}</span>
      <button type="button" @click=${this.logoutHandler}>${this.logoutIcon()} 로그아웃</button> `;
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
      margin: 0 8px;
      color: var(--font-secondary);
    }
    button {
      display: inline-flex;
      border: 1px solid var(--input-border-normal);
      border-radius: 4px;
      height: 24px;
      align-items: center;
      color: var(--font-secondary);
      cursor: pointer;
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
