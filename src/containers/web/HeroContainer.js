// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string } from 'prop-types';

import { Section, Video, Img, HeroHeader } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment HeroFragment on MdxFrontmatterBlocks {
    type
    backgroundImage {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    header {
      url
      body
      title
      subtitle
      mdx
      buttons {
        title
        url
        look
      }
      type
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroContainer({ backgroundImage, video, header }) {
  return (
    <Section
      css={`
        grid-column: 1 / -1;
        position: relative;
        text-align: center;
        padding: var(--block-padding);
        padding-left: var(--width-outside);
        padding-right: var(--width-outside);
        color: ${backgroundImage && 'var(--color-inverse)'};
      `}
    >
      {backgroundImage && (
        <Img
          {...backgroundImage?.childImageSharp?.fluid}
          role="presentation"
          alt=""
          css={`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: -1;
              background: var(--gradient-brand);
            }

            & > img {
              object-position: top left;
              mix-blend-mode: luminosity;
              opacity: 0.1;
            }
          `}
        />
      )}
      {video && <Video src={video} />}
      <HeroHeader header={header} />
    </Section>
  );
}

HeroContainer.propTypes = {
  header: HeroHeader.propTypes.header,
  backgroundImage: shape({
    childImageSharp: shape({
      fluid: shape({
        src: string,
      }),
    }),
  }),
  video: string,
};

HeroContainer.defaultProps = {
  header: [],
  backgroundImage: null,
  video: '',
};
