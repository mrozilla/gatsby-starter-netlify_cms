// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Header = styled.header`
  position: fixed;
  z-index: var(--z-index-header);
  top: 0;
  width: 100%;
  max-height: 100vh;

  background-color: var(--color-inverse);
  box-shadow: inset 0 -1px hsla(var(--hsl-text), 0.1);

  padding: 0 var(--width-outside);
`;
