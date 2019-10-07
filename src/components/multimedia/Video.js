// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { FaPlayCircle, FaTimesCircle } from 'react-icons/fa';
import { string } from 'prop-types';

import Button from '~components/interactive/Button';
import { Aside } from '~components/layout/Aside';
import { useEventListener } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Video({ src, css, ...rest }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
    }
  });

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(prev => !prev);
    }
  };

  return (
    <>
      <Button
        css={`
          ${css};
          padding: 0;
          line-height: 0;
        `}
        look="tertiary"
        {...rest}
        onClick={() => setIsFullscreen(prev => !prev)}
      >
        <FaPlayCircle
          css={`
            font-size: 10rem;
            color: var(--color-inverse);
          `}
        />
      </Button>
      {isFullscreen && (
        <Aside
          css={`
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            padding: 1rem;
            background: hsla(var(--hsl-dark), 0.75);
            z-index: var(--z-index-modal);

            display: grid;
            align-content: center;
            justify-content: center;
            grid-template-columns: 1fr;
            grid-template-rows: auto 50vh;

            @media screen and (min-width: 900px) {
              grid-template-columns: 50vw auto;
              grid-template-rows: 50vh;
            }
          `}
          onClick={handleBackgroundClick}
        >
          <iframe
            src={src}
            title="Test"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
            style={{
              width:  '100%',
              height: '100%',
            }}
          />
          <Button
            look="tertiary"
            css={`
              align-self: start;
              justify-self: end;
              padding: 0;
              line-height: 0;
              order: -1;

              @media screen and (min-width: 900px) {
                order: 2;
              }
            `}
            onClick={() => setIsFullscreen(prev => !prev)}
          >
            <FaTimesCircle
              css={`
                font-size: 4rem;
                color: var(--color-inverse);
              `}
            />
          </Button>
        </Aside>
      )}
    </>
  );
}

Video.propTypes = {
  src: string.isRequired,
  css: string,
};

Video.defaultProps = {
  css: '',
};
