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
    justify-content: space-between;
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

  ${({ padding }) => `padding: ${padding}`};

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
          box-shadow: inset 0 -2px var(--color-brand-primary);
        `}

      & > ${Nav.List} {
        visibility: visible;

        background-color: var(--color-inverse);
        box-shadow: 0 0.5rem 1rem hsla(var(--hsl-text), 0.1);
      }
    }
  }
`;

Nav.Toggle = styled.input`
  appearance: none;
  outline: none;

  position: absolute;
  top: ${({ top = 0 }) => top};
  right: ${({ right = 0 }) => right};
  padding: 2rem;

  cursor: pointer;
  font-size: 2rem;
  line-height: 1;
  color: var(--color-brand-primary);

  &:checked {
    transform: rotate(90deg);
    opacity: 0.25;

    & ~ ${Nav.List} {
      visibility: visible;
      height: auto;

      padding: 0 0 2rem 2rem;
    }
  }

  &::after {
    content: '☰';
  }

  @media screen and (min-width: 900px) {
    display: none;
  }
`;
Nav.Toggle.defaultProps = {
  type: 'checkbox',
};
