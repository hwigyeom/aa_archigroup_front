import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { DatePickerPopover } from '../../components/date-picker-popover.ts';

import '../../components/date-picker-popover.ts';
import '../../components/button.ts';

const meta: Meta<DatePickerPopover> = {
  title: 'Components/DatePicker',
  component: 'aa-date-picker-popover',
};

export default meta;

type Story = StoryObj<DatePickerPopover>;

export const PopoverOpenTest: Story = {
  render: () => html`
    <aa-button color="primary" @click=${() => {
      const popover = document.createElement('aa-date-picker-popover') as DatePickerPopover;
      popover.owner = document.querySelector('aa-button');
      document.body.appendChild(popover);
      popover.open = true;
    }}>팝오버 오픈</aa-button>
  `,
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
    actions: {
      handles: [],
    },
  },
  decorators: [withActions],
};
