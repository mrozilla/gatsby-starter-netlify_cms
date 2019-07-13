// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { animation } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Main = styled.main`
  display: grid;
  grid-area: main;
  animation: ${animation({
    from: {
      opacity:   0,
      transform: 'scale(0.99)',
    },
    to: {
      opacity:   1,
      transform: 'scale(1)',
    },
    properties: '500ms',
  })};
  transform-origin: top center;
`;
