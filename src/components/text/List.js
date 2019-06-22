// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { View } from '~components/primitives/View';
import { Text } from '~components/primitives/Text';

// ─────────────────────────────────────────────────────────────────────────────
// ul
// ─────────────────────────────────────────────────────────────────────────────

export const Ul = styled(View)`
  list-style: ${({ listStyle = 'none' }) => listStyle};
`;
Ul.defaultProps = { as: 'ul', display: 'grid' };

// ─────────────────────────────────────────────────────────────────────────────
// li
// ─────────────────────────────────────────────────────────────────────────────

export const Li = styled(Text)``;
Li.defaultProps = { as: 'li' };
