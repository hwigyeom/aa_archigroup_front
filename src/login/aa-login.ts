import { css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { LoginForm, LoginInfo } from '../components/login-form.ts';

@customElement('aa-login')
export class Login extends LoginForm {
  constructor() {
    super();
  }

  @state()
  private loading = false;

  connectedCallback() {
    super.connectedCallback();

    super.addEventListener('login', async (e) => this._handleLogin(e as CustomEvent<LoginInfo>));

    // TODO: localstorage 에 저장된 로그인 정보가 있으면 불러와 설정한다.
    super.setLoginInfo({
      userid: 'aaarchigroup',
      password: '1234',
      saved: true,
    });
  }

  protected render() {
    return html`${super.render()} ${this.loading ? html`<div class="modal"></div>` : ``}`;
  }

  private async _handleLogin(e: CustomEvent<LoginInfo>) {
    const { userid, password, saved } = e.detail;

    this.loading = true;

    // TODO: ajax 로그인 요청
    console.log(userid, password, saved);
    const promise = new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
    await promise;

    this.loading = false;
  }

  static styles = css`
    ${LoginForm.styles}

    .modal {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.3);
      border: 0;
      border-radius: 16px;
    }
  `;
}
