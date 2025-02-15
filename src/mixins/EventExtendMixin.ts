import { LitElement } from 'lit';
import type { Constructor } from './Constructor.js';

export const EventExtendMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  return class EventExtendMixin extends superClass {
    protected propagateEventHandler(e: Event) {
      if (e.bubbles) {
        e.stopPropagation();
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const newEvent = new e.constructor(e.type, e);
      this.dispatchEvent(newEvent);
    }
  };
};
