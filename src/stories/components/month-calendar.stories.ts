import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { MonthCalendar } from '../../components/month-calendar.ts';

import '../../components/month-calendar.ts';

const meta: Meta<MonthCalendar> = {
  title: 'Components/DatePicker',
  component: 'aa-month-calendar',
};

export default meta;

type Story = StoryObj<MonthCalendar>;

export const MonthCalendarLayout: Story = {
  render: () =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-month-calendar></aa-month-calendar>
    </div>`,
  args: {},
  parameters: {
    actions: {
      handles: ['month-selected', 'year-clicked'],
    },
  },
  decorators: [withActions],
};
