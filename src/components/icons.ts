/* eslint-disable @typescript-eslint/ban-ts-comment */
import { html } from 'lit';

// @ts-ignore
const icons = {
  color: {
    normal: '#9ca5b1',
    inverse: '#fff',
  },
  search: (color: string = icons.color.normal) =>
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
  excel: (color: string = icons.color.normal) =>
    html`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.6"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.71875 6.75C7.71875 6.33579 8.05454 6 8.46875 6H10.9688C11.383 6 11.7188 6.33579 11.7188 6.75C11.7188 7.16421 11.383 7.5 10.9688 7.5H8.46875C8.05454 7.5 7.71875 7.16421 7.71875 6.75ZM7.71875 9.75C7.71875 9.33579 8.05454 9 8.46875 9H10.9688C11.383 9 11.7188 9.33579 11.7188 9.75C11.7188 10.1642 11.383 10.5 10.9688 10.5H8.46875C8.05454 10.5 7.71875 10.1642 7.71875 9.75Z"
        fill="#9CA5B1"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M5.3652 3.64645C5.45896 3.55268 5.58614 3.5 5.71875 3.5H12.7188C12.8514 3.5 12.9785 3.55268 13.0723 3.64645C13.1661 3.74021 13.2188 3.86739 13.2188 4V12C13.2188 12.1326 13.1661 12.2598 13.0723 12.3536C12.9785 12.4473 12.8514 12.5 12.7188 12.5H5.71875C5.58614 12.5 5.45896 12.4473 5.3652 12.3536C5.27143 12.2598 5.21875 12.1326 5.21875 12V10.998H7.71875C8.27103 10.998 8.71875 10.5503 8.71875 9.99805V5.99805C8.71875 5.44576 8.27103 4.99805 7.71875 4.99805H5.21875V4C5.21875 3.86739 5.27143 3.74021 5.3652 3.64645ZM3.71875 4.99805V4C3.71875 3.46957 3.92946 2.96086 4.30454 2.58579C4.67961 2.21071 5.18832 2 5.71875 2H12.7188C13.2492 2 13.7579 2.21071 14.133 2.58579C14.508 2.96086 14.7188 3.46957 14.7188 4V12C14.7188 12.5304 14.508 13.0391 14.133 13.4142C13.7579 13.7893 13.2492 14 12.7188 14H5.71875C5.18832 14 4.67961 13.7893 4.30454 13.4142C3.92946 13.0391 3.71875 12.5304 3.71875 12V10.998H2.71875C2.16647 10.998 1.71875 10.5503 1.71875 9.99805V5.99805C1.71875 5.44576 2.16647 4.99805 2.71875 4.99805H3.71875ZM4.70992 6.02197H3.56424L4.62296 7.99859L3.46191 9.99385H4.61669L5.22342 8.74353L5.83622 9.99385H6.9767L5.8372 8.00709L6.95089 6.02197H5.85685L5.26749 7.20629L4.70992 6.02197Z"
        fill="${color}"
      />
    </svg>`,
  save: (color: string = icons.color.normal) =>
    html`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)" fill="${color}">
        <path opacity=".6" d="M10.219 2h-4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M11.023 2c.362-.001.711.136.976.383l2.307 2.14a1.27 1.27 0 0 1 .413.91V12.7a1.344 1.344 0 0 1-1.375 1.3h-9.25a1.343 1.343 0 0 1-1.375-1.3V3.3A1.343 1.343 0 0 1 4.094 2zm-.026 1.5 2.222 2.06v6.94h-1.5V9a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3.5h-1.5v-9zm-3.778 9v-3h3v3z"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M.719 0h16v16h-16z" /></clipPath>
      </defs>
    </svg>`,
  print: (color: string = icons.color.normal) =>
    html`<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
        <path
          d="M11.219 4v3h-5V4a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5m-6.5 3V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2m8 1.5h-8a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5"
        />
        <path opacity=".6" d="M9.469 10.2a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75" />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M.719 0h16v16h-16z" /></clipPath>
      </defs>
    </svg>`,
  add: (color: string = icons.color.normal) =>
    html`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.72 13a.75.75 0 0 0 1.5 0V9.234H13a.75.75 0 0 0 0-1.5H9.22V4a.75.75 0 0 0-1.5 0v3.734H4a.75.75 0 1 0 0 1.5h3.72z"
          fill="${color}"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M.5.5h16v16H.5z" /></clipPath>
      </defs>
    </svg>`,
  delete: (color: string = icons.color.normal) =>
    html`<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
        <path
          d="M7 4.45h3V4H7zm-1.5 0V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.95H14a.75.75 0 0 1 0 1.5h-.5v6.55a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V5.95H3a.75.75 0 0 1 0-1.5zM5.5 6H5v6.5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V6z"
        />
        <path
          opacity=".6"
          d="M7 7.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0V8A.75.75 0 0 1 7 7.25m3.75.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0z"
        />
      </g>
      <defs>
        <clipPath id="a"><path fill="#fff" d="M.5.5h16v16H.5z" /></clipPath>
      </defs>
    </svg>`,
};

export default icons;
