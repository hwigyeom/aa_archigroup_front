import {
  CHECKBOX_CHECKED_BG_COLOR,
  CHECKBOX_CHECKED_CHECK_COLOR,
  CHECKBOX_NORMAL_BG_COLOR,
  CHECKBOX_NORMAL_BORDER_COLOR,
  ICON_DEFAULT_COLOR,
  RADIO_CHECKED_BG_COLOR,
  RADIO_CHECKED_BORDER_COLOR,
  RADIO_NORMAL_BG_COLOR,
  RADIO_NORMAL_BORDER_COLOR,
} from './constants.js';
import { svg, SVGTemplateResult } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export const icons = [
  'user-info',
  'logout',
  'search',
  'excel',
  'powerpoint',
  'save',
  'print',
  'add',
  'delete',
  'edit',
  'calendar',
  'clipboard',
  'rotate',
  'download',
  'copy',
  'configure',
  'clip',
  'book',
  'link',
  'new-window',
  'close',
  'caret-up',
  'caret-down',
  'caret-up=small',
  'caret-down-small',
  'chevron-up',
  'chevron-down',
  'chevron-left',
  'chevron-right',
  'chevron-up-down',
  'angles-left',
  'angles-right',
  'arrow-up',
  'arrow-down',
  'drag-dot',
  'ellipsis-vertical',
  'ellipsis-horizontal',
  'checkbox',
  'checkbox-checked',
  'radio',
  'radio-checked',
  'hamburger',
  'hamburger-collapsed',
  'message-box-icon-ok',
  'message-box-icon-error',
  'message-box-icon-info',
  'message-box-icon-question',
  'stopwatch',
  'close-outlined',
] as const;
export type Icons = (typeof icons)[number];

//#region icons

//#region user-info
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
  return svg`${unsafeSVG(userInfo(color))}`;
}
export function UserInfoDataUri(color = ICON_DEFAULT_COLOR) {
  return toDataUri(userInfo(color));
}
//#endregion user-info

//#region logout
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
  return svg`${unsafeSVG(logout(color))}`;
}
export function LogoutDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(logout(color));
}
//#endregion logout

//#region search
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
  return svg`${unsafeSVG(search(color))}`;
}
export function SearchDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(search(color));
}
//#endregion search

//#region excel
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
  return svg`${unsafeSVG(excel(color))}`;
}
export function ExcelDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(excel(color));
}
//#endregion excel

//#region powerpoint
const powerpoint = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path opacity=".6" d="M6.75 6.498a.75.75 0 0 1 .75-.75H10a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75m0 3a.75.75 0 0 1 .75-.75H10a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75"/>
    <path d="M4.646 3.646A.5.5 0 0 1 5 3.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5v-1H7a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4.5V4a.5.5 0 0 1 .146-.354M3 5V4a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm2.018 1.25H3.5v3.5h.657V8.518H4.9A1.15 1.15 0 0 0 6 7.329v-.02a1.02 1.02 0 0 0-.982-1.059m.291 1.171a.526.526 0 0 1-.505.545h-.646V6.802H4.8a.526.526 0 0 1 .505.545z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function PowerPointSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(powerpoint(color))}`;
}
export function PowerPointDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(powerpoint(color));
}
//#endregion powerpoint

//#region save
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
  return svg`${unsafeSVG(save(color))}`;
}
export function SaveDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(save(color));
}
//#endregion save

//#region print
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
  return svg`${unsafeSVG(print(color))}`;
}
export function PrintDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(print(color));
}
//#endregion print

//#region add
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
  return svg`${unsafeSVG(add(color))}`;
}
export function AddDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(add(color));
}
//#endregion add

//#region delete
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
  return svg`${unsafeSVG(del(color))}`;
}
export function DeleteDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(del(color));
}
//#endregion delete

//#region edit
const edit = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill="${color}">
    <path opacity=".6" fill-rule="evenodd" clip-rule="evenodd" d="M8.036 3.91a.75.75 0 0 0-.925 1.18l3.262 2.558a.75.75 0 0 0 .925-1.181zM9.5 12.75a.75.75 0 0 0 0 1.5h4.031a.75.75 0 1 0 0-1.5z"/>
    <path d="M9.583 1.925a2.4 2.4 0 0 1 1.46.536l.945.742a2.065 2.065 0 0 1 .492 2.972l-5.64 7.2a1.75 1.75 0 0 1-1.368.67l-2.17.03a.75.75 0 0 1-.74-.58l-.49-2.12a1.75 1.75 0 0 1 .324-1.485l5.641-7.198a1.94 1.94 0 0 1 1.546-.767m-5.698 10.64 1.572-.02a.26.26 0 0 0 .2-.1l5.641-7.2c.306-.391-.1-.762-.237-.867l-.945-.737a.9.9 0 0 0-.533-.216.44.44 0 0 0-.366.193l-5.64 7.2a.26.26 0 0 0-.048.22z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function EditSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(edit(color))}`;
}
export function EditDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(edit(color));
}
//#endregion edit

//#region calendar
const calendar = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill="${color}">
    <path d="M12.667 14H3.333A1.3 1.3 0 0 1 2 12.737v-8.21a1.3 1.3 0 0 1 1.333-1.264H4v-.947A.326.326 0 0 1 4.334 2H5a.326.326 0 0 1 .334.316v.947h5.332v-.947A.326.326 0 0 1 11 2h.666a.326.326 0 0 1 .334.316v.947h.667A1.3 1.3 0 0 1 14 4.526v8.211A1.3 1.3 0 0 1 12.667 14M3.333 6.333v6.32h9.334v-6.32z"/>
    <path opacity=".6" d="M7 8H5v2h2z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function CalendarSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(calendar(color))}`;
}
export function CalendarDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(calendar(color));
}
//#endregion calendar

//#region clipboard
const clipboard = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path d="M6 1a1 1 0 0 0-1 1H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-1a1 1 0 0 0-1-1zm-.866 2.5A1 1 0 0 0 6 4h4a1 1 0 0 0 .866-.5H12a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H4a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z"/>
    <path opacity=".6" d="M6 6a.75.75 0 0 0 0 1.5h4A.75.75 0 0 0 10 6zm0 3a.75.75 0 0 0 0 1.5h4A.75.75 0 0 0 10 9z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function ClipboardSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(clipboard(color))}`;
}
export function ClipboardDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(clipboard(color));
}
//#endregion clipboard

//#region rotate
const rotate = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.105 3.75a.75.75 0 0 0-1.5 0v.41A5.46 5.46 0 0 0 8.28 3a5.32 5.32 0 0 0-5.263 4.226.75.75 0 0 0 1.468.308A3.82 3.82 0 0 1 8.264 4.5h.003a3.97 3.97 0 0 1 2.588.985h-.98a.75.75 0 1 0 0 1.5h2.48a.75.75 0 0 0 .75-.75zm.275 5.655a.75.75 0 1 0-1.457-.356 3.826 3.826 0 0 1-3.756 2.918h-.003a3.97 3.97 0 0 1-2.583-.979h.969a.75.75 0 1 0 0-1.5H4.069a.75.75 0 0 0-.75.75v2.481a.75.75 0 1 0 1.5 0v-.415a5.47 5.47 0 0 0 3.334 1.163 5.33 5.33 0 0 0 5.227-4.062" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>
`;
export function RotateSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(rotate(color))}`;
}
export function RotateDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(rotate(color));
}
//#endregion rotate

//#region download
const download = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path d="M8.75 2.746a.75.75 0 0 0-1.5 0v5.416L5.413 6.326a.75.75 0 1 0-1.06 1.06l3.138 3.138a.75.75 0 0 0 1.06 0l3.14-3.138a.75.75 0 0 0-1.061-1.06L8.75 8.205z"/>
    <path opacity=".6" d="M2.499 9.746a.75.75 0 0 1 .75.75v1.75h9.5v-1.75a.75.75 0 0 1 1.5 0v2.5a.75.75 0 0 1-.75.75h-11a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 1 .75-.75"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function DownloadSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(download(color))}`;
}
export function DownloadDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(download(color));
}
//#endregion download

//#region copy
const copy = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path opacity=".6" d="M5 4H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1H9.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5h2zm2.75 1a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 7.75 5m.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"/>
    <path d="M13 2.5H7a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5M7 1h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function CopySVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(copy(color))}`;
}
export function CopyDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(copy(color));
}
//#endregion copy

//#region configure
const configure = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path opacity=".6" d="M8 8.707a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1m2-.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
    <path d="M13.253 12.393a1.5 1.5 0 0 1-1.785.642l-.764-.27-.057.033-.132.793a1.5 1.5 0 0 1-1.48 1.253H6.966a1.5 1.5 0 0 1-1.464-1.174l-.193-.867-.062-.036-.685.258a1.5 1.5 0 0 1-1.813-.632l-1.034-1.72a1.5 1.5 0 0 1 .31-1.912l.619-.53v-.11l-.62-.53a1.5 1.5 0 0 1-.31-1.91L2.75 3.955a1.5 1.5 0 0 1 1.786-.642l.728.257.097-.056.126-.758a1.5 1.5 0 0 1 1.48-1.253h2.069A1.5 1.5 0 0 1 10.5 2.677l.193.868.062.035.684-.257a1.5 1.5 0 0 1 1.814.632l1.035 1.724a1.5 1.5 0 0 1-.31 1.91l-.619.532v.109l.619.53a1.5 1.5 0 0 1 .31 1.912zm-1.459-3.527a3.7 3.7 0 0 0 0-1.379l1.207-1.035-1.035-1.724-1.379.518a8.6 8.6 0 0 0-1.207-.69l-.345-1.552H6.966l-.259 1.552a3.4 3.4 0 0 0-1.207.69l-1.465-.518-1.034 1.724 1.207 1.035a3.7 3.7 0 0 0 0 1.379L3.001 9.9l1.034 1.72 1.379-.517a8.6 8.6 0 0 0 1.207.689l.345 1.552h2.069l.259-1.552a5.5 5.5 0 0 0 1.207-.689l1.466.517 1.034-1.72z"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function ConfigureSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(configure(color))}`;
}
export function ConfigureDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(configure(color));
}
//#endregion configure

//#region clip
const clip = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M9.024 1h.023a3.556 3.556 0 0 1 3.447 3.65v4.753A4.93 4.93 0 0 1 7.778 14.5l-.031.002-.031-.002A4.92 4.92 0 0 1 3 9.403V3.917a.75.75 0 1 1 1.499 0v5.529a3.43 3.43 0 0 0 3.248 3.553 3.424 3.424 0 0 0 3.248-3.553V4.618A2.06 2.06 0 0 0 9.025 2.5a2.057 2.057 0 0 0-1.972 2.116v.974l.001.034v3.852a.694.694 0 1 0 1.387 0V5.603a.75.75 0 1 1 1.5 0v3.874a2.195 2.195 0 0 1-2.193 2.194 2.19 2.19 0 0 1-2.193-2.194V4.649A3.56 3.56 0 0 1 9 1z" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function ClipSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(clip(color))}`;
}
export function ClipDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(clip(color));
}
//#endregion clip

//#region book
const book = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path opacity=".6" d="M5 3h1v10H5zm3 2.75a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5z"/>
    <path d="M12 3.5H4a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V4a.5.5 0 0 0-.5-.5M4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function BookSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(book(color))}`;
}
export function BookDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(book(color));
}
//#endregion book

//#region link
const link = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.344 1.609a3.02 3.02 0 0 0-2.187.709l-.016.013-1.353 1.42-.007.007a.8.8 0 0 0 1.13 1.13l.011-.01 1.326-1.39a1.44 1.44 0 0 1 1.97.238l.024.03.03.024a1.437 1.437 0 0 1 .236 1.973l-2.79 2.792a1.44 1.44 0 0 1-1.974-.236l-.019-.022-.022-.02A.8.8 0 0 0 6.57 9.394a3.02 3.02 0 0 0 4.238.323l.012-.01 2.853-2.852.01-.012a3.02 3.02 0 0 0-.305-4.22 3.02 3.02 0 0 0-2.033-1.014m-3.96 3.96a3.02 3.02 0 0 0-2.188.709l-.012.01L2.33 9.142l-.01.012a3.02 3.02 0 0 0 .303 4.225 3.02 3.02 0 0 0 4.22.304l.007-.005 1.502-1.381.005-.006a.801.801 0 0 0-1.123-1.144L5.764 12.5a1.44 1.44 0 0 1-1.98-.231l-.025-.03-.03-.025a1.437 1.437 0 0 1-.236-1.973L6.285 7.45a1.44 1.44 0 0 1 1.974.236l.019.022.021.02a.8.8 0 0 0 1.134-1.127 3.02 3.02 0 0 0-2.05-1.032" fill="${color}"/>
</svg>`;
export function LinkSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(link(color))}`;
}
export function LinkDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(link(color));
}
//#endregion link

//#region new-window
const newWindow = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path opacity=".6" d="M2.998 5h2v1H5v2H2.498v5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5v-2h1.5v2a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2"/>
    <path d="M6.498 4v5a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V4zm6.5-3h-6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function NewWindowSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(newWindow(color))}`;
}
export function NewWindowDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(newWindow(color));
}
//#endregion new-window

//#region close
const close = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path opacity=".6" d="M8 14a6.002 6.002 0 0 1-5.885-7.17A6 6 0 0 1 14 8a6.01 6.01 0 0 1-6 6m0-4.94 1.967 1.968a.75.75 0 0 0 .533.223.76.76 0 0 0 .748-.749.75.75 0 0 0-.22-.535l-1.97-1.968 1.97-1.968a.75.75 0 0 0 .161-.82.7.7 0 0 0-.162-.24.73.73 0 0 0-.529-.221.74.74 0 0 0-.531.221L8 6.94 6.031 4.972a.755.755 0 0 0-1.047.013.753.753 0 0 0-.02 1.047L6.935 8l-1.97 1.968a.757.757 0 0 0 0 1.06.753.753 0 0 0 1.066 0z" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function CloseSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(close(color))}`;
}
export function CloseDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(close(color));
}
//#endregion close

//#region caret-up
const caretUp = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="m12.785 9.62-4.27-4.268a.727.727 0 0 0-1.027 0L3.215 9.62a.725.725 0 0 0 .514 1.239h8.545c.646 0 .97-.781.511-1.24" fill="${color}"/>
</svg>`;
export function CaretUpSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(caretUp(color))}`;
}
export function CaretUpDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(caretUp(color));
}
//#endregion caret-up

//#region caret-down
const caretDown = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="m3.215 6.378 4.272 4.272a.727.727 0 0 0 1.026 0l4.272-4.272a.726.726 0 0 0-.515-1.24H3.73a.726.726 0 0 0-.515 1.24" fill="${color}"/>
</svg>`;
export function CaretDownSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(caretDown(color))}`;
}
export function CaretDownDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(caretDown(color));
}
//#endregion caret-down

//#region caret-up-small
const caretUpSmall = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.83 9.241 8.41 5.676a.57.57 0 0 0-.822 0L4.17 9.241c-.364.382-.104 1.037.412 1.037h6.837c.515-.005.775-.655.41-1.037" fill="${color}"/>
</svg>`;
export function CaretUpSmallSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(caretUpSmall(color))}`;
}
export function CaretUpSmallDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(caretUpSmall(color));
}
//#endregion caret-up-small

//#region caret-down-small
const caretDownSmall = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="m4.17 7.258 3.419 3.566a.57.57 0 0 0 .822 0l3.419-3.566c.364-.381.104-1.036-.412-1.036H4.583c-.516.005-.776.655-.412 1.036" fill="${color}"/>
</svg>`;
export function CaretDownSmallSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(caretDownSmall(color))}`;
}
export function CaretDownSmallDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(caretDownSmall(color));
}
//#endregion caret-down-small

//#region chevron-up
const chevronUp = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.53 10.53a.75.75 0 0 1-1.06 0L8 7.06l-3.47 3.47a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06" fill="${color}"/>
</svg>`;
export function ChevronUpSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(chevronUp(color))}`;
}
export function ChevronUpDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(chevronUp(color));
}
//#endregion chevron-up

//#region chevron-down
const chevronDown = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.47 6.47a.75.75 0 0 1 1.06 0L8 9.94l3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 0 1 0-1.06" fill="${color}"/>
</svg>`;
export function ChevronDownSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(chevronDown(color))}`;
}
export function ChevronDownDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(chevronDown(color));
}
//#endregion chevron-down

//#region chevron-left
const chevronLeft = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.28 3.47a.75.75 0 0 1 0 1.06L6.81 8l3.47 3.47a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0" fill="${color}"/>
</svg>`;
export function ChevronLeftSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(chevronLeft(color))}`;
}
export function ChevronLeftDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(chevronLeft(color));
}
//#endregion chevron-left

//#region chevron-right
const chevronRight = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.22 12.53a.75.75 0 0 1 0-1.06L9.69 8 6.22 4.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06 0" fill="${color}"/>
</svg>`;
export function ChevronRightSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(chevronRight(color))}`;
}
export function ChevronRightDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(chevronRight(color));
}
//#endregion chevron-right

//#region chevron-up-down
const chevronUpDown = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.123 5.994a.64.64 0 0 0 .437-.178l2.439-2.357 2.434 2.363a.637.637 0 0 0 .883 0 .59.59 0 0 0 0-.856L8.441 2.178a.637.637 0 0 0-.883 0L4.683 4.966a.59.59 0 0 0 0 .856.64.64 0 0 0 .44.172m0 4.01c.163.002.32.066.437.18L8 12.54l2.434-2.363a.64.64 0 0 1 .883 0 .59.59 0 0 1 0 .856l-2.876 2.788a.64.64 0 0 1-.883 0l-2.875-2.788a.59.59 0 0 1 0-.856.64.64 0 0 1 .44-.172" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function ChevronUpDownSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(chevronUpDown(color))}`;
}
export function ChevronUpDownDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(chevronUpDown(color));
}
//#endregion chevron-up-down

//#region angles-left
const anglesLeft = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.28 4.53a.75.75 0 0 0-1.06-1.06l-4 4a.75.75 0 0 0 0 1.06l4 4a.75.75 0 1 0 1.06-1.06L8.81 8zm-4 0a.75.75 0 0 0-1.06-1.06l-4 4a.75.75 0 0 0 0 1.06l4 4a.75.75 0 0 0 1.06-1.06L4.81 8z" fill="${color}"/>
</svg>`;
export function AnglesLeftSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(anglesLeft(color))}`;
}
export function AnglesLeftDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(anglesLeft(color));
}
//#endregion angles-left

//#region angles-right
const anglesRight = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.72 11.47a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4a.75.75 0 0 0-1.06 1.06L7.19 8zm4 0a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06l-4-4a.75.75 0 0 0-1.06 1.06L11.19 8z" fill="${color}"/>
</svg>`;
export function AnglesRightSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(anglesRight(color))}`;
}
export function AnglesRightDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(anglesRight(color));
}
//#endregion angles-right

//#region arrow-up
const arrowUp = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.56 6.753a.636.636 0 0 1-.877.006.59.59 0 0 1 0-.856l2.875-2.788a.637.637 0 0 1 .883 0l2.875 2.788a.59.59 0 0 1 0 .856.637.637 0 0 1-.883 0L8.75 5.125v6.563a.75.75 0 0 1-1.5 0V5.12z" fill="${color}"/>
</svg>`;
export function ArrowUpSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(arrowUp(color))}`;
}
export function ArrowUpDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(arrowUp(color));
}
//#endregion arrow-up

//#region arrow-down
const arrowDown = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.44 8.622a.636.636 0 0 1 .877-.006.59.59 0 0 1 0 .856L8.442 12.26a.637.637 0 0 1-.883 0L4.684 9.472a.59.59 0 0 1 0-.856.637.637 0 0 1 .883 0L7.25 10.25V3.688a.75.75 0 0 1 1.5 0v6.566z" fill="${color}"/>
</svg>`;
export function ArrowDownSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(arrowDown(color))}`;
}
export function ArrowDownDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(arrowDown(color));
}
//#endregion arrow-down

//#region drag-dots
const dragDots = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m5-9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m1 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0" fill="${color}"/>
</svg>`;
export function DragDotsSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(dragDots(color))}`;
}
export function DragDotsDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(dragDots(color));
}
//#endregion drag-dots

//#region ellipsis-vertical
const ellipsisVertical = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M6.751 12.999a1.249 1.249 0 1 1 2.498.002A1.249 1.249 0 0 1 6.75 13m0-5a1.249 1.249 0 1 1 0 .002zm0-5a1.249 1.249 0 1 1 .094.477 1.3 1.3 0 0 1-.094-.479z" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function EllipsisVerticalSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(ellipsisVertical(color))}`;
}
export function EllipsisVerticalDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(ellipsisVertical(color));
}
//#endregion ellipsis-horizontal

//#region ellipsis-horizontal
const ellipsisHorizontal = (
  color: string
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M6.751 12.999a1.249 1.249 0 1 1 2.498.002A1.249 1.249 0 0 1 6.75 13m0-5a1.249 1.249 0 1 1 0 .002zm0-5a1.249 1.249 0 1 1 .094.477 1.3 1.3 0 0 1-.094-.479z" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function EllipsisHorizontalSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(ellipsisHorizontal(color))}`;
}
export function EllipsisHorizontalDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(ellipsisHorizontal(color));
}
//#endregion ellipsis-horizontal

//#region checkbox
const checkbox = (
  borderColor: string = CHECKBOX_NORMAL_BORDER_COLOR,
  backgroundColor: string = CHECKBOX_NORMAL_BG_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" fill="${backgroundColor}"/>
  <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="${borderColor}"/>
</svg>`;
export function CheckboxSVG(
  borderColor: string = CHECKBOX_NORMAL_BORDER_COLOR,
  backgroundColor: string = CHECKBOX_NORMAL_BG_COLOR
) {
  return svg`${unsafeSVG(checkbox(borderColor, backgroundColor))}`;
}
export function CheckboxDataUri(
  borderColor: string = CHECKBOX_NORMAL_BORDER_COLOR,
  backgroundColor: string = CHECKBOX_NORMAL_BG_COLOR
) {
  return toDataUri(checkbox(borderColor, backgroundColor));
}
//#endregion checkbox

//#region checkbox-checked
const checkboxChecked = (
  borderColor: string = CHECKBOX_CHECKED_BG_COLOR,
  backgroundColor: string = CHECKBOX_CHECKED_BG_COLOR,
  checkColor: string = CHECKBOX_CHECKED_CHECK_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" fill="${backgroundColor}"/>
  <rect x="1.5" y="1.5" width="13" height="13" rx="2.5" stroke="${borderColor}"/>
  <path d="m4.5 8.08 2.707 2.42L11.5 6" stroke="${checkColor}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
export function CheckboxCheckedSVG(
  borderColor: string = CHECKBOX_CHECKED_BG_COLOR,
  backgroundColor: string = CHECKBOX_CHECKED_BG_COLOR,
  checkColor: string = CHECKBOX_CHECKED_CHECK_COLOR
) {
  return svg`${unsafeSVG(checkboxChecked(borderColor, backgroundColor, checkColor))}`;
}
export function CheckboxCheckedDataUri(
  borderColor: string = CHECKBOX_CHECKED_BG_COLOR,
  backgroundColor: string = CHECKBOX_CHECKED_BG_COLOR,
  checkColor: string = CHECKBOX_CHECKED_CHECK_COLOR
) {
  return toDataUri(checkboxChecked(borderColor, backgroundColor, checkColor));
}
//#endregion checkbox-checked

//#region radio
const radio = (
  borderColor: string = RADIO_NORMAL_BORDER_COLOR,
  backgroundColor: string = RADIO_NORMAL_BG_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="13" height="13" rx="6.5" fill="${backgroundColor}"/>
  <rect x="1.5" y="1.5" width="13" height="13" rx="6.5" stroke="${borderColor}"/>
</svg>
`;
export function RadioSVG(
  borderColor: string = RADIO_NORMAL_BORDER_COLOR,
  backgroundColor: string = RADIO_NORMAL_BG_COLOR
) {
  return svg`${unsafeSVG(radio(borderColor, backgroundColor))}`;
}
export function RadioDataUri(
  borderColor: string = RADIO_NORMAL_BORDER_COLOR,
  backgroundColor: string = RADIO_NORMAL_BG_COLOR
) {
  return toDataUri(radio(borderColor, backgroundColor));
}
//#endregion radio

//#region radio-checked
const radioChecked = (
  borderColor: string = RADIO_CHECKED_BORDER_COLOR,
  backgroundColor: string = RADIO_CHECKED_BG_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="1.5" y="1.5" width="13" height="13" rx="6.5" fill="${backgroundColor}"/>
  <rect x="1.5" y="1.5" width="13" height="13" rx="6.5" stroke="${borderColor}"/>
  <circle cx="8" cy="8" r="3" fill="${borderColor}"/>
</svg>
`;
export function RadioCheckedSVG(
  borderColor: string = RADIO_CHECKED_BORDER_COLOR,
  backgroundColor: string = RADIO_CHECKED_BG_COLOR
) {
  return svg`${unsafeSVG(radioChecked(borderColor, backgroundColor))}`;
}
export function RadioCheckedDataUri(
  borderColor: string = RADIO_CHECKED_BORDER_COLOR,
  backgroundColor: string = RADIO_CHECKED_BG_COLOR
) {
  return toDataUri(radioChecked(borderColor, backgroundColor));
}
//#endregion radio-checked

//#region hamburger
const hamburgerExpanded =
  () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm10.78 8.22a.75.75 0 0 1 0 1.06l-.72.72h2.44a.75.75 0 0 1 0 1.5h-2.44l.72.72a.75.75 0 1 1-1.06 1.06l-2-2a.75.75 0 0 1 0-1.06l2-2a.75.75 0 0 1 1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z" fill="#20293A"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function HamburgerExpandedSVG() {
  return svg`${unsafeSVG(hamburgerExpanded())}`;
}
export function HamburgerExpandedDataUri() {
  return toDataUri(hamburgerExpanded());
}
//#endregion hamburger

//#region hamburger-collapsed
const hamburgerCollapsed =
  () => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 2a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5zm9.97 8.22a.75.75 0 0 0 0 1.06l.72.72H10a.75.75 0 0 0 0 1.5h2.44l-.72.72a.75.75 0 1 0 1.06 1.06l2-2a.75.75 0 0 0 0-1.06l-2-2a.75.75 0 0 0-1.06 0M1 12.75a.75.75 0 0 1 .75-.75H6.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1-.75-.75M1.75 7a.75.75 0 0 0 0 1.5h12.5a.75.75 0 0 0 0-1.5z" fill="#20293A"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function HamburgerCollapsedSVG() {
  return svg`${unsafeSVG(hamburgerCollapsed())}`;
}
export function HamburgerCollapsedDataUri() {
  return toDataUri(hamburgerCollapsed());
}
//#endregion hamburger-collapsed

//#region message-box-icon-ok
const messageBoxIconOk = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M31 18c0 7.18-5.82 13-13 13S5 25.18 5 18 10.82 5 18 5s13 5.82 13 13" stroke="#0EBA1D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.591 14.295a1 1 0 0 1-.004 1.414l-7.04 7a1 1 0 0 1-1.41 0l-3.96-3.937a1 1 0 0 1 1.41-1.418l3.255 3.236 6.335-6.3a1 1 0 0 1 1.414.005" fill="#0EBA1D"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h36v36H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function MessageBoxIconOKSVG() {
  return svg`${unsafeSVG(messageBoxIconOk)}`;
}
export function MessageBoxIconOKDataUri() {
  return toDataUri(messageBoxIconOk);
}
//#endregion message-box-icon-ok

//#region message-box-icon-error
const messageBoxIconError = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M31 18c0 7.18-5.82 13-13 13S5 25.18 5 18 10.82 5 18 5s13 5.82 13 13" stroke="#F0491B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.546 13.131a1 1 0 0 0-1.414 1.414L16.586 18l-3.454 3.454a1 1 0 0 0 1.414 1.414L18 19.414l3.454 3.454a1 1 0 1 0 1.414-1.414L19.414 18l3.454-3.455a1 1 0 1 0-1.414-1.414L18 16.586z" fill="#F0491B"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h36v36H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function MessageBoxIconErrorSVG() {
  return svg`${unsafeSVG(messageBoxIconError)}`;
}
export function MessageBoxIconErrorDataUri() {
  return toDataUri(messageBoxIconError);
}
//#endregion message-box-icon-error

//#region message-box-icon-info
const messageBoxIconInfo = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M31 18c0 7.18-5.82 13-13 13S5 25.18 5 18 10.82 5 18 5s13 5.82 13 13" stroke="#366DD6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.94 12.551a1.317 1.317 0 1 0 1.317-1.326 1.286 1.286 0 0 0-1.317 1.326m-2.928 4.6q-.024.39 0 .78l1.149-1.4c.238-.263.513-.448.654-.4a.3.3 0 0 1 .172.373l-1.9 6.375a1.283 1.283 0 0 0 1.2 1.644c1.478 0 2.357-1.012 3.22-2.324q.036-.4.02-.8l-1.148 1.4c-.238.264-.534.448-.674.4a.3.3 0 0 1-.18-.338l1.915-6.406a1.31 1.31 0 0 0-1.188-1.648c-.958.003-2.377 1.035-3.241 2.347z" fill="#366DD6"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h36v36H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function MessageBoxIconInfoSVG() {
  return svg`${unsafeSVG(messageBoxIconInfo)}`;
}
export function MessageBoxIconInfoDataUri() {
  return toDataUri(messageBoxIconInfo);
}
//#endregion message-box-icon-info

//#region message-box-icon-question
const messageBoxIconQuestion = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path d="M31 18c0 7.18-5.82 13-13 13S5 25.18 5 18 10.82 5 18 5s13 5.82 13 13" stroke="#366DD6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.099 12.863a1.8 1.8 0 0 1 .725-.115h.087a1.81 1.81 0 0 1 1.873 1.844 2.72 2.72 0 0 1-1.046 1.872l-.015.01c-.569.456-1.093.894-1.424 1.488-.349.625-.424 1.304-.424 2.102a1 1 0 1 0 2 0c0-.702.076-.96.17-1.128.113-.201.323-.416.92-.893a4.72 4.72 0 0 0 1.817-3.351 3.81 3.81 0 0 0-3.899-3.944 3.77 3.77 0 0 0-3.913 3.96 1 1 0 1 0 1.997-.104 1.77 1.77 0 0 1 1.132-1.741m.777 9.917a1 1 0 1 0 0 2h.015a1 1 0 1 0 0-2z" fill="#366DD6"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h36v36H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function MessageBoxIconQuestionSVG() {
  return svg`${unsafeSVG(messageBoxIconQuestion)}`;
}
export function MessageBoxIconQuestionDataUri() {
  return toDataUri(messageBoxIconQuestion);
}
//#endregion message-box-icon-question

//#region message-box-icon-warning
const messageBoxIconWarning = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" stroke="#FCB504" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M31 18c0 7.18-5.82 13-13 13S5 25.18 5 18 10.82 5 18 5s13 5.82 13 13m-13-6.005v7m0 5.043h.015"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h36v36H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function MessageBoxIconWarningSVG() {
  return svg`${unsafeSVG(messageBoxIconWarning)}`;
}
export function MessageBoxIconWarningDataUri() {
  return toDataUri(messageBoxIconWarning);
}
//#endregion message-box-icon-warning

//#region stopwatch
const stopwatch = (
  color: string = ICON_DEFAULT_COLOR
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)" fill-rule="evenodd" clip-rule="evenodd" fill="${color}">
    <path d="M5.75 1.75A.75.75 0 0 1 6.5 1h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75M8 5.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 5.5"/>
    <path opacity=".6" d="M12.5 9a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0M14 9a6 6 0 1 1-2.32-4.74l.79-.79a.75.75 0 1 1 1.06 1.06l-.79.79A5.97 5.97 0 0 1 14 9"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h16v16H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function StopwatchSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(stopwatch(color))}`;
}
export function StopwatchDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(stopwatch(color));
}
//#endregion stopwatch

//#region close-outlined
const closeOutlined = (
  color: string
) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#a)">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.707 6.293a1 1 0 0 0-1.414 1.414L10.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414L12 13.414l4.293 4.293a1 1 0 0 0 1.414-1.414L13.414 12l4.293-4.293a1 1 0 0 0-1.414-1.414L12 10.586z" fill="${color}"/>
  </g>
  <defs>
    <clipPath id="a">
      <path fill="#fff" d="M0 0h24v24H0z"/>
    </clipPath>
  </defs>
</svg>`;
export function CloseOutlinedSVG(color: string = ICON_DEFAULT_COLOR) {
  return svg`${unsafeSVG(closeOutlined(color))}`;
}
export function CloseOutlinedDataUri(color: string = ICON_DEFAULT_COLOR) {
  return toDataUri(closeOutlined(color));
}
//#endregion close-outlined

//#endregion icons

const toDataUri = (svg: string): string => `data:image/svg+xml;base64,${btoa(svg)}`;

export function getIcon(
  type: 'svg' | 'data-uri',
  icon: Icons
): (...colors: string[]) => SVGTemplateResult | string | undefined {
  // Icon type 별 케이스문
  switch (icon) {
    case 'user-info':
      return type === 'svg' ? UserInfoSVG : UserInfoDataUri;
    case 'logout':
      return type === 'svg' ? LogoutSVG : LogoutDataUri;
    case 'search':
      return type === 'svg' ? SearchSVG : SearchDataUri;
    case 'excel':
      return type === 'svg' ? ExcelSVG : ExcelDataUri;
    case 'powerpoint':
      return type === 'svg' ? PowerPointSVG : PowerPointDataUri;
    case 'save':
      return type === 'svg' ? SaveSVG : SaveDataUri;
    case 'print':
      return type === 'svg' ? PrintSVG : PrintDataUri;
    case 'add':
      return type === 'svg' ? AddSVG : AddDataUri;
    case 'delete':
      return type === 'svg' ? DeleteSVG : DeleteDataUri;
    case 'edit':
      return type === 'svg' ? EditSVG : EditDataUri;
    case 'calendar':
      return type === 'svg' ? CalendarSVG : CalendarDataUri;
    case 'clipboard':
      return type === 'svg' ? ClipboardSVG : ClipboardDataUri;
    case 'rotate':
      return type === 'svg' ? RotateSVG : RotateDataUri;
    case 'download':
      return type === 'svg' ? DownloadSVG : DownloadDataUri;
    case 'copy':
      return type === 'svg' ? CopySVG : CopyDataUri;
    case 'configure':
      return type === 'svg' ? ConfigureSVG : ConfigureDataUri;
    case 'clip':
      return type === 'svg' ? ClipSVG : ClipDataUri;
    case 'book':
      return type === 'svg' ? BookSVG : BookDataUri;
    case 'link':
      return type === 'svg' ? LinkSVG : LinkDataUri;
    case 'new-window':
      return type === 'svg' ? NewWindowSVG : NewWindowDataUri;
    case 'close':
      return type === 'svg' ? CloseSVG : CloseDataUri;
    case 'caret-up':
      return type === 'svg' ? CaretUpSVG : CaretUpDataUri;
    case 'caret-down':
      return type === 'svg' ? CaretDownSVG : CaretDownDataUri;
    case 'caret-up=small':
      return type === 'svg' ? CaretUpSmallSVG : CaretUpSmallDataUri;
    case 'caret-down-small':
      return type === 'svg' ? CaretDownSmallSVG : CaretDownSmallDataUri;
    case 'chevron-up':
      return type === 'svg' ? ChevronUpSVG : ChevronUpDataUri;
    case 'chevron-down':
      return type === 'svg' ? ChevronDownSVG : ChevronDownDataUri;
    case 'chevron-left':
      return type === 'svg' ? ChevronLeftSVG : ChevronLeftDataUri;
    case 'chevron-right':
      return type === 'svg' ? ChevronRightSVG : ChevronRightDataUri;
    case 'chevron-up-down':
      return type === 'svg' ? ChevronUpDownSVG : ChevronUpDownDataUri;
    case 'angles-left':
      return type === 'svg' ? AnglesLeftSVG : AnglesLeftDataUri;
    case 'angles-right':
      return type === 'svg' ? AnglesRightSVG : AnglesRightDataUri;
    case 'arrow-up':
      return type === 'svg' ? ArrowUpSVG : ArrowUpDataUri;
    case 'arrow-down':
      return type === 'svg' ? ArrowDownSVG : ArrowDownDataUri;
    case 'drag-dot':
      return type === 'svg' ? DragDotsSVG : DragDotsDataUri;
    case 'ellipsis-vertical':
      return type === 'svg' ? EllipsisVerticalSVG : EllipsisVerticalDataUri;
    case 'ellipsis-horizontal':
      return type === 'svg' ? EllipsisHorizontalSVG : EllipsisHorizontalDataUri;
    case 'checkbox':
      return type === 'svg' ? CheckboxSVG : CheckboxDataUri;
    case 'checkbox-checked':
      return type === 'svg' ? CheckboxCheckedSVG : CheckboxCheckedDataUri;
    case 'radio':
      return type === 'svg' ? RadioSVG : RadioDataUri;
    case 'radio-checked':
      return type === 'svg' ? RadioCheckedSVG : RadioCheckedDataUri;
    case 'hamburger':
      return type === 'svg' ? HamburgerExpandedSVG : HamburgerExpandedDataUri;
    case 'hamburger-collapsed':
      return type === 'svg' ? HamburgerCollapsedSVG : HamburgerCollapsedDataUri;
    case 'message-box-icon-ok':
      return type === 'svg' ? MessageBoxIconOKSVG : MessageBoxIconOKDataUri;
    case 'message-box-icon-error':
      return type === 'svg' ? MessageBoxIconErrorSVG : MessageBoxIconErrorDataUri;
    case 'message-box-icon-info':
      return type === 'svg' ? MessageBoxIconInfoSVG : MessageBoxIconInfoDataUri;
    case 'message-box-icon-question':
      return type === 'svg' ? MessageBoxIconQuestionSVG : MessageBoxIconQuestionDataUri;
    case 'stopwatch':
      return type === 'svg' ? StopwatchSVG : StopwatchDataUri;
    case 'close-outlined':
      return type === 'svg' ? CloseOutlinedSVG : CloseOutlinedDataUri;
    default:
      return () => undefined;
  }
}
