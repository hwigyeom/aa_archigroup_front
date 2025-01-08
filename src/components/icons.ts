import { html } from 'lit';

const icons = {
  color: {
    normal: '#9ca5b1',
  },
  search: (color: string) =>
    html`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.733 6.987c0 2.48-2.006 4.49-4.48 4.49a4.485 4.485 0 0 1-4.48-4.49c0-2.48 2.006-4.49 4.48-4.49s4.48 2.01 4.48 4.49m-1.087 4.928a5.94 5.94 0 0 1-3.393 1.06c-3.3 0-5.973-2.681-5.973-5.988C1.28 3.681 3.954 1 7.253 1s5.973 2.68 5.973 5.987a5.97 5.97 0 0 1-1.465 3.928l3.3 3.307a.75.75 0 0 1 0 1.059.745.745 0 0 1-1.056 0z"
          fill="${color}"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M.28 0h16v16h-16z" /></clipPath>
      </defs>
    </svg>`,
};

export default icons;
