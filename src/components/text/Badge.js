// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Badge = styled.span`
  display: inline-block;
  transform: translateY(-.75em);
  padding: .25rem .5rem;
  margin: 0 0 0 .5rem;
  border-radius: .5rem;

  background-image: var(--gradient-brand);
  color: var(--color-inverse);

  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: .1em;
  text-transform: uppercase;
`;
