import type { Meta, StoryObj } from '@storybook/web-components';
import { html, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Dropdown } from '../../components/dropdown.ts';

import '../../components/dropdown.ts';
import '../../components/dropdown-item.ts';
import '../../components/dropdown-popover.ts';

const meta: Meta<Dropdown> = {
  title: 'Components/Dropdown',
  component: 'aa-dropdown',
} satisfies Meta<Dropdown>;

export default meta;

type Story = StoryObj<Dropdown>;

export const Default: Story = {
  render: (args) =>
    html`<aa-dropdown name=${args.name} placeholder=${ifDefined(args.placeholder)} value=${args.value || nothing}>
      <aa-dropdown-item value="1">Value 1</aa-dropdown-item>
      <aa-dropdown-item value="2">Value 2</aa-dropdown-item>
    </aa-dropdown>`,
  args: {
    name: 'dropdown',
    placeholder: 'select code',
    value: '1',
  },
};

export const Disabled: Story = {
  render: (args) =>
    html`<aa-dropdown
      name=${args.name}
      placeholder=${ifDefined(args.placeholder)}
      value=${args.value || nothing}
      disabled
    >
      <aa-dropdown-item value="1">Value 1</aa-dropdown-item>
      <aa-dropdown-item value="2">Value 2</aa-dropdown-item>
    </aa-dropdown>`,
  args: {
    name: 'dropdown',
    placeholder: 'select code',
    value: '1',
  },
};

export const Readonly: Story = {
  render: (args) =>
    html`<aa-dropdown
      name=${args.name}
      placeholder=${ifDefined(args.placeholder)}
      value=${args.value || nothing}
      readonly
    >
      <aa-dropdown-item value="1">Value 1</aa-dropdown-item>
      <aa-dropdown-item value="2">Value 2</aa-dropdown-item>
    </aa-dropdown>`,
  args: {
    name: 'dropdown',
    placeholder: 'select code',
    value: '1',
  },
};

export const BindItems: Story = {
  render: () => html` <aa-dropdown name="dropdown" placeholder="select cole"></aa-dropdown> `,
  play: async () => {
    const dropdown = document.querySelector('aa-dropdown') as Dropdown;
    console.log(dropdown);
    dropdown.bindItems([
      { value: '1', text: 'Value 1' },
      { value: '2', text: 'Value 2' },
    ]);
  },
};
