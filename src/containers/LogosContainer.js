// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Ul, Li, Link, Img } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment LogosFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    # body
    logos {
      name
      url
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

export default function LogosContainer({ title, subtitle, logos }) {
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
      {logos && (
        <Ul display="flex" flexWrap="wrap" justifyContent="center" margin="3rem -1rem -1rem">
          {logos.map(company => (
            <Li flex="0 0 25rem" margin="1rem">
              <Link to={company.url}>
                <Img
                  {...company?.image?.childImageSharp?.fluid}
                  alt={company.name}
                  ratio={1 / 3}
                  imgProps={{
                    objectFit: 'contain',
                  }}
                />
              </Link>
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

LogosContainer.propTypes = {
  title:    string,
  subtitle: string,
  logos:    arrayOf(
    shape({
      name: string,
      url:  string,
      // image:
    }),
  ),
};

LogosContainer.defaultProps = {
  title:    '',
  subtitle: '',
  logos:    [],
};
