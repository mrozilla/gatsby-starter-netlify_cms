// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { Label } from '~components/text/Label';
import { Tooltip } from '~components/text/Tooltip';
import { Error } from '~components/text/Error';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

export const Input = styled.input`
  --shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.1);

  appearance: none;
  border: none;
  outline: none;
  resize: none;

  display: block;
  width: 100%;
  background: hsla(var(--hsl-text), 0.05);
  line-height: 1.5em;
  padding: 2rem;
  border-radius: 0.5rem;

  & ~ ${Tooltip} {
    visibility: hidden;
    opacity: 0;
    transform: translateY(1rem);
  }

  &::placeholder {
    color: inherit;
    opacity: 0.5;
  }

  &:not(:read-only):not(:disabled) {
    :hover {
      box-shadow: var(--shadow);
      ::placeholder {
        opacity: 0.75;
      }
    }
    &:focus {
      box-shadow: inset 0 0 0 2px var(--color-primary);
      ::placeholder {
        opacity: 0.75;
      }
    }
    &:hover,
    &:focus {
      & ~ svg {
        fill: var(--color-info);
      }
    }
  }

  &:not(:placeholder-shown) {
    padding: 3rem 1rem 1rem;
  }
  &:placeholder-shown ~ ${Label} {
    display: none;
  }

  & ~ ${Label} {
    position: absolute;
    top: 0;
    left: 1rem;
  }

  & ~ ${Error} {
    visibility: hidden;
    opacity: 0;
    transform: translateY(1rem);
  }

  /**
   * position svg chevron for select and search inputs
   */

  &[type='select'],
  &[type='search'] {
    & ~ svg {
      position: absolute;
      bottom: 2rem;
      right: 1rem;
      pointer-events: none;
      fill: hsla(var(--hsl-text), 0.25);
    }
  }

  /**
   * errors only shown on required inputs when blurred and with value
   * 1. show error sibling
   * 2. hide tooltip sibling (would crash into error)
   */

  &:required:not(:focus):not(:placeholder-shown) {
    &:invalid:not([type^='date']):not([type='time']):not([type='month']) {
      color: var(--color-danger);
      box-shadow: inset 0 0 0 2px var(--color-danger);

      & ~ ${Error} {
        visibility: visible; /* 1 */
        opacity: 1;
        transform: translateY(0);
      }

      & ~ ${Tooltip} {
        visibility: hidden; /* 2 */
        opacity: 0;
      }
    }
  }

  /**
   * remove autofill yellow background in webkit
   * 1. override text colour, inherit doesn't work
   * 2. transition very long, background-color doesn't work
   */

  &:-webkit-autofill {
    -webkit-text-fill-color: var(--color-text); /* 1 */
    transition: background-color 50000s ease-in-out; /* 2 */
  }

  /**
   * search input
   */

  &[type='search']::-webkit-calendar-picker-indicator {
    color: var(--color-primary);
    cursor: pointer;
  }
  &[type='search']::-webkit-search-cancel-button {
    background: var(--color-primary);
    cursor: pointer;
  }

  /**
   * temporal fields styling
   * 1. fix for temporal inputs size difference
   */

  &[type^='date'],
  &[type='month'],
  &[type='week'],
  &[type='time'] {
    font-size: 1.9rem; /* 1 */

    &::-webkit-calendar-picker-indicator {
      color: var(--color-info);
    }
    &::-webkit-datetime-edit-text {
      opacity: 0.5;
    }
  }

  /**
   * color input
   */

  &[type='color'] {
    /* &::-webkit-color-swatch-wrapper {
      border: none;
      padding: 1rem;
      height: 1rem;
    } */
    &::-webkit-color-swatch {
      /* border: none; */
      padding: 1rem;
      /* height: 1rem; */
    }
  }

  /**
   * range input
   */

  &[type='range'] {
    &::-webkit-slider-thumb {
      appearance: none;
      width: 2rem;
      height: 2rem;
      background: var(--color-inverse);
      box-shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.2);
      border-radius: 50%;
      margin: -1rem 0 0;
      cursor: pointer;
    }
    &:hover,
    &:focus,
    &:active {
      &::-webkit-slider-thumb {
        box-shadow: inset 0 0 0 2px hsla(var(--hsl-primary), 1);
      }
    }
    &::-webkit-slider-runnable-track {
      height: 0.25rem;
      background: hsla(var(--hsl-text), 0.1);
      margin: 1.5rem 0 1.25rem;
    }
  }
`;
