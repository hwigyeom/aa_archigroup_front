import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { DimmedOverlay } from './dimmed-overlay.ts';
import {
  MessageBoxIconErrorSVG,
  MessageBoxIconInfoSVG,
  MessageBoxIconOKSVG,
  MessageBoxIconQuestionSVG,
  MessageBoxIconWarningSVG,
} from './icons.js';

import './button.ts';
import './dimmed-overlay.js';

export type MessageBoxIcon = 'none' | 'ok' | 'error' | 'info' | 'question' | 'warning';
export type MessageBoxButton = 'ok' | 'okcancel' | 'yesno';
export type MessageBoxInitOption = {
  icon?: MessageBoxIcon;
  title?: string;
  message?: string;
  buttons?: MessageBoxButton;
};

@customElement('aa-message-box')
export class MessageBox extends LitElement {
  static async show(
    option: MessageBoxInitOption
  ): Promise<{ state: 'ok' | 'cancel' | 'yes' | 'no'; result?: unknown }> {
    return new Promise((resolve) => {
      const messageBox = document.createElement('aa-message-box') as MessageBox;

      const defaultOption: MessageBoxInitOption = {
        icon: 'ok',
        message: '',
        buttons: 'ok',
      };

      const { icon, title, message, buttons } = { ...defaultOption, ...option };

      messageBox.icon = icon!;
      messageBox.title = title!;
      messageBox.message = message!;
      messageBox.buttons = buttons!;

      document.body.appendChild(messageBox);
      DimmedOverlay.show(messageBox);

      messageBox.addEventListener('close', (e: Event) => {
        const customEvent = e as CustomEvent;
        DimmedOverlay.hide();
        document.body.removeChild(messageBox);
        resolve(customEvent?.detail || { state: 'ok' });
      });
    });
  }

  @property({ type: String }) icon: MessageBoxIcon = 'none';
  @property({ type: String }) buttons: MessageBoxButton = 'ok';
  @property({ type: String }) title: string = '';
  @property({ type: String }) message: string = '';

  constructor() {
    super();
  }

  protected render() {
    return html`<section class="content">${this.renderIcon()}${this.renderTitle()}${this.renderMessage()}</section>
      ${this.renderFooter()}`;
  }

  private renderIcon() {
    if (this.icon === 'none') return '';

    switch (this.icon) {
      case 'ok':
        return html`<div class="icon">${MessageBoxIconOKSVG()}</div>`;
      case 'error':
        return html`<div class="icon">${MessageBoxIconErrorSVG()}</div>`;
      case 'info':
        return html`<div class="icon">${MessageBoxIconInfoSVG()}</div>`;
      case 'question':
        return html`<div class="icon">${MessageBoxIconQuestionSVG()}</div>`;
      case 'warning':
        return html`<div class="icon">${MessageBoxIconWarningSVG()}</div>`;
      default:
        return '';
    }
  }

  private renderTitle() {
    return this.title ? html`<header class="title">${this.title}</header>` : '';
  }

  private renderMessage() {
    return html`<section class="message">${unsafeHTML(this.message) || '&nbsp;'}</section>`;
  }

  private renderFooter() {
    let buttons: TemplateResult = html``;
    switch (this.buttons) {
      case 'ok':
        buttons = html`<aa-button
          class="button"
          size="large"
          color="primary"
          style="width: 60px"
          @click=${(e: Event) => this.buttonClickHandler(e, 'ok')}
          >확인</aa-button
        >`;
        break;
      case 'okcancel':
        buttons = html`<aa-button
            class="button"
            size="large"
            style="width: 60px"
            @click=${(e: Event) => this.buttonClickHandler(e, 'cancel')}
            >취소</aa-button
          >
          <aa-button
            class="button"
            size="large"
            color="primary"
            style="width: 60px"
            @click=${(e: Event) => this.buttonClickHandler(e, 'ok')}
            >확인</aa-button
          >`;
        break;
      case 'yesno':
        buttons = html`<aa-button
            class="button"
            size="large"
            style="width: 60px"
            @click=${(e: Event) => this.buttonClickHandler(e, 'no')}
            >아니오</aa-button
          >
          <aa-button
            class="button"
            size="large"
            color="primary"
            style="width: 60px"
            @click=${(e: Event) => this.buttonClickHandler(e, 'yes')}
            >예</aa-button
          >`;
        break;
    }
    return html`<footer>${buttons}</footer>`;
  }

  private buttonClickHandler(e: Event, button: 'ok' | 'cancel' | 'yes' | 'no') {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('close', { detail: { state: button } }));
  }

  static styles = css`
    :host {
      font-family: var(--font-family), serif;
      font-size: var(--font-size-default);
      font-weight: var(--font-weight-normal);
      display: block;
      position: fixed;
      padding: 28px 0 0 0;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 990;
      background-color: #fff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
      min-width: 300px;
      max-width: 90vw;
      overflow: hidden;
    }

    .content {
      min-height: 84px;
      padding: 0 30px;
      margin-bottom: 12px;
    }

    .icon {
      text-align: center;
      margin-bottom: 12px;
    }

    .title,
    .message {
      text-align: center;
      color: #222429;
      white-space: nowrap;
    }

    .title {
      font-weight: var(--font-weight-semi-bold);
      margin-bottom: 12px;
    }

    .message {
      margin-bottom: 0;
      min-height: 36px;
      max-height: 80vh;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .message::-webkit-scrollbar {
      width: 5px;
    }

    .message::-webkit-scrollbar-track {
      background: transparent;
    }

    .message::-webkit-scrollbar-thumb {
      background: #9ca5b166;
      border-radius: 3px;
    }

    .message::-webkit-scrollbar-thumb:hover {
      background-color: #9ca5b1;
    }

    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 0 30px 16px 30px;
    }

    .button {
      margin-right: 8px;
    }

    .button:last-child {
      margin-right: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'aa-message-box': MessageBox;
  }
  interface Window {
    MessageBox: typeof MessageBox;
  }
}

window.MessageBox = MessageBox;
