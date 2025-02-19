import type { ArgTypes, Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import { html } from 'lit';
import { Calendar } from '../../components/calendar.ts';

import '../../components/calendar.ts';
import '../../components/calendar-day-view.ts';
import '../../components/calendar-month-view.ts';
import '../../components/calendar-year-view.ts';

const argTypes: ArgTypes = {
  mode: {
    control: { type: 'select' },
    options: ['date', 'month', 'year'],
    description: '선택하고자 하는 날짜 형식을 결정하는 캘린더의 모드 _(attribute 로만 설정)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'date | month | year',
      },
      defaultValue: { summary: 'date' },
    },
  },
  value: {
    control: 'text',
    description: '선택된 날짜 텍스트 _(날짜 포맷 미적용)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'YYYYMMDD | YYYYMM | YYYY',
      },
    },
  },
  text: {
    control: 'text',
    description: '선택된 날짜 텍스트 _(날짜 포맷 적용, 읽기용으로 사용 권장)_',
    table: {
      category: 'Properties',
      type: {
        summary: 'YYYY-MM-DD | YYYY-MM | YYYY',
      },
    },
  },
  date: {
    control: 'date',
    description: '선택된 날짜',
    table: {
      category: 'Properties',
      type: {
        summary: 'Date',
      },
    },
  },
  selected: {
    action: 'selected',
    description: '날짜 선택 이벤트 _(캘린더에서 항목을 클릭한 경우 발생)_',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
  change: {
    action: 'change',
    description: '선택된 날짜 변경 이벤트',
    table: {
      category: 'Events',
      type: {
        summary: 'CustomEvent',
      },
    },
  },
};

const meta: Meta<Calendar> = {
  title: 'Components/Calendar',
  component: 'aa-calendar',
} satisfies Meta<Calendar>;

export default meta;

type Story = StoryObj<Calendar>;

export const Usage: StoryObj = {
  render: (args) => {
    return html`
      <div class="calendar-container">
        <aa-calendar
          .mode=${args.mode}
          .value=${args.text}
          .text=${args.text}
          .date=${args.date}
          @selected=${args.selected}
          @change=${args.change}
        ></aa-calendar>
      </div>
    `;
  },
  args: {
    mode: 'date',
    value: '',
    text: '',
    date: null,
    change: action('change'),
    selected: action('selected'),
  },
  argTypes,
};

export const CalendarModes: Story = {
  render: () => {
    const modes = ['date', 'month', 'year'];

    const changeHandler = (e: CustomEvent, mode: string) => {
      action('change')(e);
      const property = document.getElementById(`${mode}-property`);
      if (property) {
        property.querySelector('.value')!.textContent = e.detail.value;
        property.querySelector('.text')!.textContent = e.detail.text;
      }
    };

    return html`
      <style>
        #calendar-mode {
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: 30px auto auto;
        }
        #calendar-mode .calendar {
          padding-top: 30px;
          padding-bottom: 30px;
          align-items: center;
        }
        #calendar-mode .grid-cell:nth-last-child(-n + 3) {
          border-bottom: 0;
        }
        .flex-property-container {
          width: 292px;
        }
        .flex-property-container > .property-item > label {
          width: 70px;
        }
      </style>
      <div id="calendar-mode" class="grid-table-container">
        ${modes.map(
          (mode) =>
            html` <div class="grid-header-cell">
              <pre>${mode}</pre>
            </div>`
        )}
        ${modes.map(
          (mode) =>
            html` <div class="grid-cell calendar">
              <div class="calendar-container">
                <aa-calendar
                  id="${mode}"
                  mode="${mode}"
                  @change=${(e: CustomEvent) => {
                    changeHandler(e, mode);
                  }}
                ></aa-calendar>
              </div>
            </div>`
        )}
        ${modes.map(
          (mode) =>
            html` <div class="grid-cell">
              <div id="${mode}-property" class="flex-property-container">
                <div class="property-item">
                  <label><pre>value</pre></label>
                  <span class="value"></span>
                </div>
                <div class="property-item">
                  <label><pre>text</pre></label>
                  <span class="text"></span>
                </div>
              </div>
            </div>`
        )}
      </div>
    `;
  },
};
