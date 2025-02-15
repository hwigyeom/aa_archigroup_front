import type { Meta, StoryObj } from '@storybook/web-components';
import { withActions } from '@storybook/addon-actions/decorator';
import { NumericTextbox } from '../../components/numeric-textbox.ts';
import { html } from 'lit';

import '../../components/numeric-textbox.ts';

const meta: Meta<NumericTextbox> = {
  title: 'Components/NumericTextbox',
  component: 'aa-numeric-textbox',
};

export default meta;

type Story = StoryObj<NumericTextbox>;

export const Default: Story = {
  render: () => html`<aa-numeric-textbox type="percent" decimals="3" value="2024.01.01"></aa-numeric-textbox>`,
  parameters: {
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions],
};

export const MultipleNumericTextbox: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div id="normal-0" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">type=normal decimals=0</label>
        <div>
          <aa-numeric-textbox type="normal" decimals="0" @change=${() => {
            const container = document.querySelector('#normal-0')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="currency-0" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">type=currency decimals=0</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="0" @change=${() => {
            const container = document.querySelector('#currency-0')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="normal-3" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">type=normal decimals=3</label>
        <div>
          <aa-numeric-textbox type="normal" decimals="3" @change=${() => {
            const container = document.querySelector('#normal-3')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="currency-3" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">type=currency decimals=3</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="3" @change=${() => {
            const container = document.querySelector('#currency-3')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="align-center" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">align=center</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="3" align="center" @change=${() => {
            const container = document.querySelector('#align-center')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="align-left" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">align=left</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="3" align="left" @change=${() => {
            const container = document.querySelector('#align-left')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="min-max" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">min=5 max=100</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="0" min="5" max="100" @change=${() => {
            const container = document.querySelector('#min-max')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
      <div id="positive-only" style="display: flex; gap: 8px; align-items: center">
        <label style="width: 200px;">positive-only</label>
        <div>
          <aa-numeric-textbox type="currency" decimals="0" positive-only @change=${() => {
            const container = document.querySelector('#positive-only')!;
            container.querySelector('.value')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.value?.toString() ?? '';
            container.querySelector('.text')!.textContent =
              (container.querySelector('aa-numeric-textbox') as NumericTextbox)?.text ?? '';
          }}></aa-numeric-textbox>
        </div>
        <div style="flex-grow: 1; display: flex; gap: 8px;">
          <label style="width: 60px;">value:</label>
          <span class="value" style="width: 300px"></span>
          <label style="width: 60px;">text:</label>
          <span class="text" style=""></span>
        </div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
    actions: {
      handles: ['change'],
    },
  },
  decorators: [withActions],
};
