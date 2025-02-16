/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Preview } from '@storybook/web-components';

// @ts-ignore
import '../public/css/global.css';
// @ts-ignore
import '../public/css/normalize.css';
// @ts-ignore
import './storybook.global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
