// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const Nav = styled.nav`
  position: relative;
  display: grid;

  @media screen and (min-width: 900px) {
    grid-auto-flow: column;
    grid-auto-columns: 1fr;
  }
`;

Nav.List = styled.ul`
  list-style: none;

  visibility: hidden;
  height: 0;

  display: grid;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (min-width: 900px) {
    visibility: visible;
    height: auto;

    overflow: unset;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
  }
`;

Nav.List.Item = styled.li`
  position: relative;

  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;

  & > ${Nav.List} {
    padding: 0 0 0 var(--width-outside);
  }

  @media screen and (min-width: 900px) {
    display: flex;
    align-items: center;

    & > ${Nav.List} {
      visibility: hidden;

      position: absolute;
      top: 100%;
      right: 0;
      grid-auto-flow: row;
    }

    &:hover,
    &:focus-within {
      ${({ isUnderline }) => isUnderline
        && css`
          box-shadow: inset 0 -2px var(--color-primary);
        `}

      & > ${Nav.List} {
        visibility: visible;
        padding: 0;

        background: var(--color-inverse);
        box-shadow: 0 0.5rem 1rem hsla(var(--hsl-text), 0.1);

        & > ${Nav.List.Item}:hover {
          background: hsla(var(--hsl-primary), 0.025);
          color: var(--color-primary);
        }
      }
    }
  }
`;

Nav.Toggle = styled.input`
  appearance: none;
  outline: none;

  position: absolute;

  cursor: pointer;
  font-size: 2rem;
  line-height: 1;
  color: var(--color-primary);

  &::after {
    content: '☰';
    display: block;
  }

  &:checked {
    & ~ ${Nav.List} {
      visibility: visible;
      height: auto;
    }

    &::after {
      transform: rotate(90deg);
      opacity: 0.25;
    }
  }

  @media screen and (min-width: 900px) {
    display: none;
  }
`;
Nav.Toggle.defaultProps = {
  type: 'checkbox',
};
