// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Img, Carousel, Blockquote } from '~components';
import { useEventListener } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment TestimonialsFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    mdx
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

export default function TestimonialsContainer({ title, subtitle, mdx, testimonials }) {
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
      {title && (
        <H1
          css={`
            font-size: 3rem;
            line-height: 1;
            font-weight: 700;

            @media screen and (min-width: 1200px) {
              font-size: 4rem;
            }
          `}
        >
          {title}
        </H1>
      )}
      {subtitle && (
        <P
          css={`
            font-size: 2.5rem;
            line-height: 2.5rem;
            margin: 2rem 0;

            @media screen and (min-width: 1200px) {
              line-height: 3rem;
            }
          `}
        >
          {subtitle}
        </P>
      )}
      {mdx && <MDXRenderer>{mdx}</MDXRenderer>}
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
          {testimonials.map(item => (
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
                    background-color: hsla(var(--hsl-text), 0.05);
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
  title:        string,
  subtitle:     string,
  mdx:          string,
  testimonials: arrayOf(
    shape({
      name:         string,
      position:     string,
      company:      string,
      // image: // TODO:
      testimonials: string,
    }),
  ),
};

TestimonialsContainer.defaultProps = {
  title:        '',
  subtitle:     '',
  mdx:          '',
  testimonials: [],
};
