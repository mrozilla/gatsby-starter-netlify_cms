// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { node } from 'prop-types';

import HeaderContainer from './HeaderContainer';
import FooterContainer from './FooterContainer';
// import CookieContainer from './CookieContainer';
import { Link, Pre } from '~components';

import { useInactiveTab } from '~utils';
import '~utils/style/index.css';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function RootContainer({ children }) {
  useInactiveTab();

  return (
    <MDXProvider components={{ a: props => <Link look="primary" {...props} />, pre: Pre }}>
      <HeaderContainer />
      {children}
      <FooterContainer />
      {/* <CookieContainer /> */}
    </MDXProvider>
  );
}

RootContainer.propTypes = {
  children: node.isRequired,
};
