// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { string, number, shape, bool } from 'prop-types';

import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

export const Picture = styled.picture`
  display: block;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';

    display: block;
    padding-bottom: ${({ ratio }) => `calc(${ratio ** -1} * 100%)`};
  }
`;

export const StyledImg = styled.img`
  user-drag: none;

  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  ${({ isZoom }) => isZoom
    && css`
      cursor: zoom-in;
      transition: transform 250ms;

      &:hover {
        transform: scale(2);
      }
    `}
`;

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
    onMouseMove: (event) => {
      if (imgProps.isZoom) {
        const x = (event.offsetX / event.target.offsetWidth) * 100;
        const y = (event.offsetY / event.target.offsetHeight) * 100;
        event.target.style.transformOrigin = `${x}% ${y}%`; // eslint-disable-line no-param-reassign
      }

      if (imgProps.isTilt) {
        const x = event.offsetX / event.target.offsetWidth - 0.5;
        const y = event.offsetY / event.target.offsetHeight - 0.5;
        const transform = `perspective(500px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        event.target.parentNode.style.transform = transform; // eslint-disable-line no-param-reassign
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
