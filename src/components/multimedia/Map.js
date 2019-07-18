// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { string } from 'prop-types';

import { View } from '../primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Map({ center, zoom }) {
  const url = 'https://www.google.com/maps/embed/v1/view';
  const src = `${url}?zoom=${zoom}&center=${center}&key=${process.env.GATSBY_GOOGLE_MAP_KEY}`;

  return (
    <View
      as="figure"
      css={`
        position: relative;

        &::before {
          content: '';
          display: block;
          padding-bottom: 100%;
        }

        & > iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}
    >
      <iframe
        title="map"
        width="600"
        height="450"
        frameBorder="0"
        style={{ border: '0' }}
        src={src}
        allowFullScreen
      />
    </View>
  );
}

Map.propTypes = {
  center: string.isRequired,
  zoom:   string,
};

Map.defaultProps = {
  zoom: '15',
};
