// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { string, number, arrayOf } from 'prop-types';

import { View } from '~components/primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Dots({ size, amount, orientation, gap, colors, css, ...rest }) {
  return (
    <View
      css={`
        ${css};
        display: grid;
        grid-auto-flow: ${orientation};
        grid-gap: ${gap};
      `}
      {...rest}
    >
      {Array.from({ length: amount }, (_, i) => i).map((dot, i) => (
        <View
          key={dot}
          css={`
            height: ${size};
            width: ${size};
            background: ${colors[i]};
            border-radius: 999px;
          `}
        />
      ))}
    </View>
  );
}

Dots.propTypes = {
  size:        string,
  amount:      number,
  orientation: string,
  gap:         string,
  colors:      arrayOf(string),
  css:         string,
};

Dots.defaultProps = {
  size:        '0.5rem',
  amount:      3,
  orientation: 'row',
  gap:         '0.25rem',
  colors:      [],
  css:         '',
};
