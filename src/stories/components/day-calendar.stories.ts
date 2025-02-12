import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { DayCalendar } from '../../components/day-calendar.ts';

import '../../components/day-calendar.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta<DayCalendar> = {
  title: 'Components/DatePicker',
  component: 'aa-day-calendar',
};

export default meta;

type Story = StoryObj<DayCalendar>;

export const DayCalendarLayout: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-day-calendar value=${ifDefined(args.value)}></aa-day-calendar>
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
