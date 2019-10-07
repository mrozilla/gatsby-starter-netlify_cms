// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';
import { animation } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Loader = styled.progress`
  --hsl: var(--hsl-primary);

  appearance: none;
  display: inline-block;
  &::-webkit-progress-bar {
    background: none;
  }

  width: 1em;
  height: 1em;

  border: 0.125em solid hsla(var(--hsl), 0.1);
  border-top-color: hsla(var(--hsl), 1);
  border-radius: 50%;

  animation: ${animation({
    to: {
      transform: 'rotate(360deg)',
    },
    properties: '1s infinite',
  })};
`;
