import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { PopupDialog } from '../../components/popup-dialog.ts';

import '../../components/popup-dialog.ts';

const meta: Meta<PopupDialog> = {
  title: 'Components/PopupDialog',
  component: 'aa-popup-dialog',
} satisfies Meta<PopupDialog>;

export default meta;

type Story = StoryObj<PopupDialog>;

export const Default: Story = {
  render: (args) =>
    html` <aa-popup-dialog id=${args.id} title="${args.title}">
      <div>팝업 내용</div>
    </aa-popup-dialog>`,
  args: {
    id: 'popup-01',
    title: '팝업 타이틀',
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
      canvas: {
        sourceState: 'none',
      },
    },
  },
};
