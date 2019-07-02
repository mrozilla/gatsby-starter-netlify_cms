// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import styled from 'styled-components';

import { mediaQuerise } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const View = styled.div(
  ({
    display,
    position,
    gridArea,
    gridTemplate,
    gridTemplateColumns,
    gridTemplateRows,
    gridAutoFlow,
    gridAutoRows,
    gridAutoColumns,
    gridColumn,
    gridRow,
    gridGap,
    order,
    flex,
    flexWrap,
    flexDirection,
    alignItems,
    alignContent,
    justifyContent,
    alignSelf,
    justifySelf,
    textAlign,
    margin,
    padding,
    top,
    right,
    bottom,
    left,
    height,
    width,
    minWidth,
    minHeight,
    maxWidth,
    zIndex,
    boxShadow,
    outline,
    borderRadius,
    backgroundColor,
    backgroundImage,
    backgroundPosition,
    backgroundRepeat,
    opacity,
    overflow,
    cursor,
    pointerEvents,
    mixBlendMode,
    transition,
    hover,
    focus,
    before,
    after,
    even,
  }) => ({
    ...mediaQuerise({
      display,
      position,
      gridArea,
      gridTemplate,
      gridTemplateColumns,
      gridTemplateRows,
      gridAutoFlow,
      gridAutoRows,
      gridAutoColumns,
      gridColumn,
      gridRow,
      gridGap,
      order,
      flex,
      flexWrap,
      flexDirection,
      alignItems,
      alignContent,
      justifyContent,
      alignSelf,
      justifySelf,
      textAlign,
      margin,
      padding,
      top,
      right,
      bottom,
      left,
      height,
      width,
      minWidth,
      minHeight,
      maxWidth,
      zIndex,
      boxShadow,
      outline,
      borderRadius,
      backgroundColor,
      backgroundImage,
      backgroundPosition,
      backgroundRepeat,
      opacity,
      overflow,
      cursor,
      pointerEvents,
      mixBlendMode,
      transition,
      '&:nth-of-type(even)': {
        ...even,
      },
    }),
    '&:hover': {
      ...hover,
    },
    '&:focus': {
      ...focus,
    },
    '&::before': {
      ...before,
    },
    '&::after': {
      ...after,
    },
  }),
);
