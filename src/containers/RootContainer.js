// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { node } from 'prop-types';

import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
import CookieContainer from './CookieContainer';
import { Link, Pre, Ul, P } from '~components';

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
        a:   props => <Link look="primary" {...props} />,
        ul:  props => <Ul listStyle="disc" padding="0 0 0 1em" margin="0 0 2rem" {...props} />,
        p:   props => <P margin="0 0 1rem" {...props} />,
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
