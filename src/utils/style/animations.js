// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { keyframes, css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const animation = ({ from = {}, to = {}, properties = '' } = {}) => {
  const setup = keyframes`
    from {${from}}
    to   {${to}}
  `;

  return css`
    ${setup} ${properties}
  `;
};
