import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

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

  public onLogount(handler: (e: Event) => void) {
    this.addEventListener('logout', handler);
  }

  private userIcon() {
    return html`<svg
      id="userIcon"
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 .75H6a6 6 0 0 0-6 6v6a6 6 0 0 0 6 6h6a6 6 0 0 0 6-6v-6a6 6 0 0 0-6-6" fill="#9ca5b1" />
      <path
        d="M6 1.25h6a5.5 5.5 0 0 1 5.5 5.5v6a5.5 5.5 0 0 1-5.5 5.5H6a5.5 5.5 0 0 1-5.5-5.5v-6A5.5 5.5 0 0 1 6 1.25Z"
        stroke="#3C3C43"
        stroke-opacity=".03"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 6.75a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 6.26v.736l8 .004v-.735c0-.866-.273-1.697-.758-2.309-.486-.612-1.145-.956-1.832-.956H7.59c-.687 0-1.345.343-1.83.955S5 12.145 5 13.01"
        fill="#fff"
      />
    </svg>`;
  }

  private logoutIcon() {
    return html`<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.582 11.326a.734.734 0 0 0 0 1.047c.293.29.768.29 1.06 0l3.138-3.099a.734.734 0 0 0 0-1.047l-3.137-3.1a.757.757 0 0 0-1.061 0 .734.734 0 0 0 0 1.047L12.46 8.03H6.002a.745.745 0 0 0-.75.741c0 .409.336.74.75.74h6.417z"
        fill="#9CA5B1"
      />
      <path
        opacity=".6"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.781 2.781a.75.75 0 0 0-.75.75v10.532c0 .414.336.75.75.75h6.532a.75.75 0 0 0 .75-.75v-1.847a.75.75 0 0 0-1.5 0v1.097H2.53V4.28h5.003v1.127a.75.75 0 0 0 1.5 0V3.53a.75.75 0 0 0-.75-.75z"
        fill="#9CA5B1"
      />
    </svg>`;
  }

  static styles = css`
    :host {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 24px;
    }
    #userIcon {
      margin-right: 8px;
    }
    span {
      margin-right: 8px;
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
