// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { node } from 'prop-types';

import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
import CookieContainer from './CookieContainer';
import { Link, Pre, Ul, P, H3, Ol } from '~components';

import { useInactiveTab } from '~utils';
import '~utils/style/index.css';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function RootContainer({ children }) {
  useInactiveTab();

  return (
    <MDXProvider
      components={{
        a:  props => <Link look="primary" {...props} />,
        h3: props => (
          <H3
            css={`
              font-size: 2.5rem;
              font-weight: 600;
              margin: 4rem 0 0;
            `}
            {...props}
          />
        ),
        ul: props => (
          <Ul
            css={`
              list-style: disc;
              padding: 0 0 0 1em;
              margin: 0 0 2rem;
            `}
            {...props}
          />
        ),
        ol: props => (
          <Ol
            css={`
              list-style: decimal;
              padding: 0 0 0 1em;

              & li {
                margin: 1rem 0;
              }
            `}
            {...props}
          />
        ),
        p: props => (
          <P
            css={`
              margin: 0 0 1rem;
            `}
            {...props}
          />
        ),
        pre: Pre,
      }}
    >
      <HeaderContainer />
      {children}
      <FooterContainer />
      <CookieContainer />
    </MDXProvider>
  );
}

RootContainer.propTypes = {
  children: node.isRequired,
};
