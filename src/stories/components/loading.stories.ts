import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Loading } from '../../components/loading.ts';

import '../../components/button.ts';
import '../../components/loading.ts';
import '../../components/dimmed-overlay.ts';

const argTypes: ArgTypes = {
  message: {
    control: 'text',
    description: '로딩 메시지',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: '로딩중입니다.',
      },
    },
  },
};

const meta: Meta<Loading> = {
  title: 'Components/Loading',
  component: 'aa-loading',
} satisfies Meta<Loading>;

export default meta;

type Story = StoryObj;

export const Layout: Story = {
  render: (args) => html`<aa-loading message=${args.message}></aa-loading>`,
  args: {
    message: '로딩중입니다.',
  },
  argTypes,
};

export const Usage: Story = {
  render: () =>
    html`<aa-button
      id="showLoading"
      @click=${() => {
        Loading.show('로딩중입니다.');
        setTimeout(() => {
          Loading.hide();
        }, 3000);
      }}
      >로딩 시작</aa-button
    >`,
};
