import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Loading } from '../../components/loading.ts';

import '../../components/button.ts';
import '../../components/loading.ts';
import '../../components/dimmed-overlay.ts';

const meta: Meta<Loading> = {
  title: 'Components/Loading',
  component: 'aa-loading',
} satisfies Meta<Loading>;

export default meta;

type Story = StoryObj<Loading>;

export const Default: Story = {
  render: (args) => html`<aa-loading message=${args.message}></aa-loading>`,
  args: {
    message: '로딩중입니다.',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};

export const UseFunction: Story = {
  render: () =>
    html`<aa-button
      id="showLoading"
      @click=${() => {
        Loading.show('로딩중입니다.');
        setTimeout(() => {
          Loading.hide();
        }, 1000);
      }}
      >로딩 시작</aa-button
    >`,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
  },
};
