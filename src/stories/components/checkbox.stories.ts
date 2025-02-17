import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import { Checkbox } from '../../components/checkbox.ts';

import '../../components/checkbox.ts';

const argTypes: ArgTypes = {
  name: {
    control: 'text',
    description: '체크박스의 이름',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    description: '체크박스의 값',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  checked: {
    control: 'boolean',
    description: '체크박스의 체크 상태 여부',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  indeterminate: {
    control: 'boolean',
    description: '체크박스의 미확정 상태 여부<br />(체크 상태도 체크 해제 상태도 아닌 중간 상태)',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  state: {
    control: false,
    description: '체크박스의 상태',
    table: {
      category: 'Properties',
      type: {
        summary: 'unchecked | checked | indeterminate',
      },
    },
  },
  disabled: {
    control: 'boolean',
    description: '비활성화 상태',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  innerHTML: {
    control: 'text',
    description: '체크박스의 표시 텍스트 또는 HTML',
    table: {
      category: 'slot',
      type: {
        summary: 'text | html',
      },
    },
  },
  change: {
    action: 'change',
    description: '체크박스의 상태 변경 이벤트',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
};

const meta: Meta<Checkbox> = {
  title: 'Components/Checkbox',
  component: 'aa-checkbox',
} satisfies Meta<Checkbox>;

export default meta;

type Story = StoryObj;

export const Usage: Story = {
  render: (args) => {
    return html` <aa-checkbox
      .name=${args.name || null}
      .value=${args.value}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      @change=${args.change}
      >${args.innerHTML}
    </aa-checkbox>`;
  },
  args: {
    name: '',
    value: 'value',
    checked: false,
    indeterminate: false,
    disabled: false,
    innerHTML: 'Checkbox',
    change: action('change'),
  },
  argTypes,
};

export const States: Story = {
  // 활성화 비활성화 상태를 나타내는 배열을 만들어줘
  render: () => {
    const activation = ['normal', 'disabled'];
    const states = ['unchecked', 'checked', 'indeterminate'];
    return html`<style>
        #states {
          grid-template-columns: 100px repeat(${states.length}, auto);
          grid-template-rows: 30px repeat(${activation.length}, 40px);
        }
        #states div:nth-child(4n + 1) {
          border-right: 1px solid var(--grid-border-color);
        }
      </style>
      <div id="states" class="grid-table-container">
        <div class="grid-header-cell"></div>
        ${states.map((state) => {
          return html`
            <div class="grid-header-cell">
              <pre>${state}</pre>
            </div>
          `;
        })}
        ${activation.map(
          (act) => html`
            <div class="grid-header-cell">
              <pre>${act}</pre>
            </div>
            ${states.map((state) => {
              console.log(state, act);
              return html`
                <div class="grid-cell">
                  <aa-checkbox
                    ?checked=${state === 'checked'}
                    ?indeterminate=${state === 'indeterminate'}
                    ?disabled=${act === 'disabled'}
                    .value=${state}
                    >${state} ${act}</aa-checkbox
                  >
                </div>
              `;
            })}
          `
        )}
      </div>`;
  },
  argTypes: {},
};

export const Indeterminate: Story = {
  render: () => {
    return html`<aa-checkbox .indeterminate=${true}>Indeterminate</aa-checkbox>`;
  },
};
