import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { action } from '@storybook/addon-actions';
import { Dropdown } from '../../components/dropdown.ts';

import '../../components/dropdown.ts';
import '../../components/dropdown-item.ts';
import '../../components/dropdown-popover.ts';
import '../../components/button.ts';

const argTypes: ArgTypes = {
  name: {
    control: 'text',
    description: '드롭다운 컴포넌트의 이름',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    description: '드롭다운 컴포넌트의 선택된 항목의 값',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  text: {
    control: 'text',
    description: '드롭다운 컴포넌트의 선택된 항목의 텍스트 _(읽기 전용)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  placeholder: {
    control: 'text',
    description: '드롭다운 컴포넌트의 플레이스홀더',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  open: {
    control: 'boolean',
    description: '드롭다운 컴포넌트의 팝오버 오픈 여부',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
      defaultValue: { summary: 'false' },
    },
  },
  readonly: {
    control: 'boolean',
    description: '드롭다운 컴포넌트의 읽기 전용 여부',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
      defaultValue: { summary: 'false' },
    },
  },
  disabled: {
    control: 'boolean',
    description: '드롭다운 컴포넌트의 비활성화 여부',
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
    description:
      '드롭다운 컴포넌트의 내부에 포함될 `<aa-dropdown-item>` 요소 HTML<br />_(`aa-dropdown-item` 요소를 제외한 다른 요소는 렌더링되지 않음)_',
    table: {
      category: 'Slots',
      type: {
        summary: 'html',
      },
      defaultValue: { summary: '' },
    },
  },
  change: {
    action: 'change',
    description: '드롭다운 컴포넌트의 선택 값 변경 이벤트',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
};

const meta: Meta<Dropdown> = {
  title: 'Components/Dropdown',
  component: 'aa-dropdown',
} satisfies Meta<Dropdown>;

export default meta;

type Story = StoryObj;

export const Usage: Story = {
  render: (args) => html`
    <aa-dropdown
      .name=${args.name}
      .placeholder=${args.placeholder}
      .value=${args.value}
      ?open=${args.open}
      ?readonly=${args.readonly}
      ?disabled=${args.disabled}
      @change=${args.change}
    >
      ${unsafeHTML(args.innerHTML)}
    </aa-dropdown>
  `,
  args: {
    name: '',
    value: '1',
    placeholder: '',
    open: false,
    readonly: false,
    disabled: false,
    innerHTML:
      '<aa-dropdown-item value="1">Item 1</aa-dropdown-item><aa-dropdown-item value="2">Item 2</aa-dropdown-item>',
    change: action('change'),
  },
  argTypes,
};

export const States: Story = {
  render: () => {
    const states = ['normal', 'readonly', 'disabled'];
    return html`
      <style>
        #dropdown-states {
          grid-template-rows: 30px auto;
          grid-template-columns: repeat(${states.length}, auto);
        }
      </style>
      <div id="dropdown-states" class="grid-table-container">
        ${states.map(
          (state) => html`
            <div class="grid-header-cell">
              <pre>${state}</pre>
            </div>
          `
        )}
        ${states.map(
          (state) => html`
            <div class="grid-cell">
              <aa-dropdown
                id="dropdown-${state}"
                ?readonly=${state === 'readonly'}
                ?disabled=${state === 'disabled'}
                value="1"
              >
                <aa-dropdown-item value="1">Item 1</aa-dropdown-item>
                <aa-dropdown-item value="2">Item 2</aa-dropdown-item>
              </aa-dropdown>
            </div>
          `
        )}
      </div>
    `;
  },
};

export const Toggle: Story = {
  render: () => {
    const toggle = () => {
      const dropdown = document.querySelector('aa-dropdown#toggle') as Dropdown;

      dropdown.toggle();
    };
    return html`
      <aa-dropdown id="toggle" placeholder="select item">
        <aa-dropdown-item value="1">Item 1</aa-dropdown-item>
        <aa-dropdown-item value="2">Item 2</aa-dropdown-item>
      </aa-dropdown>
      <aa-button @click=${toggle}>Toggle dropdown</aa-button>
    `;
  },
};

export const BindItems: Story = {
  render: () => {
    const bindItems = () => {
      const dropdown = document.querySelector('aa-dropdown#dropdown-bind') as Dropdown;

      const items = [
        { value: '1', text: 'Item 1' },
        { value: '2', text: 'Item 2' },
      ];

      dropdown.bindItems(items);
      dropdown.placeholder = 'items are bound';
    };

    return html`
      <aa-dropdown id="dropdown-bind" placeholder="please bind items"></aa-dropdown>
      <aa-button @click=${bindItems}>Bind dropdown items</aa-button>
    `;
  },
};
