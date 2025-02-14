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
  render: (args) => html`
    <aa-date-picker type=${args.type}></aa-date-picker>
  `,
  args: {
    type: 'date',
  },
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

export const MultipleDatePicker: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px;">
      <aa-date-picker id="date" type="date" @input=${() => {
        document.querySelector('#date-value')!.textContent =
          (document.querySelector('#date') as DatePicker)?.value ?? '';
      }} @change=${() => {
        document.querySelector('#date-value')!.textContent =
          (document.querySelector('#date') as DatePicker)?.value ?? '';
      }}></aa-date-picker>
      <aa-date-picker id="month" type="month" @input=${() => {
        document.querySelector('#month-value')!.textContent =
          (document.querySelector('#month') as DatePicker)?.value ?? '';
      }} @change=${() => {
        document.querySelector('#month-value')!.textContent =
          (document.querySelector('#month') as DatePicker)?.value ?? '';
      }}></aa-date-picker>
      <aa-date-picker id="year" type="year" @input=${() => {
        document.querySelector('#year-value')!.textContent =
          (document.querySelector('#year') as DatePicker)?.value ?? '';
      }} @change=${() => {
        document.querySelector('#year-value')!.textContent =
          (document.querySelector('#year') as DatePicker)?.value ?? '';
      }}></aa-date-picker>
    </div>
    <div style="display: flex; gap: 10px; flex-direction: column; margin-top: 30px">
      <div><label>date - value: </label><span id="date-value"></span></div>
      <div><label>month - value: </label><span id="month-value"></span></div>
      <div><label>year - value: </label><span id="year-value"></span></div>
    </div>
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

export const CustomWidth: Story = {
  render: () => html`
    <aa-date-picker style="width: 300px;"></aa-date-picker>
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 400,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions],
};
