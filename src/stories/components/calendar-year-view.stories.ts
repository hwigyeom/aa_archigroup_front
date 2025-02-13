import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { CalendarYearView } from '../../components/calendar-year-view.ts';

import '../../components/calendar-year-view.ts';

const meta: Meta<CalendarYearView> = {
  title: 'Components/Calendar/Layouts',
  component: 'aa-calendar-year-view',
};

export default meta;

type Story = StoryObj<CalendarYearView>;

export const YearViewLayout: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar-year-view value=${args.value}></aa-calendar-year-view>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['year-selected'],
    },
  },
  decorators: [withActions],
};
