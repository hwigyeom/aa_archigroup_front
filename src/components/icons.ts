import { ICON_DEFAULT_COLOR } from './constants.js';
import { svg } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const toDataUri = (svg: string): string => `data:image/svg+xml;base64,${btoa(svg)}`;

const userInfo = (
  color = ICON_DEFAULT_COLOR
) => `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_26_3468)">
    <path
      d="M12 0H6C2.68629 0 0 2.68629 0 6V12C0 15.3137 2.68629 18 6 18H12C15.3137 18 18 15.3137 18 12V6C18 2.68629 15.3137 0 12 0Z"
      fill="${color}"
    />
    <path
      d="M6 0.5H12C15.0376 0.5 17.5 2.96243 17.5 6V12C17.5 15.0376 15.0376 17.5 12 17.5H6C2.96243 17.5 0.5 15.0376 0.5 12V6C0.5 2.96243 2.96243 0.5 6 0.5Z"
      stroke="#3C3C43"
      stroke-opacity="0.03"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 6C11 7.10457 10.1046 8 9 8C7.89543 8 7 7.10457 7 6C7 4.89543 7.89543 4 9 4C10.1046 4 11 4.89543 11 6ZM5 12.2608V12.9963L13 13V12.2645C13 11.3987 12.7271 10.5684 12.2415 9.95615C11.7558 9.34394 11.097 9 10.4102 9H7.58984C6.90348 9 6.24518 9.34343 5.75958 9.95485C5.27397 10.5663 5.00077 11.3956 5 12.2608Z"
      fill="white"
    />
  </g>
  <defs>
    <clipPath id="clip0_26_3468">
      <rect width="18" height="18" fill="white" />
    </clipPath>
  </defs>
</svg>`;
export function UserInfoSVG(color = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(userInfo(color))}`;
}
export function UserInfoDataUri(color = ICON_DEFAULT_COLOR) {
  return toDataUri(userInfo(color));
}

const logout = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path
      d="M10.582 10.576a.734.734 0 0 0 0 1.047c.292.29.767.29 1.06 0l3.138-3.099a.734.734 0 0 0 0-1.047l-3.138-3.1a.757.757 0 0 0-1.06 0 .734.734 0 0 0 0 1.047L12.46 7.28H6.002a.745.745 0 0 0-.75.741c0 .409.336.74.75.74h6.416z"
    />
    <path
      opacity=".6"
      d="M1.781 2.031a.75.75 0 0 0-.75.75v10.532c0 .414.336.75.75.75h6.532a.75.75 0 0 0 .75-.75v-1.847a.75.75 0 0 0-1.5 0v1.097H2.53V3.53h5.003v1.127a.75.75 0 0 0 1.5 0V2.78a.75.75 0 0 0-.75-.75z"
    />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function LogoutSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(logout(color))}`;
}
export function LogoutDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(logout(color));
}

const search = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.453 6.987c0 2.48-2.006 4.49-4.48 4.49a4.485 4.485 0 0 1-4.48-4.49c0-2.48 2.006-4.49 4.48-4.49s4.48 2.01 4.48 4.49m-1.086 4.928a5.94 5.94 0 0 1-3.394 1.06C3.674 12.974 1 10.293 1 6.986 1 3.681 3.674 1 6.973 1s5.973 2.68 5.973 5.987a5.97 5.97 0 0 1-1.465 3.928l3.3 3.307a.75.75 0 0 1 0 1.059.745.745 0 0 1-1.056 0z"
      fill="${color}"
    />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function SearchSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(search(color))}`;
}
export function SearchDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(search(color));
}

const excel = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    opacity=".6"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7 6.75A.75.75 0 0 1 7.75 6h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 7 6.75m0 3A.75.75 0 0 1 7.75 9h2.5a.75.75 0 0 1 0 1.5h-2.5A.75.75 0 0 1 7 9.75"
    fill="${color}"
  />
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.646 3.646A.5.5 0 0 1 5 3.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5v-1.002H7a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4.5V4a.5.5 0 0 1 .146-.354M3 4.998V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.002H2a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm.991 1.024H2.845l1.06 1.977-1.162 1.995h1.155l.607-1.25.612 1.25h1.141l-1.14-1.987 1.114-1.985H5.138l-.59 1.184z"
    fill="${color}"
  />
</svg>`;
export function ExcelSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(excel(color))}`;
}
export function ExcelDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(excel(color));
}

const save = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill="${color}">
    <path opacity=".6" d="M9.5 2h-4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5" />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.304 2c.362-.001.711.136.976.383l2.307 2.14a1.27 1.27 0 0 1 .413.91V12.7a1.343 1.343 0 0 1-1.375 1.3h-9.25A1.343 1.343 0 0 1 2 12.7V3.3A1.343 1.343 0 0 1 3.375 2zm-.026 1.5L12.5 5.56v6.94H11V9a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3.5H3.5v-9zm-3.778 9v-3h3v3z"
    />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function SaveSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(save(color))}`;
}
export function SaveDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(save(color));
}

const print = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path
      d="M10.5 4v3h-5V4a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5M4 7V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2m8 1.5H4a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-.5-.5"
    />
    <path opacity=".6" d="M8.75 10.2a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75" />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function PrintSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(print(color))}`;
}
export function PrintDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(print(color));
}
const add = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.22 12.5a.75.75 0 0 0 1.5 0V8.734h3.78a.75.75 0 0 0 0-1.5H8.72V3.5a.75.75 0 0 0-1.5 0v3.734H3.5a.75.75 0 1 0 0 1.5h3.72z"
      fill="${color}"
    />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function AddSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(add(color))}`;
}
export function AddDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(add(color));
}

const del = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path
      d="M6.5 3.95h3V3.5h-3zm-1.5 0V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.95h2.5a.75.75 0 0 1 0 1.5H13V12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5.45h-.5a.75.75 0 0 1 0-1.5zM5 5.5h-.5V12a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5.5z"
    />
    <path
      opacity=".6"
      d="M6.5 6.75a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75m3.75.75a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0z"
    />
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z" />
    </clipPath>
  </defs>
</svg>`;
export function DeleteSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeHTML(del(color))}`;
}
export function DeleteDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(del(color));
}
