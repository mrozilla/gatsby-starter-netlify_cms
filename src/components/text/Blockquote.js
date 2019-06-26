// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { Text } from '~components/primitives/Text';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Blockquote = styled(Text)`
  quotes: '“' '”' '‘' '’';

  &::before {
    content: open-quote;
  }
  &::after {
    content: close-quote;
  }
`;
Blockquote.defaultProps = { as: 'blockquote' };
