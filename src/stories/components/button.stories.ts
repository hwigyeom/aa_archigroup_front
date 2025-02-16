import type { Meta, StoryObj, ArgTypes } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
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

const argTypes: ArgTypes = {
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
    description: '버튼에 표시할 아이콘 _(지원 아이콘 리스트 참조)_',
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
    description: '버튼 내부에 출력할 HTML',
    table: {
      category: 'slot',
      type: {
        summary: 'html | text',
      },
    },
  },
  click: {
    action: 'click',
    description: '버튼 클릭 이벤트',
    table: {
      category: 'Events',
      type: {
        summary: 'Event',
      },
    },
  },
};

const meta: Meta<Button> = {
  title: 'Components/Button',
  component: 'aa-button',
  parameters: {},
  argTypes,
} satisfies Meta<Button>;

export default meta;

type Story = StoryObj<Button>;

export const Usage: Story = {
  render: (args) => {
    const click = (e: Event) => {
      action('click')(e);
      alert('Button clicked');
    };
    return html`<aa-button .type=${args.type} .size=${args.size} .color=${args.color} .icon=${args.icon} ?disabled=${args.disabled} @click=${click}>${args.innerHTML}</aa-button>`;
  },
  args: {
    type: 'button',
    size: 'medium',
    color: 'generic',
    icon: 'none',
    disabled: false,
    innerHTML: 'Button',
  },
};

export const Appearance: Story = {
  render: () => {
    return html`
      <style>
        #appearance {
          grid-template-rows: 30px repeat(2, auto);
          grid-template-columns: 120px repeat(3, auto);
        }

        #appearance > div:nth-child(4n +1) {
          border-right: 1px solid var(--grid-border-color);
        }
      </style>
      <div id="appearance" class="grid-table-container">
        <div class="grid-header-cell"></div>
        <div class="grid-header-cell">
          <pre>small</pre>
        </div>
        <div class="grid-header-cell">
          <pre>medium</pre>
        </div>
        <div class="grid-header-cell">
          <pre>large</pre>
        </div>
        <div class="grid-header-cell">
          <pre>generic</pre>
        </div>
        <div class="grid-cell">
          <aa-button color="generic" size="small">Generic small</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="generic" size="medium">Generic medium</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="generic" size="large">Generic large</aa-button>
        </div>
        <div class="grid-header-cell">
          <pre>primary</pre>
        </div>
        <div class="grid-cell">
          <aa-button color="primary" size="small">Primary small</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="primary" size="medium">Primary medium</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="primary" size="large">Primary large</aa-button>
        </div>
      </div>
    `;
  },
  argTypes: {},
};

export const State: Story = {
  render: () => {
    return html`
      <style>
        #state {
          grid-template-columns: auto auto;
          grid-template-rows: 30px repeat(2, auto);;
        }
      </style>
      <div id="state" class="grid-table-container">
        <div class="grid-header-cell">
          <pre>normal</pre>
        </div>
        <div class="grid-header-cell">
          <pre>disabled</pre>
        </div>
        <div class="grid-cell">
          <aa-button>Normal</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button disabled>Disabled</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="primary">Normal</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button color="primary" disabled>Disabled</aa-button>
        </div>
      </div>
    `;
  },
  argTypes: {},
};

export const Icon: Story = {
  render: () => {
    return html`
      <style>
        #icon {
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: 30px repeat(2, auto);
        }
      </style>
      
      <div id="icon" class="grid-table-container">
        <div class="grid-header-cell">
          <pre>search</pre>
        </div>
        <div class="grid-header-cell">
          <pre>add</pre>
        </div>
        <div class="grid-header-cell">
          <pre>delete</pre>
        </div>
        <div class="grid-header-cell">
          <pre>save</pre>
        </div>
        <div class="grid-cell">
          <aa-button icon="search">Search</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="add">Add</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="delete">Delete</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="save">Save</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="search" color="primary">Search</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="add" color="primary">Add</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="delete" color="primary">Delete</aa-button>
        </div>
        <div class="grid-cell">
          <aa-button icon="save" color="primary">Save</aa-button>
        </div>
      </div>
    `;
  },
  argTypes: {},
};

export const SupportedIcons: Story = {
  render: () => {
    return html`
      <style>
        #supported-icon {
          grid-template-columns: repeat(6, 1fr);
          gap: 5px;
          padding: 12px 0;
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
          word-break: break-all;
        }
      </style>
      <div id="supported-icon" class="grid-table-container">
        ${buttonIcons.map(
          (icon) =>
            html`<article class="icon-item">
              ${getIcon('svg', icon)()}
              <pre>${icon}</pre>
            </article>`
        )}
      </div>
      <script>
        document.addEventListener('DOMContentLoaded', () => {
          const svgs = document.querySelectorAll('.icon-item > svg');

          for (const svg of svgs) {
            svg.style.width = '24px';
            svg.style.height = '24px';
          }
        });
      </script>
    `;
  },
  argTypes: {},
  parameters: {
    navigation: false,
  },
};
