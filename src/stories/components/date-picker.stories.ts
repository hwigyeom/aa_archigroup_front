import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import { DatePicker } from '../../components/date-picker.ts';

import '../../components/date-picker.ts';
import '../../components/date-picker-popover.ts';

const argTypes: ArgTypes = {
  type: {
    control: 'select',
    options: ['date', 'month', 'year'],
    description: '날짜피커 형식',
    table: {
      category: 'Properties',
      type: {
        summary: 'date | month | year',
      },
    },
  },
  name: {
    control: 'text',
    description: '날짜피커의 이름',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  value: {
    control: 'text',
    description: '날짜피커의 값_(날짜 포맷이 적용되지 않은 날짜 문자열)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  placeholder: {
    control: 'text',
    description: '날짜피커의 플레이스홀더',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  disabled: {
    control: 'boolean',
    description: '날짜피커 비활성화 여부',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  readonly: {
    control: 'boolean',
    description: '날짜피커 읽기 전용 여부',
    table: {
      category: 'Properties',
      type: {
        summary: 'boolean',
      },
    },
  },
  text: {
    control: false,
    description: '날짜피커에 설정된 날짜 텍스트_(날짜 포맷이 적용된 날짜 문자열, 읽기 전용)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'string',
      },
    },
  },
  change: {
    action: 'change',
    description: '날짜피커 값 변경 이벤트',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
};

const meta: Meta<DatePicker> = {
  title: 'Components/DatePicker',
  component: 'aa-date-picker',
  argTypes,
};

export default meta;

type Story = StoryObj;

export const Usage: Story = {
  render: (args) => {
    return html`
      <aa-date-picker
        .name=${args.name}
        .value=${args.value}
        .placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        @change=${args.change}
      ></aa-date-picker>
    `;
  },
  args: {
    type: 'date',
    name: '',
    value: '20250228',
    placeholder: '',
    disabled: false,
    readonly: false,
    change: action('change'),
  },
  parameters: {
    docs: {},
  },
};

export const PickerTypes: Story = {
  render: () => {
    const types = ['date', 'month', 'year'];

    const changeHandler = (e: CustomEvent, type: string) => {
      const { value, text } = e.detail;

      console.log(e.detail);

      document.querySelector(`#${type}-properties span.value`)!.textContent = value;
      document.querySelector(`#${type}-properties span.text`)!.textContent = text;
    };

    return html`
      <style>
        #picker-types {
          grid-template-columns: repeat(${types.length}, 1fr);
          grid-template-rows: 30px auto auto;
        }
        #picker-types .grid-cell:nth-last-child(-n + 3) {
          border-bottom: 0;
        }
        .flex-property-container {
          width: 292px;
        }
        .flex-property-container > .property-item {
          height: 30px;
        }
        .flex-property-container > .property-item > label {
          width: 70px;
        }
        .flex-property-container > .property-item > label > pre {
          font-size: 11px;
        }
        .property-item > label,
        .property-item > span {
          height: 29px;
          align-items: center;
        }
      </style>
      <div id="picker-types" class="grid-table-container">
        ${types.map(
          (type) =>
            html`<div class="grid-header-cell">
              <pre>${type}</pre>
            </div>`
        )}
        ${types.map(
          (type) => html`
            <div class="grid-cell" style="height: 350px; align-items: start;">
              <aa-date-picker type=${type} @change=${(e: CustomEvent) => changeHandler(e, type)}></aa-date-picker>
            </div>
          `
        )}
        ${types.map(
          (type) => html`
            <div class="grid-cell">
              <div id="${type}-properties" class="flex-property-container">
                <div class="property-item">
                  <label><pre>value</pre></label>
                  <span class="value"></span>
                </div>
                <div class="property-item">
                  <label><pre>text</pre></label>
                  <span class="text"></span>
                </div>
              </div>
            </div>
          `
        )}
      </div>
    `;
  },
  parameters: {
    docs: {},
  },
  argTypes: {},
};

export const PickerStates: Story = {
  render: () => {
    const types = ['date', 'month', 'year'];
    const states = ['normal', 'readonly', 'disabled'];

    return html`
      <style>
        #picker-states {
          grid-template-columns: 100px repeat(${types.length}, 1fr);
          grid-template-rows: 30px auto auto;
        }
        #picker-states .grid-cell:nth-last-child(-n + 4) {
          border-bottom: 0;
        }
        .flex-property-container {
          width: 292px;
        }
        .flex-property-container > .property-item {
          height: 30px;
        }
        .flex-property-container > .property-item > label {
          width: 70px;
        }
        .flex-property-container > .property-item > label > pre {
          font-size: 11px;
        }
        .property-item > label,
        .property-item > span {
          height: 29px;
          align-items: center;
        }
      </style>
      <div id="picker-states" class="grid-table-container">
        <div class="grid-header-cell"></div>
        ${types.map(
          (type) =>
            html`<div class="grid-header-cell">
              <pre>${type}</pre>
            </div>`
        )}
        ${states.map((state) => {
          return html`<div class="grid-header-cell">
              <pre>${state}</pre>
            </div>
            ${types.map(
              (type) => html`
                <div class="grid-cell">
                  <aa-date-picker
                    type=${type}
                    ?disabled=${state === 'disabled'}
                    ?readonly=${state === 'readonly'}
                  ></aa-date-picker>
                </div>
              `
            )}`;
        })}
      </div>
    `;
  },
};
// export const DatePickerDefault: Story = {
//   render: (args) => html` <aa-date-picker type=${args.type}></aa-date-picker> `,
//   args: {
//     type: 'date',
//   },
//   parameters: {
//     docs: {
//       story: {
//         inline: false,
//         iframeHeight: 800,
//       },
//     },
//     actions: {
//       handles: ['change'],
//     },
//   },
//   decorators: [withActions],
// };

// export const MultipleDatePicker: Story = {
//   render: () => html`
//     <div style="display: flex; gap: 20px;">
//       <aa-date-picker
//         id="date"
//         type="date"
//         @input=${() => {
//           document.querySelector('#date-value')!.textContent =
//             (document.querySelector('#date') as DatePicker)?.value ?? '';
//         }}
//         @change=${() => {
//           document.querySelector('#date-value')!.textContent =
//             (document.querySelector('#date') as DatePicker)?.value ?? '';
//         }}
//       ></aa-date-picker>
//       <aa-date-picker
//         id="month"
//         type="month"
//         @input=${() => {
//           document.querySelector('#month-value')!.textContent =
//             (document.querySelector('#month') as DatePicker)?.value ?? '';
//         }}
//         @change=${() => {
//           document.querySelector('#month-value')!.textContent =
//             (document.querySelector('#month') as DatePicker)?.value ?? '';
//         }}
//       ></aa-date-picker>
//       <aa-date-picker
//         id="year"
//         type="year"
//         @input=${() => {
//           document.querySelector('#year-value')!.textContent =
//             (document.querySelector('#year') as DatePicker)?.value ?? '';
//         }}
//         @change=${() => {
//           document.querySelector('#year-value')!.textContent =
//             (document.querySelector('#year') as DatePicker)?.value ?? '';
//         }}
//       ></aa-date-picker>
//     </div>
//     <div style="display: flex; gap: 10px; flex-direction: column; margin-top: 30px">
//       <div><label>date - value: </label><span id="date-value"></span></div>
//       <div><label>month - value: </label><span id="month-value"></span></div>
//       <div><label>year - value: </label><span id="year-value"></span></div>
//     </div>
//   `,
//   parameters: {
//     docs: {
//       story: {
//         inline: false,
//         iframeHeight: 800,
//       },
//     },
//     actions: {
//       handles: ['change'],
//     },
//   },
//   decorators: [withActions],
// };
//
// export const CustomWidth: Story = {
//   render: () => html` <aa-date-picker style="width: 300px;"></aa-date-picker> `,
//   parameters: {
//     docs: {
//       story: {
//         inline: false,
//         iframeHeight: 400,
//       },
//     },
//     actions: {
//       handles: ['change'],
//     },
//   },
//   decorators: [withActions],
// };
