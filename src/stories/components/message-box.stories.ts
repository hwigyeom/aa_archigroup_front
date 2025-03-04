import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { MessageBox } from '../../components/message-box.ts';
import { getIcon, Icons } from '../../components/icons.ts';

import '../../components/button.ts';
import '../../components/message-box.ts';

const argTypes: ArgTypes = {
  icon: {
    control: 'select',
    options: ['none', 'ok', 'error', 'info', 'question', 'warning'],
    description: '헤더 영역에 출력할 아이콘입니다.',
    table: {
      category: 'Properties',
      type: {
        summary: 'none | ok | error | info | question | warning',
      },
      defaultValue: {
        summary: 'none',
      },
    },
  },
  buttons: {
    control: 'select',
    options: ['ok', 'okcancel', 'yesno'],
    description: '푸터 영역에 출력할 버튼의 형식을 지정합니다.',
    table: {
      category: 'Properties',
      type: {
        summary: 'ok | okcancel | yesno',
      },
      defaultValue: {
        summary: 'ok',
      },
    },
  },
  title: {
    control: 'text',
    description: '메시지박스의 타이틀입니다.<br /> _(타이틀을 출력하지 않으려면 빈 문자열을 지정하십시오.)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  message: {
    control: 'text',
    description: '메시지박스에서 출력할 메시지입니다.',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  close: {
    action: 'close',
    description: '메시지박스를 닫을 때 발생하는 이벤트.',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
};

const meta: Meta<MessageBox> = {
  title: 'Components/MessageBox',
  component: 'aa-message-box',
} satisfies Meta<MessageBox>;

export default meta;

type Story = StoryObj<MessageBox>;

export const Layout: Story = {
  render: (args) =>
    html`<aa-message-box
      icon=${args.icon}
      title=${args.title}
      message=${args.message}
      buttons=${args.buttons}
    ></aa-message-box>`,
  args: {
    icon: 'ok',
    title: 'Title',
    message: 'Message',
    buttons: 'ok',
  },
  argTypes,
};

export const NoTitleLayout: Story = {
  render: () => {
    return html`<aa-message-box icon="ok" title="" message="Message" buttons="ok"></aa-message-box>`;
  },
  argTypes: undefined,
};

export const SupportIcons: Story = {
  render: () => {
    const icons = ['ok', 'error', 'info', 'question', 'warning'];

    return html`
      <style>
        #message-box-icons {
          grid-template-rows: 30px auto;
          grid-template-columns: repeat(${icons.length + 1}, 1fr);
        }
      </style>
      <div id="message-box-icons" class="grid-table-container">
        <div class="grid-header-cell"><pre>none</pre></div>
        ${icons.map((icon) => html`<div class="grid-header-cell"><pre>${icon}</pre></div>`)}
        <div class="grid-cell">-</div>
        ${icons.map(
          (icon) => html`<div class="grid-cell">${getIcon('svg', `message-box-icon-${icon}` as Icons)()}</div>`
        )}
      </div>
    `;
  },
};

export const SupportButtons: Story = {
  render: () => {
    const buttons = ['ok', 'okcancel', 'yesno'];

    return html`
      <style>
        #message-box-buttons {
          grid-template-rows: 30px auto;
          grid-template-columns: repeat(${buttons.length}, auto);
        }
      </style>
      <div id="message-box-buttons" class="grid-table-container">
        ${buttons.map((button) => html`<div class="grid-header-cell"><pre>${button}</pre></div>`)}
        <div class="grid-cell">
          <aa-button size="large" color="primary" style="width: 60px">확인</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button size="large" style="width: 60px; margin-right: 8px;">취소</aa-button>
          <aa-button size="large" color="primary" style="width: 60px">확인</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button size="large" style="width: 60px; margin-right: 8px;">아니오</aa-button>
          <aa-button size="large" color="primary" style="width: 60px">예</aa-button>
        </div>
      </div>
    `;
  },
};

export const ClickedButton: Story = {
  render: () => {
    const buttons = ['ok', 'cancel', 'yes', 'no'];

    return html`
      <style>
        #message-box-clicked-button {
          grid-template-rows: 30px auto auto;
          grid-template-columns: repeat(${buttons.length}, auto);
        }
      </style>
      <div id="message-box-clicked-button" class="grid-table-container">
        ${buttons.map((button) => html`<div class="grid-header-cell"><pre>${button}</pre></div>`)}
        <div class="grid-cell">
          <aa-button size="large" color="primary" style="width: 60px">확인</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button size="large" style="width: 60px">취소</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button size="large" color="primary" style="width: 60px">예</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button size="large" style="width: 60px">아니오</aa-button>
        </div>
      </div>
    `;
  },
};

export const UseFunction: Story = {
  render: () => html`
    <aa-button
      color="primary"
      @click=${() => {
        MessageBox.show({
          icon: 'question',
          title: '저장',
          message: '저장하시겠습니까?<br/>시간이 많이 걸릴 수 있습니다.',
          buttons: 'yesno',
        });
      }}
      >메시지 박스 출력</aa-button
    >
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
      canvas: {
        sourceState: 'none',
      },
    },
  },
};
