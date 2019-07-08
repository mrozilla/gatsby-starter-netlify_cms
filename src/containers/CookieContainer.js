// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';

import { Toast, Link, Button } from '~components';
import { useLocalStorage } from '~utils/';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function CookieContainer() {
  const [isVisible, setIsVisible] = useLocalStorage('isShowCookies', true);

  return (
    <Toast
      isVisible={isVisible}
      css={`
        background-color: var(--color-inverse);
        animation: none;
        color: var(--color-text);
        font-size: 1.5rem;
        bottom: 0;
        top: auto;
      `}
    >
      This website uses cookies to improve the experience for you. There&apos;s even a{' '}
      <Link to="/legal/privacy/" look="primary">
        cookie policy
      </Link>
      <Button
        look="secondary"
        css={`
          margin: 1rem 0 1rem 1rem;
          padding: 1rem 2rem;
        `}
        onClick={() => setIsVisible(prev => !prev)}
      >
        Accept {/* <span role="img" aria-label="cookie">
          🍪
        </span> */}
      </Button>
    </Toast>
  );
}
