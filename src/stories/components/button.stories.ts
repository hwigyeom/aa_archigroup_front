import type { Meta, StoryObj, ArgTypes } from '@storybook/web-components';
import { html } from 'lit';
import { Button } from '../../components/button.ts';
import { getIcon, Icons, icons } from '../../components/icons.ts';

import '../../components/button.ts';

const excludedIcons: Icons[] = [
  'user-info',
  'hamburger',
  'hamburger-collapsed',
  'message-box-icon-error',
  'message-box-icon-ok',
  'message-box-icon-question',
  'message-box-icon-info',
  'checkbox',
  'checkbox-checked',
  'radio',
  'radio-checked',
];
const buttonIcons = icons.filter((icon) => !excludedIcons.includes(icon));

const buttonArgTypes: ArgTypes = {
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
  color: {
    control: { type: 'select' },
    options: ['generic', 'primary'],
    description: '버튼의 색상',
    table: {
      category: 'Properties',
      type: {
        summary: 'generic | primary',
      },
      defaultValue: { summary: 'generic' },
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
  icon: {
    control: { type: 'select' },
    options: ['none', ...buttonIcons],
    description: '버튼에 표시할 아이콘',
    table: {
      category: 'Properties',
      type: {
        summary: buttonIcons.join(' | ') + ' | none',
      },
      defaultValue: { summary: 'none' },
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
};

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: 'aa-button',
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<Button>;

export const Default: Story = {
  args: { innerHTML: 'Button' },
  argTypes: {
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const Primary: Story = {
  render: (args) => html`<aa-button color=${args.color}>${args.innerHTML}</aa-button>`,
  args: { color: 'primary', innerHTML: 'Primary button' },
  argTypes: {
    color: buttonArgTypes.color,
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const Large: Story = {
  render: (args) => html`<aa-button size=${args.size}>${args.innerHTML}</aa-button>`,
  args: { size: 'large', innerHTML: 'Large button' },
  argTypes: {
    size: buttonArgTypes.size,
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const Small: Story = {
  render: (args) => html`<aa-button size=${args.size}>${args.innerHTML}</aa-button>`,
  args: { size: 'small', innerHTML: 'Small button' },
  argTypes: {
    size: buttonArgTypes.size,
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const Disabled: Story = {
  render: (args) => html`<aa-button ?disabled=${args.disabled}>${args.innerHTML}</aa-button>`,
  args: { disabled: true, innerHTML: 'Disabled button' },
  argTypes: {
    disabled: buttonArgTypes.disabled,
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const WithIcon: Story = {
  render: (args) => html`<aa-button icon="${args.icon}" color="${args.color}">${args.innerHTML}</aa-button>`,
  args: { icon: 'search', color: 'generic', innerHTML: 'Button with icon' },
  argTypes: {
    icon: buttonArgTypes.icon,
    color: buttonArgTypes.color,
    innerHTML: buttonArgTypes.innerHTML,
  },
};

export const ButtonIcons: Story = {
  render: () => {
    return html`
      <style>
        .icon-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 16px;
        }
        .icon-item {
          display: flex;
          flex-direction: column;
          width: 140px;
          height: 90px;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .icon-item pre {
          color: #666;
          word-break: break-all;
        }
        .icon-item svg {
          width: 64px;
        }
      </style>
      <div class="icon-container">
        ${buttonIcons.map(
          (icon) =>
            html`<article class="icon-item">
              ${getIcon('svg', icon)()}
              <pre>${icon}</pre>
            </article>`
        )}
      </div>
      <script>
        const svgs = document.querySelectorAll('.icon-item > svg');

        for (const svg of svgs) {
          svg.style.width = '32px';
          svg.style.height = '32px';
        }
      </script>
    `;
  },
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
};
