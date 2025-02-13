import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html, nothing } from 'lit';
import { CalendarMonthView } from '../../components/calendar-month-view.ts';

import '../../components/calendar-month-view.ts';

const meta: Meta<CalendarMonthView> = {
  title: 'Components/Calendar/Layouts',
  component: 'aa-calendar-month-view',
};

export default meta;

type Story = StoryObj<CalendarMonthView>;

export const MonthViewLayout: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar-month-view value=${args.value || nothing}></aa-calendar-month-view>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['month-selected', 'year-clicked'],
    },
  },
  decorators: [withActions],
};
