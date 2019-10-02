// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { bool, node } from 'prop-types';

import styled, { css } from 'styled-components';

import { Loader } from '~components/multimedia/Loader';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const StyledButton = styled.button`
  -webkit-appearance: none;
  border: none;
  outline: none;
  background: transparent;
  text-decoration: none !important; /* reset link buttons styling */

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 4rem;

  font-weight: 700;
  text-align: center;
  line-height: 2rem;
  border-radius: 0.5rem;
  cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'pointer')};

  transition: all 250ms;

  &:disabled {
    cursor: ${({ isLoading }) => (isLoading ? 'wait' : 'not-allowed')};
    opacity: 0.5;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    transform: translateY(-2px);
  }
  &:not(:disabled):active {
    transform: translateY(1px);
  }

  ${({ look }) => {
    if (look === 'primary') {
      return css`
        background: var(--gradient-brand);
        color: var(--color-inverse) !important;

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          box-shadow: 0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }

        & > ${Loader} {
          --hsl: var(--hsl-inverse);
        }
      `;
    }

    if (look === 'primary-inverse') {
      return css`
        background: var(--color-inverse);
        color: var(--color-primary);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          box-shadow: 0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }

        & > ${Loader} {
          --hsl: var(--hsl-primary);
        }
      `;
    }

    if (look === 'secondary') {
      return css`
        --color: var(--hsl-primary);

        box-shadow: inset 0 0 0 2px hsla(var(--color), 1);
        color: hsla(var(--color), 1);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          background: hsla(var(--color), 0.1);
          box-shadow: inset 0 0 0 2px hsla(var(--color), 1),
            0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }

        & > ${Loader} {
          --hsl: var(--hsl-primary);
        }
      `;
    }

    if (look === 'secondary-inverse') {
      return css`
        box-shadow: inset 0 0 0 2px var(--color-inverse);
        color: var(--color-inverse);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          background: hsla(var(--hsl-inverse), 0.1);
          color: var(--color-inverse);
        }

        & > ${Loader} {
          --hsl: var(--hsl-inverse);
        }
      `;
    }

    if (look === 'tertiary') {
      return css`
        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-primary);

          & > ${Loader} {
            --hsl: var(--hsl-primary);
          }
        }

        & > ${Loader} {
          --hsl: var(--hsl-text);
        }
      `;
    }

    if (look === 'tertiary-inverse') {
      return css`
        color: var(--color-inverse);

        & > ${Loader} {
          --hsl: var(--hsl-inverse);
        }
      `;
    }

    return null;
  }};

  ${({ grouped }) => grouped
    && css`
      &:not(:last-of-type) {
        margin: 0 0 1rem;
        @media screen and (min-width: 600px) {
          margin: 0 1rem 0 0;
        }
      }
    `};
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Button({ loading, children, ...rest }) {
  const renderLoader = () => {
    if (loading) return <Loader css="margin: 0 1rem 0 0" />;
    return null;
  };

  return (
    <StyledButton isLoading={loading} {...rest}>
      {renderLoader()}
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  loading:  bool,
  children: node.isRequired,
};
Button.defaultProps = {
  loading: false,
};
