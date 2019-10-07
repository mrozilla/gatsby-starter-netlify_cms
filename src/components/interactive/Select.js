// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { Label } from '~components/text/Label';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Select = styled.select`
  --shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.1);

  appearance: none;
  outline: none;
  border: none;

  display: block;
  width: 100%;
  background: hsla(var(--hsl-text), 0.05);
  line-height: 1.5em;
  cursor: pointer;
  padding: 3rem 1rem 1rem;
  border-radius: 0.5rem;

  &:hover {
    box-shadow: var(--shadow);
  }

  &:focus {
    box-shadow: inset 0 0 0 2px var(--color-primary);
  }

  &:hover,
  &:focus,
  &:active {
    & ~ svg {
      opacity: 1;
      fill: var(--color-primary);
    }
  }

  & ~ ${Label} {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 1rem;
  }

  &:required:invalid {
    color: hsla(var(--hsl-text), 0.5);
    padding: 2rem;

    &:hover {
      color: hsla(var(--hsl-text), 0.75);
    }

    & ~ ${Label} {
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }
  }
`;
