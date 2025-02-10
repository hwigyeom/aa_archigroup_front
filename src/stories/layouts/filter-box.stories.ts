import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { FilterBox } from '../../layouts/filter-box.ts';

import '../../layouts/filter-box.ts';
import '../../layouts/filter-item.ts';
import '../../components/textbox.ts';

const meta: Meta<FilterBox> = {
  title: 'Layoouts/FilterBox',
  component: 'aa-filter-box',
};

export default meta;

type Story = StoryObj<FilterBox>;

export const Default: Story = {
  render: (args) =>
    html` <aa-filter-box columns="${args.columns}" rows="${args.rows}">
      <aa-filter-item label="Name" row="1" column="1" required>
        <aa-textbox id="name" name="name" style="flex-grow: 2"></aa-textbox>
      </aa-filter-item>
      <aa-filter-item label="한글 입력 길이" row="1" column="2">
        <aa-textbox id="field2" name="field2" style="flex-grow: 2"></aa-textbox>
      </aa-filter-item>
      <aa-filter-item label="Age" row="2" column="1">
        <aa-textbox id="age" name="age" style="flex-grow: 2"></aa-textbox>
      </aa-filter-item>
    </aa-filter-box>`,
  args: {
    columns: 3,
    rows: 2,
  },
};
