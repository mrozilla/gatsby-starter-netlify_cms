// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { Text } from '~components/primitives/Text';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  --shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.1);

  appearance: none;
  outline: none;
  border: none;

  position: relative;
  margin: 0 1rem 0 0;

  cursor: pointer;
  font-size: 2rem;
  width: 1em;
  height: 1em;
  background: hsla(var(--hsl-text), 0.05);
  box-shadow: var(--shadow);
  border-radius: 0.25em;

  & ~ ${Text} {
    cursor: pointer;
    font-size: 2rem;
    text-transform: initial;
    color: hsla(var(--hsl-text), 0.5);
  }

  &:not(:disabled) {
    &:hover,
    &:focus {
      background: hsla(var(--hsl-primary), 0.05);
      box-shadow: inset 0 0 0 2px var(--color-primary);

      & ~ ${Text} {
        color: var(--color-text);
      }
    }

    &:checked {
      background: var(--color-primary);

      &::after {
        content: '';
        display: block;
        width: 0.3em;
        height: 0.55em;
        border: solid var(--color-inverse);
        border-width: 0 0.125em 0.125em 0;
        transform: translate(0.35em, 0.15em) rotate(45deg);
      }

      & ~ ${Text} {
        color: var(--color-text);
      }

      &:focus ~ ${Text} {
        color: var(--color-primary);
      }
    }
  }
`;
