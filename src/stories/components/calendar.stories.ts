import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html, nothing } from 'lit';
import { Calendar } from '../../components/calendar.ts';

import '../../components/calendar.ts';
import '../../components/calendar-day-view.ts';
import '../../components/calendar-month-view.ts';
import '../../components/calendar-year-view.ts';

import { ifDefined } from 'lit/directives/if-defined.js';

const meta: Meta<Calendar> = {
  title: 'Components/Calendar',
  component: 'aa-calendar',
};

export default meta;

type Story = StoryObj<Calendar>;

export const DefaultCalendar: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar value=${args.value || nothing}></aa-calendar>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['change', 'selected'],
    },
  },
  decorators: [withActions],
};

export const MonthCalendar: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar mode="month" value=${args.value || nothing}></aa-calendar>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['change', 'selected'],
    },
  },
  decorators: [withActions],
};

export const YearCalendar: Story = {
  render: (args) =>
    html`<div style="display: flex; height: 297px; width: 292px; border: 1px solid #ddd; border-radius: 8px;">
      <aa-calendar mode="year" value=${ifDefined(args.value)}></aa-calendar>
    </div>`,
  args: {
    value: '',
  },
  parameters: {
    actions: {
      handles: ['change', 'selected'],
    },
  },
  decorators: [withActions],
};
