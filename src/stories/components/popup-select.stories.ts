import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { html } from 'lit';
import { PopupSelect } from '../../components/popup-select.ts';

import '../../components/popup-select.ts';

const popupSelectArgTypes: ArgTypes = {
  name: {
    control: 'text',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  text: {
    control: 'text',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  disabled: {
    control: 'boolean',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  readonly: {
    control: 'boolean',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  placeholder: {
    control: 'text',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
};

const meta: Meta<PopupSelect> = {
  title: 'Components/PopupSelect',
  component: 'aa-popup-select',
} satisfies Meta<PopupSelect>;

export default meta;

type Story = StoryObj<PopupSelect>;

export const Default: Story = {
  render: (args) =>
    html`<aa-popup-select
      name=${args.name}
      value=${args.value}
      text=${args.text}
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
    ></aa-popup-select>`,
  args: {
    name: 'codeSelect',
    value: 'code',
    text: 'text',
    placeholder: 'Select a code',
    disabled: false,
    readonly: false,
  },
  argTypes: {
    name: popupSelectArgTypes.name,
    text: popupSelectArgTypes.text,
    value: popupSelectArgTypes.value,
    placeholder: popupSelectArgTypes.placeholder,
    disabled: popupSelectArgTypes.disabled,
    readonly: popupSelectArgTypes.readonly,
  },
  parameters: {
    actions: {
      handles: ['text-change', 'data-change', 'button-click'],
    },
  },
  decorators: [withActions],
};
