import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { YearCalendar } from '../../components/year-calendar.ts';

import '../../components/year-calendar.ts';

const meta: Meta<YearCalendar> = {
  title: 'Components/DatePicker',
  component: 'aa-year-calendar',
};

export default meta;

type Story = StoryObj<YearCalendar>;

export const YearCalendarLayout: Story = {
  render: () =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-year-calendar></aa-year-calendar>
    </div>`,
  args: {},
  parameters: {
    actions: {
      handles: ['year-selected'],
    },
  },
  decorators: [withActions],
};
