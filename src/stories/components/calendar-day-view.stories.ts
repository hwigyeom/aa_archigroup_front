import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CalendarDayView } from '../../components/calendar-day-view.ts';

import '../../components/calendar-day-view.ts';

const meta: Meta<CalendarDayView> = {
  title: 'Components/Calendar/Layouts',
  component: 'aa-calendar-day-view',
};

export default meta;

type Story = StoryObj<CalendarDayView>;

export const DayViewLayout: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar-day-view value=${ifDefined(args.value)}></aa-calendar-day-view>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['date-selected', 'month-clicked'],
    },
  },
  decorators: [withActions],
};
