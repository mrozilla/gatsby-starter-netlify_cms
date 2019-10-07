// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Badge = styled.span`
  display: inline-block;
  transform: translateY(-0.75em);
  padding: 0.25rem 0.5rem;
  margin: 0 0 0 0.5rem;
  border-radius: 0.5rem;

  background: var(--gradient-brand);
  color: var(--color-inverse);

  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
