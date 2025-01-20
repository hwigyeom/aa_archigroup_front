import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { RadioGroup } from '../../components/radio-group.ts';

import '../../components/radio-group.ts';

const radioGroupArgTypes: ArgTypes = {
  name: {
    control: 'text',
    description: 'The name of the radio group',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    description: 'The value of the radio group',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  disabled: {
    control: 'boolean',
    description: 'The disabled state of the radio group',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
};

const meta: Meta<RadioGroup> = {
  title: 'Components/RadioGroup',
  component: 'aa-radio-group',
};

export default meta;

type Story = StoryObj<RadioGroup>;

export const Default: Story = {
  render: () =>
    html`<aa-radio-group name="radio-group" value="radio-item-1">
      <aa-radio value="radio-item-1">Radio 1</aa-radio>
      <aa-radio value="radio-item-2">Radio 2</aa-radio>
      <aa-radio value="radio-item-3">Radio 3</aa-radio>
    </aa-radio-group>`,
};

export const Disabled: Story = {
  render: (args) =>
    html`<aa-radio-group name="radio-group" value="radio-item-1" ?disabled=${args.disabled}>
      <aa-radio value="radio-item-1">Radio 1</aa-radio>
      <aa-radio value="radio-item-2">Radio 2</aa-radio>
      <aa-radio value="radio-item-3">Radio 3</aa-radio>
    </aa-radio-group>`,
  args: {
    disabled: true,
  },
  argTypes: {
    disabled: radioGroupArgTypes.disabled,
  },
};
