import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type LoginInfo = {
  userid: string;
  password: string;
  saved: boolean;
};

/**
 * Login form element.
 */
@customElement('login-form')
export class LoginForm extends LitElement {
  @property({ type: String, attribute: false }) userid: string = '';

  @property({ type: String, attribute: false }) password: string = '';

  @property({ type: Boolean, attribute: false }) saved: boolean = false;

  setLoginInfo(info: LoginInfo) {
    this.userid = info.userid;
    this.password = info.password;
    this.saved = info.saved;
  }

  protected render() {
    return html`<h2 class="title">Login</h2>
      <form @submit=${this._onSubmit}>
        <input
          type="text"
          placeholder="아이디를 입력하세요."
          name="userid"
          id="userid"
          value="${this.userid}"
          @change=${(e: Event) => (this.userid = (e.target as HTMLInputElement).value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          name="password"
          id="password"
          value="${this.password}"
          @change=${(e: Event) => (this.password = (e.target as HTMLInputElement).value)}
          required
        />
        <span class="save-id">
          <input
            type="checkbox"
            name="save"
            id="save"
            ?checked=${this.saved}
            @change=${(e: Event) => (this.saved = (e.target as HTMLInputElement).checked)}
          />
          <label for="save">아이디 저장</label>
        </span>
        <button id="submit" type="submit">로그인</button>
      </form>`;
  }

  private _onSubmit(e: Event) {
    e.preventDefault();
    if (this._validateLoginData()) {
      const options = {
        detail: {
          userid: this.userid,
          password: this.password,
          saved: this.saved,
        },
        bubbles: false,
        composed: false,
      };
      this.dispatchEvent(new CustomEvent('login', options));
    }
  }

  private _validateLoginData() {
    return !(this.userid.trim() === '' || this.password.trim() === '');
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
      background-color: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      height: 580px;
      padding: 112px 60px 0 60px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .title {
      padding: 0;
      margin: 0;
      font-size: 40px;
      font-weight: 600;
      color: var(--font-primary);
    }

    form {
      margin: 51px 0 0 0;
      padding: 0;
      display: flex;
      flex-direction: column;
    }

    input[type='text'],
    input[type='password'] {
      padding: 14px;
      margin: 0 0 8px 0;
      border: 1px solid var(--input-border-normal);
      border-radius: 8px;
    }

    input[type='text']::placeholder,
    input[type='password']::placeholder {
      color: var(--font-placeholder);
    }

    input[type='text']:hover,
    input[type='password']:hover {
      border-color: var(--input-border-hover);
    }

    input[type='text']:focus,
    input[type='password']:focus {
      border-color: var(--input-border-active);
      outline: none;
    }

    input[type='password'] {
      margin-bottom: 0;
    }

    span.save-id {
      margin: 24px 0 70px 0;
      display: block;
      color: var(--font-secondary);
    }

    input[type='checkbox']:before {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNiAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSIxLjUiIHk9IjIuMTc3NzMiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIuNSIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSIxLjUiIHk9IjIuMTc3NzMiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIuNSIgc3Ryb2tlPSIjQ0JEMUQ3Ii8+Cjwvc3ZnPgo=)
        no-repeat center center #fff;
    }
    input[type='checkbox']:hover:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSIwLjUiIHk9IjEuMTc3NzMiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIuNSIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSIwLjUiIHk9IjEuMTc3NzMiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIuNSIgc3Ryb2tlPSIjOUNBNUIxIi8+Cjwvc3ZnPgo=);
    }
    input[type='checkbox']:checked:before {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNCAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB5PSIwLjY3NzczNCIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiByeD0iMyIgZmlsbD0iIzU0NjQ3NSIvPgogIDxwYXRoIGQ9Ik0zLjUgNy43NTcwNEw2LjIwNjY3IDEwLjE3NzdMMTAuNSA1LjY3NzczIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=);
    }

    button#submit {
      border: none;
      border-radius: 8px;
      background-color: var(--select-color);
      color: var(--font-inverse);
      height: 46px;
      font-size: 16px;
      padding-top: 2px;
      cursor: pointer;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'login-form': LoginForm;
  }
}
