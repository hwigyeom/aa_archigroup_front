import { LitElement } from 'lit';
import { Constructor } from './Constructor.js';
import { EventExtendMixin } from './EventExtendMixin.js';

export type DisallowedKeyCodes = {
  additionalDisallowedCodes?: string[];
  removeDisallowedCodes?: string[];
  additionalDisallowedCodesOnShift?: string[];
  removeDisallowedCodesOnShift?: string[];
};

export const KeyboardEventMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  return class KeyboardEventMixin extends EventExtendMixin(superClass) {
    protected allowNumericOnlyKeydownHandler(e: KeyboardEvent, disallowedKeyCodes: DisallowedKeyCodes = {}) {
      let disallowedCodes = [
        'KeyA',
        'KeyB',
        'KeyC',
        'KeyD',
        'KeyE',
        'KeyF',
        'KeyG',
        'KeyH',
        'KeyI',
        'KeyJ',
        'KeyK',
        'KeyL',
        'KeyM',
        'KeyN',
        'KeyO',
        'KeyP',
        'KeyQ',
        'KeyR',
        'KeyS',
        'KeyT',
        'KeyU',
        'KeyV',
        'KeyW',
        'KeyX',
        'KeyY',
        'KeyZ',
        'Backquote',
        'Equal',
        'BracketRight',
        'BracketLeft',
        'Backslash',
        'Semicolon',
        'Quote',
        'Slash',
        'NumpadMultiply',
        'NumpadAdd',
        'NumpadSubtract',
        'NumpadDecimal',
        'NumpadDivide',
        'NumpadEnter',
        'NumpadEqual',
        'IntlBackslash',
        'IntlYen',
        'IntlHash',
        'IntlSemicolon',
        'IntlQuotes',
        'IntlComma',
        'IntlPeriod',
        'IntlSlash',
      ];

      if (disallowedKeyCodes.additionalDisallowedCodes) {
        disallowedCodes.push(...disallowedKeyCodes.additionalDisallowedCodes);
      }
      if (disallowedKeyCodes.removeDisallowedCodes) {
        disallowedCodes = disallowedCodes.filter((code) => !disallowedKeyCodes.removeDisallowedCodes?.includes(code));
      }

      let disallowedCodesOnShift = [
        'Digit0',
        'Digit1',
        'Digit2',
        'Digit3',
        'Digit4',
        'Digit5',
        'Digit6',
        'Digit7',
        'Digit8',
        'Digit9',
        'Numpad0',
        'Numpad1',
        'Numpad2',
        'Numpad3',
        'Numpad4',
        'Numpad5',
        'Numpad6',
        'Numpad7',
        'Numpad8',
        'Numpad9',
        'Minus',
        'Period',
      ];

      if (disallowedKeyCodes.additionalDisallowedCodesOnShift) {
        disallowedCodesOnShift.push(...disallowedKeyCodes.additionalDisallowedCodesOnShift);
      }
      if (disallowedKeyCodes.removeDisallowedCodesOnShift) {
        disallowedCodesOnShift = disallowedCodesOnShift.filter(
          (code) => !disallowedKeyCodes.removeDisallowedCodesOnShift?.includes(code)
        );
      }

      if (disallowedCodes.includes(e.code) || (e.shiftKey && disallowedCodesOnShift.includes(e.code))) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  };
};
