import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { Tab } from '../../components/tab.ts';

import '../../components/tab.ts';
import '../../components/tab-item.ts';
import '../../components/button.ts';

const meta: Meta<Tab> = {
  title: 'Components/Tab',
  component: 'aa-tab',
};

export default meta;

type Story = StoryObj<Tab>;

export const Default: Story = {
  render: () => html`
    <aa-tab>
      <section slot="buttons" class="button-container">
        <aa-button icon="search">조회</aa-button>
        <aa-button icon="delete">삭제</aa-button>
      </section>
      <aa-tab-item id="tab1" caption="Tab 1">Tab 1 content</aa-tab-item>
      <aa-tab-item id="tab2" caption="Tab 2">Tab 2 content</aa-tab-item>
    </aa-tab>
  `,
  parameters: {
    docs: {
      story: {
        inline: false,
        iframeHeight: 800,
      },
    },
  },
};
