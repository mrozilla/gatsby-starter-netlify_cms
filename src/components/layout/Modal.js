// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { string, bool, node, func } from 'prop-types';
import styled from 'styled-components';

import Button from '~components/interactive/Button';

import { animation, useEventListener } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const ModalBackground = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-modal);

  display: flex;
  align-items: center;
  justify-content: center;

  overscroll-behavior: contain;
  cursor: pointer;

  background: hsla(var(--hsl-inverse), 0.95);
`;

const ModalWrapper = styled.div`
  cursor: initial;

  min-width: 25vw;
  max-width: 450px;

  position: relative;

  border-radius: 0.5rem;
  background: var(--color-inverse);
  box-shadow: var(--border-box-shadow);
  animation: ${animation({
    from: {
      opacity:   0,
      transform: 'scale(0.99)',
    },
    to: {
      opacity:   1,
      transform: 'scale(1)',
    },
    properties: '500ms',
  })};
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Modal({
  innerKey,
  isOpen,
  outerPadding,
  innerPadding,
  innerMinWidth,
  onClose,
  children,
}) {
  useEventListener('keydown', (event) => {
    if (isOpen && event.key === 'Escape') {
      onClose();
    }
  });

  const handleClickBackground = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (isOpen) {
    return (
      <ModalBackground
        onClick={handleClickBackground}
        css={`
          padding: ${outerPadding};
        `}
      >
        <ModalWrapper
          key={innerKey}
          css={`
            padding: ${innerPadding};
            min-width: ${innerMinWidth};
          `}
        >
          {children}
          <Button
            look="tertiary"
            css={`
              position: absolute;
              top: 0;
              right: 0;
              padding: 4rem 4rem 2rem 2rem;
            `}
            onClick={onClose}
          >
            ×
          </Button>
        </ModalWrapper>
      </ModalBackground>
    );
  }
  return null;
}

Modal.propTypes = {
  innerKey:      string,
  isOpen:        bool.isRequired,
  children:      node.isRequired,
  outerPadding:  string,
  innerPadding:  string,
  innerMinWidth: string,
  onClose:       func,
};

Modal.defaultProps = {
  innerKey:      null,
  outerPadding:  '5vmin',
  innerPadding:  '4rem',
  innerMinWidth: null,
  onClose:       () => {},
};
