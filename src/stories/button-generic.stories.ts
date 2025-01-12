import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ButtonGeneric } from '../components/button-generic.ts';

import '../components/button-generic.js';

const meta: Meta<ButtonGeneric> = {
  title: 'Component/Button/Button Generic',
  tags: ['autodocs'],
  component: 'button-generic',
  render: (args) =>
    html`<button-generic type=${args.type} size=${args.size} ?disabled=${args.disabled}
      >${args.innerHTML}</button-generic
    >`,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: '버튼의 종류',
      table: {
        category: 'Properties',
        type: {
          summary: 'button | submit | reset',
        },
        defaultValue: { summary: 'button' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['large', 'medium', 'small'],
      description: '버튼의 크기',
      table: {
        category: 'Properties',
        type: {
          summary: 'large | medium | small',
        },
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: '버튼이 비활성화되었는지 여부',
      table: {
        category: 'Properties',
        type: {
          summary: 'boolean',
        },
        defaultValue: { summary: 'false' },
      },
    },
    innerHTML: {
      control: 'text',
      description: '버튼의 내부 HTML',
      table: {
        category: 'slot',
        type: {
          summary: 'html',
        },
      },
    },
  },
} satisfies Meta<ButtonGeneric>;

export default meta;

type Story = StoryObj<ButtonGeneric>;

export const Medium: Story = {
  name: 'Medium',
  args: {
    type: 'button',
    size: 'medium',
    disabled: false,
    innerHTML: 'Default button',
  },
};

export const Large: Story = {
  name: 'Large',
  args: {
    type: 'button',
    size: 'large',
    disabled: false,
    innerHTML: 'Large button',
  },
};

export const Small: Story = {
  name: 'Small',
  args: {
    type: 'button',
    size: 'small',
    disabled: false,
    innerHTML: 'Small button',
  },
};
