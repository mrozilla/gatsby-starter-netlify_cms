// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useImperativeHandle, useEffect, forwardRef } from 'react';
import { bool, string, node } from 'prop-types';
import styled from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

export const StyledToast = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  padding: 1rem;
  z-index: var(--z-index-toast);
  visibility: hidden;

  text-align: center;
  color: var(--color-inverse);
  background: var(--color-primary);

  &[open] {
    visibility: visible;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

const Toast = forwardRef(({ isVisible, className, children }, ref) => {
  const [{ isOpen, message, css, delay }, setState] = useState({
    isOpen:  isVisible,
    message: '',
    delay:   0,
  });

  useImperativeHandle(ref, () => ({
    show: (config) => setState({ isOpen: true, ...config }),
    hide: () => setState({ isOpen: false }),
  }));

  useEffect(() => {
    const timeoutHelper = delay && setTimeout(() => setState({ isOpen: false }), delay);
    return () => clearTimeout(timeoutHelper);
  }, [isOpen, message, css]);

  useEffect(() => {
    setState({ isOpen: isVisible });
  }, [isVisible]);

  return (
    <StyledToast className={className} css={css} open={isOpen}>
      {message || children}
    </StyledToast>
  );
});

Toast.propTypes = {
  isVisible: bool,
  className: string,
  children:  node.isRequired,
};
Toast.defaultProps = {
  isVisible: false,
  className: '',
};

export default Toast;
