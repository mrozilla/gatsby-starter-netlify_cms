// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { View } from '~components/primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Footer = styled(View)`
  background-color: var(--color-inverse);
  box-shadow: inset 0 1px hsla(var(--hsl-text), 0.1);
`;
Footer.defaultProps = { as: 'footer', display: 'grid' };
