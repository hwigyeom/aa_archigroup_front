import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { MessageBox } from '../../components/message-box.ts';
import { html } from 'lit';

import '../../components/button.ts';
import '../../components/message-box.ts';

const messageBoxArgTypes: ArgTypes = {
  icon: {
    control: 'select',
    options: ['none', 'ok', 'error', 'info', 'question', 'warning'],
    description: 'The icon of the message box',
    table: {
      category: 'Properties',
      type: {
        summary: 'none | ok | error | info | question | warning',
      },
    },
  },
  buttons: {
    control: 'select',
    options: ['ok', 'okcancel', 'yesno'],
    description: 'The buttons of the message box',
    table: {
      category: 'Properties',
      type: {
        summary: 'ok | okcancel | yesno',
      },
    },
  },
  title: {
    control: 'text',
    description: 'The title of the message box',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  message: {
    control: 'text',
    description: 'The message of the message box',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
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

export const Default: Story = {
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
  argTypes: {
    icon: messageBoxArgTypes.icon,
    title: messageBoxArgTypes.title,
    message: messageBoxArgTypes.message,
    buttons: messageBoxArgTypes.buttons,
  },
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
