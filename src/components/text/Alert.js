// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

// prettier-ignore
export const Alert = styled.span`
  display: inline-flex;
  align-items: center;

  line-height: 3rem;
  padding: 1rem;
  box-shadow: 0 0 0 2px;
  border-radius: 0.25rem;

  ${({ look }) => look
    && css`
      background: hsla(var(--hsl-${look}), 0.05);
      color: var(--color-${look});
    `};
`;
