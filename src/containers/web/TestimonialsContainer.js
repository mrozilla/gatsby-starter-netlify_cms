// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, Fragment } from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { Section, Header, BlockHeader, P, Img, Carousel, Blockquote } from '~components';
import { useEventListener } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment TestimonialsFragment on MdxFrontmatterBlocks {
    type
    header {
      icon
      tagline
      title
      subtitle
      mdx
      buttons {
        title
        url
        look
      }
      image {
        src {
          childImageSharp {
            fluid(maxWidth: 900) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ratio
        alt
      }
    }
    testimonials {
      name
      position
      company
      testimonial
      image {
        src {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ratio
        alt
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsContainer({ header, testimonials }) {
  const [visibleItems, setVisibleItems] = useState(
    document && document.body.clientWidth < 600 ? 1 : 3,
  );

  useEventListener('resize', () => {
    setVisibleItems(document.body.clientWidth < 600 ? 1 : 3);
  });

  return (
    <Section
      css={`
        grid-column: 2;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
        text-align: center;
        overflow: hidden; /* TODO: see why the carousel UL stretches parent on mobile */
      `}
    >
      {header && (
        <Header
          css={`
            & > p {
              max-width: 60ch;
              margin: 2rem auto;
            }
          `}
        >
          <BlockHeader header={header} />
        </Header>
      )}
      {testimonials && (
        <Carousel
          visibleItems={Math.min(testimonials.length, visibleItems)}
          loop={
            testimonials.length > visibleItems
              ? {
                interval: 5000,
              }
              : {}
          }
          isControls={testimonials.length > visibleItems}
          css={`
            margin: 2rem 3rem 0;

            & li {
              padding: 2rem;
            }

            @media screen and (min-width: 1200px) {
              2rem 0 0;
            }
          `}
        >
          {testimonials.map((item) => (
            <Fragment key={item.name}>
              {item?.testimonial && (
                <Blockquote
                  css={`
                    line-height: 3rem;
                    margin: 0 0 2rem;
                  `}
                >
                  {item?.testimonial}
                </Blockquote>
              )}
              {item.image && (
                <Img
                  {...item.image?.src?.childImageSharp?.fluid}
                  alt={item.name || item.image?.alt}
                  ratio={item.image?.ratio.split('/').reduce((p, c) => p / c)}
                  css={`
                    max-width: 8rem;
                    margin: 0 auto 1rem;
                    background: hsla(var(--hsl-text), 0.05);
                    border-radius: 999px;
                  `}
                />
              )}
              {item.name && (
                <P
                  css={`
                    line-height: 2rem;
                    font-size: 1.75rem;
                    font-weight: 700;
                  `}
                >
                  {item.name}
                </P>
              )}
              {(item.company || item.name) && (
                <P
                  css={`
                    line-height: 2rem;
                    font-size: 1.75rem;
                    margin: 0.5rem 0 0;
                  `}
                >
                  {item.position}
                  {item.position && item.company && ', '}
                  {item.company}
                </P>
              )}
            </Fragment>
          ))}
        </Carousel>
      )}
    </Section>
  );
}

TestimonialsContainer.propTypes = {
  header: BlockHeader.propTypes.header,
  testimonials: arrayOf(
    shape({
      name: string,
      position: string,
      company: string,
      image: shape({
        alt: string.isRequired,
        src: shape({
          childImageSharp: shape({
            fluid: shape({
              src: string,
            }),
          }),
        }),
      }),
      testimonials: string,
    }),
  ),
};

TestimonialsContainer.defaultProps = {
  header: [],
  testimonials: [],
};
