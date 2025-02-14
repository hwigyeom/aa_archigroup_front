import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { DatePicker } from '../../components/date-picker.ts';

import '../../components/date-picker.ts';
import '../../components/date-picker-popover.ts';

const meta: Meta<DatePicker> = {
  title: 'Components/DatePicker',
  component: 'aa-date-picker',
};

export default meta;

type Story = StoryObj<DatePicker>;

export const DatePickerDefault: Story = {
  render: () => html`
    <aa-date-picker></aa-date-picker>
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions],
};
