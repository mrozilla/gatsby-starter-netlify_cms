// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { View } from '~components/primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Footer = styled(View)``;
Footer.defaultProps = {
  as:              'footer',
  display:         'grid',
  backgroundColor: 'var(--color-inverse)',
  boxShadow:       'inset 0 1px hsla(var(--hsl-text), 0.1)',
};
