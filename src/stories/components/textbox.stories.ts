import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Textbox } from '../../components/textbox.ts';

import '../../components/textbox.ts';

const textboxArgTypes: ArgTypes = {
  name: {
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
  align: {
    control: { type: 'select' },
    options: ['left', 'center', 'right'],
    table: {
      category: 'Porperties',
      type: {
        summary: 'left(기본값) | center | right',
      },
    },
  },
};

const meta: Meta<Textbox> = {
  title: 'Components/Textbox',
  component: 'aa-textbox',
};

export default meta;

type Story = StoryObj<Textbox>;

export const Default: Story = {
  render: (args) => html`<aa-textbox name=${args.name} value=${args.value}></aa-textbox>`,
  args: {
    name: 'textbox',
    value: 'Default textbox',
  },
  argTypes: {
    name: textboxArgTypes.name,
    value: textboxArgTypes.value,
  },
};

export const Disabled: Story = {
  render: (args) => html`<aa-textbox name=${args.name} value=${args.value} ?disabled=${args.disabled}></aa-textbox>`,
  args: {
    name: 'textbox',
    value: 'Disabled textbox',
    disabled: true,
  },
};

export const Readonly: Story = {
  render: (args) => html`<aa-textbox name=${args.name} value=${args.value} ?readonly=${args.readonly}></aa-textbox>`,
  args: {
    name: 'textbox',
    value: 'Readonly textbox',
    readonly: true,
  },
  argTypes: {
    name: textboxArgTypes.name,
    value: textboxArgTypes.value,
    readonly: textboxArgTypes.readonly,
  },
};

export const Placeholder: Story = {
  render: (args) =>
    html`<aa-textbox name=${args.name} value=${args.value} placeholder=${args.placeholder}></aa-textbox>`,
  args: {
    name: 'textbox',
    value: '',
    placeholder: 'Placeholder text',
  },
  argTypes: {
    name: textboxArgTypes.name,
    value: textboxArgTypes.value,
    placeholder: textboxArgTypes.placeholder,
  },
};

export const Align: Story = {
  render: (args) => html`<aa-textbox name=${args.name} value=${args.value} align=${args.align}></aa-textbox>`,
  args: {
    name: 'textbox',
    value: 'Text align',
    align: 'center',
  },
  argTypes: {
    name: textboxArgTypes.name,
    value: textboxArgTypes.value,
    align: textboxArgTypes.align,
  },
};

export const CustomWidth: Story = {
  render: (args) =>
    html`<aa-textbox
      name=${args.name}
      value=${args.value}
      ?disabled=${args.disabled}
      style="width: 800px;"
    ></aa-textbox>`,
  args: {
    name: 'textbox',
    value: 'Custom width textbox',
  },
};
