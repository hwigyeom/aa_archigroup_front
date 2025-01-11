import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CheckboxCheckedDataUri, CheckboxDataUri } from './icons.ts';
import { CHECKBOX_HOVER_BORDER_COLOR } from './constants.ts';

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
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      color: var(--font-secondary);
    }

    input[type='checkbox'] {
      margin: 0;
      padding: 0;
    }
    input[type='checkbox']:before {
      position: relative;
      display: block;
      width: 16px;
      height: 16px;
      content: '';
      background: url('${unsafeCSS(CheckboxDataUri())}') no-repeat center center #fff;
    }
    input[type='checkbox']:hover:before {
      background-image: url('${unsafeCSS(CheckboxDataUri(CHECKBOX_HOVER_BORDER_COLOR))}');
    }
    input[type='checkbox']:checked:before {
      background-image: url('${unsafeCSS(CheckboxCheckedDataUri())}');
    }

    label[for='save'] {
      display: inline-block;
      margin-left: 8px;
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
