// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { FaPlayCircle, FaTimesCircle } from 'react-icons/fa';
import { string } from 'prop-types';

import { Button } from '~components/interactive/Button';
import { Aside } from '~components/layout/Aside';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Video({ src, ...rest }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsFullscreen(prev => !prev);
    }
  };

  return (
    <>
      <Button
        look="tertiary"
        padding="0"
        lineHeight="0"
        {...rest}
        onClick={() => setIsFullscreen(prev => !prev)}
      >
        <FaPlayCircle fontSize="10rem" color="var(--color-inverse)" />
      </Button>
      {isFullscreen && (
        <Aside
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            md: '50vw auto',
          }}
          gridGap="2rem"
          gridTemplateRows={{
            xs: 'auto 50vh',
            md: '50vh',
          }}
          alignContent="center"
          justifyContent="center"
          padding="2rem"
          backgroundColor="hsla(var(--hsl-dark),0.75)"
          zIndex="var(--z-index-modal)"
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
            alignSelf="start"
            justifySelf="end"
            padding="0"
            lineHeight="0"
            order={{
              xs: '-1',
              md: '2',
            }}
            onClick={() => setIsFullscreen(prev => !prev)}
          >
            <FaTimesCircle fontSize="4rem" color="var(--color-inverse)" />
          </Button>
        </Aside>
      )}
    </>
  );
}

Video.propTypes = {
  src: string.isRequired,
};
