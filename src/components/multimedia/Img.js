// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { string, number, shape, bool } from 'prop-types';

import styled, { css } from 'styled-components';
import { View } from '~components/primitives/View';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

export const Picture = styled(View)`
  display: block;

  &::before {
    content: '';

    display: block;

    padding-bottom: ${({ ratio }) => ratio * 100}%;
  }
`;

Picture.defaultProps = {
  as:       'picture',
  overflow: 'hidden',
  position: 'relative',
};

export const StyledImg = styled(View)`
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit};
  object-position: ${({ objectPosition }) => objectPosition};

  user-drag: none;

  ${({ isZoom }) => isZoom
    && css`
      cursor: zoom-in;
      transition: transform 250ms;

      &:hover {
        transform: scale(2);
      }
    `}
`;

StyledImg.defaultProps = {
  as:        'img',
  objectFit: 'cover',
};

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Img({
  src,
  srcSet,
  srcSetWebp,
  sizes,
  base64,
  tracedSVG,
  loading,
  alt,
  ratio,
  imgProps,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handlers = {
    onError: ({ target }) => {
      const placeholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"; // use a transparent svg as a default image
      target.src = placeholder; // eslint-disable-line no-param-reassign
      target.srcSet = ''; // eslint-disable-line no-param-reassign
    },
    onMouseMove: ({ nativeEvent: e }) => {
      if (imgProps.isZoom) {
        const x = (e.offsetX / e.target.offsetWidth) * 100;
        const y = (e.offsetY / e.target.offsetHeight) * 100;
        e.target.style.transformOrigin = `${x}% ${y}%`;
      }

      if (imgProps.isTilt) {
        const x = e.offsetX / e.target.offsetWidth - 0.5;
        const y = e.offsetY / e.target.offsetHeight - 0.5;
        const transform = `perspective(500px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        e.target.parentNode.style.transform = transform;
      }
    },
    onLoad: () => setIsLoaded(true),
  };

  return (
    <Picture ratio={ratio} {...rest}>
      {(base64 || tracedSVG) && !isLoaded && (
        <StyledImg src={base64 || tracedSVG} alt={alt} {...imgProps} />
      )}
      {srcSetWebp && <source type="image/webp" srcSet={srcSetWebp} />}
      <StyledImg
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        loading={loading}
        alt={alt}
        {...imgProps}
        {...handlers}
      />
    </Picture>
  );
}

Img.propTypes = {
  src:        string,
  srcSet:     string,
  srcSetWebp: string,
  sizes:      string,
  base64:     string,
  tracedSVG:  string,
  loading:    string,
  alt:        string.isRequired,
  ratio:      number,
  imgProps:   shape({
    isZoom: bool,
  }),
};

Img.defaultProps = {
  src:        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E",
  srcSet:     '',
  srcSetWebp: '',
  sizes:      '',
  base64:     '',
  tracedSVG:  '',
  loading:    'lazy',
  ratio:      1,
  imgProps:   {
    isZoom: false,
  },
};
