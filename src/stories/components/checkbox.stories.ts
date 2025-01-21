import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Checkbox } from '../../components/checkbox.ts';

import '../../components/checkbox.ts';

const checkboxArgTypes: ArgTypes = {
  name: {
    control: 'text',
    description: 'The name of the checkbox',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    description: 'The value of the checkbox',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  checked: {
    control: 'boolean',
    description: 'The checked state of the checkbox',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  disabled: {
    control: 'boolean',
    description: 'The disabled state of the checkbox',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  innerHTML: {
    control: 'text',
    description: 'The inner HTML of the checkbox',
    table: {
      category: 'slot',
      type: {
        summary: 'string',
      },
    },
  },
};

const meta: Meta<Checkbox> = {
  title: 'Components/Checkbox',
  component: 'aa-checkbox',
} satisfies Meta<Checkbox>;

export default meta;

type Story = StoryObj<Checkbox>;

export const Default: Story = {
  render: (args) => html`<aa-checkbox name=${args.name} value=${args.value}>${args.innerHTML}</aa-checkbox>`,
  args: {
    name: 'checkbox',
    value: 'value',
    innerHTML: 'Checkbox',
  },
  argTypes: {
    name: checkboxArgTypes.name,
    value: checkboxArgTypes.value,
    innerHTML: checkboxArgTypes.innerHTML,
  },
};

export const Checked: Story = {
  render: (args) =>
    html`<aa-checkbox name=${args.name} value=${args.value} ?checked=${args.checked}>${args.innerHTML}</aa-checkbox>`,
  args: {
    name: 'checkbox',
    value: 'value',
    checked: true,
    innerHTML: 'Checked checkbox',
  },
  argTypes: {
    name: checkboxArgTypes.name,
    value: checkboxArgTypes.value,
    checked: checkboxArgTypes.checked,
    innerHTML: checkboxArgTypes.innerHTML,
  },
};

export const Disabled: Story = {
  render: (args) =>
    html`<aa-checkbox name=${args.name} value=${args.value} ?disabled=${args.disabled}>${args.innerHTML}</aa-checkbox>`,
  args: {
    name: 'checkbox',
    value: 'value',
    disabled: true,
    innerHTML: 'Disabled checkbox',
  },
  argTypes: {
    name: checkboxArgTypes.name,
    value: checkboxArgTypes.value,
    disabled: checkboxArgTypes.disabled,
    innerHTML: checkboxArgTypes.innerHTML,
  },
};
