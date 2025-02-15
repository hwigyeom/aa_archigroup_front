import { css } from 'lit';

export const textboxSharedStyles = css`
  :host {
    box-sizing: border-box;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    font-family: var(--font-family), serif;
    font-weight: var(--font-weight-normal);
  }

  input {
    font-family: var(--font-family), serif;
    font-weight: var(--font-weight-normal);
    border: 1px solid var(--input-border-normal);
    border-radius: 4px;
    background-color: var(--input-surface-normal);
    font-size: 12px;
    margin: 0;
    padding: 0 8px;
    min-height: 24px;
    width: 100%;
  }

  input::placeholder {
    color: var(--font-placeholder);
  }

  input:hover {
    border-color: var(--input-border-hover);
  }

  input:focus {
    border-color: var(--input-border-active);
    outline: none;
  }

  input:disabled {
    border-color: var(--input-border-disable);
    background-color: var(--input-surface-disabled);
    color: var(--font-disable);
  }
`;
