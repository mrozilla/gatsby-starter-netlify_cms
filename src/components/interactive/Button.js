// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';

import { Text } from '~components/primitives/Text';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Button = styled(Text)`
  -webkit-appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  text-decoration: none !important; /* reset link buttons styling */

  cursor: pointer;
  line-height: 1em;
  letter-spacing: 0.05em;
  transition: all 250ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    transform: translateY(-1px);
  }
  &:not(:disabled):active {
    transform: translateY(1px);
  }

  ${({ look }) => {
    if (look === 'primary') {
      return css`
        background-image: linear-gradient(
          45deg,
          var(--color-brand-primary),
          var(--color-brand-secondary)
        );
        color: var(--color-inverse) !important;

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          box-shadow: 0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }
      `;
    }

    if (look === 'primary-inverse') {
      return css`
        background-color: var(--color-inverse);
        color: var(--color-brand-primary);
      `;
    }

    if (look === 'secondary') {
      return css`
        box-shadow: inset 0 0 0 2px var(--color-brand-primary);
        color: var(--color-brand-primary);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          background-image: linear-gradient(
            45deg,
            var(--color-brand-primary),
            var(--color-brand-secondary)
          );
          color: var(--color-inverse);
          box-shadow: 0 0.5rem 0.5rem hsla(var(--hsl-text), 0.1);
        }
      `;
    }

    if (look === 'secondary-inverse') {
      return css`
        box-shadow: inset 0 0 0 2px var(--color-inverse);
        color: var(--color-inverse);

        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-inverse);
        }
      `;
    }

    if (look === 'tertiary') {
      return css`
        &:not(:disabled):hover,
        &:not(:disabled):focus {
          color: var(--color-brand-primary);
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

Button.defaultProps = {
  as:           'button',
  display:      'inline-block',
  fontWeight:   '700',
  padding:      '1.5rem 4rem',
  borderRadius: '0.5rem',
  textAlign:    'center',
};
