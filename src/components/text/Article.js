// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { View } from '~components/primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Article = styled(View)`
  min-width: 0;
  font-size: 2.5rem;
  line-height: 4rem;

  & h1 {
    font-size: 10rem;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.025em;
  }
  & h2 {
    font-size: 4rem;
    font-weight: 600;
    line-height: 1;
    margin: 8rem 0 1rem 0;
  }
  & h3 {
    font-size: 3rem;
    font-weight: 600;
  }
  & h4 {
    font-size: 2.75rem;
    font-weight: 600;
  }
  & p {
    margin-bottom: 3rem;
    max-width: 50ch;
  }
  & ul,
  & ol {
    margin-bottom: 3rem;
    padding-left: 1em;
    list-style: disc;
    max-width: 50ch;
    & p {
      margin: 0;
    }
    & ol {
      list-style-type: lower-alpha;
      & ol {
        list-style-type: lower-roman;
      }
    }
  }
  & li {
    margin-bottom: 1rem;
  }
  & blockquote {
    font-family: Georgia;
    font-size: 3rem;
    font-style: italic;
    padding: 0 6rem;
  }
  & pre {
    font-size: 1.75rem;
    border-radius: 1rem;
    margin: 0 -2rem 3rem !important;
  }
  & code {
    font-size: 1.75rem;
  }
`;
