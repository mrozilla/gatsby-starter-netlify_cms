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
      backgroundColor="var(--color-inverse)"
      animation="none"
      color="var(--color-text)"
      fontSize="1.5rem"
      bottom={{
        xs: 'auto',
        sm: '0',
      }}
      top={{
        xs: '0',
        sm: 'auto',
      }}
      isVisible={isVisible}
    >
      This website uses cookies to improve the experience for you. There&apos;s even a <Link to="/legal/privacy/" look="primary">cookie policy</Link>
      <Button look="secondary" margin="1rem 0 1rem 1rem" padding="1rem 2rem" onClick={() => setIsVisible(prev => !prev)}>
        Accept{' '}
        {/* <span role="img" aria-label="cookie">
          🍪
        </span> */}
      </Button>
    </Toast>
  );
}
