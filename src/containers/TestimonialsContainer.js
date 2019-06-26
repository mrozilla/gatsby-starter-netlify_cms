// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Img, Carousel, Blockquote } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment TestimonialsFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    # body
    testimonials {
      name
      position
      company
      testimonial
      image {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function TestimonialsContainer({ title, subtitle, testimonials }) {
  const [visibleItems, setVisibleItems] = useState(
    document && document.body.clientWidth < 600 ? 1 : 3,
  );

  const handleResize = () => {
    setVisibleItems(document.body.clientWidth < 600 ? 1 : 3);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Section
      gridColumn="2"
      display="grid"
      padding={{
        xs: '5rem 10vw',
        md: '10vh 0',
      }}
      boxShadow="0 -1px 0 0 hsla(var(--hsl-text),0.1)"
      textAlign="center"
    >
      {title && (
        <H1
          fontSize={{
            xs: '3rem',
            lg: '4rem',
          }}
          lineHeight="1"
          fontWeight="700"
        >
          {title}
        </H1>
      )}
      {subtitle && (
        <P
          fontSize="2.5rem"
          lineHeight={{
            xs: '2.5rem',
            lg: '3rem',
          }}
          margin="2rem 0 0"
        >
          {subtitle}
        </P>
      )}
      {testimonials && (
        <Carousel
          visibleItems={Math.min(testimonials.length, visibleItems)}
          itemProps={{
            padding: '2rem',
          }}
          loop={
            testimonials.length > visibleItems
              ? {
                interval: 5000,
              }
              : {}
          }
          isControls={testimonials.length > visibleItems}
          margin="2rem 0 0"
        >
          {testimonials.map(item => (
            <>
              {item?.testimonial && (
                <Blockquote lineHeight="3rem" margin="0 0 2rem">
                  {item?.testimonial}
                </Blockquote>
              )}
              {item?.image && (
                <Img
                  {...item?.image?.childImageSharp?.fluid}
                  alt={item?.name}
                  maxWidth="8rem"
                  margin="0 auto 1rem"
                  backgroundColor="hsla(var(--hsl-text),0.05)"
                  borderRadius="999px"
                />
              )}
              {item?.name && (
                <P lineHeight="2rem" fontSize="1.75rem" fontWeight="700">
                  {item?.name}
                </P>
              )}
              {(item?.company || item?.name) && (
                <P lineHeight="2rem" fontSize="1.75rem" margin="0.5rem 0 0">
                  {item?.position}
                  {item?.position && item?.company && ', '}
                  {item?.company}
                </P>
              )}
            </>
          ))}
        </Carousel>
      )}
    </Section>
  );
}

TestimonialsContainer.propTypes = {
  title:        string,
  subtitle:     string,
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
  testimonials: [],
};
