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
      css={`
        grid-column: 2;
        padding: 5rem 0;
        box-shadow: 0 -1px 0 0 hsla(var(--hsl-text), 0.1);
        text-align: center;
      `}
    >
      {title && (
        <H1
          css={`
            font-size: 3rem;
            line-height: 1;
            font-size: 700;

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
            margin: 2rem 0 0;

            @media screen and (min-width: 1200px) {
              line-height: 3rem;
            }
          `}
        >
          {subtitle}
        </P>
      )}
      {logos && (
        <Ul
          css={`
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 3rem -1rem -1rem;
          `}
        >
          {logos.map(company => (
            <Li
              key={company.url}
              css={`
                flex: 0 0 25rem;
                margin: 1rem;
              `}
            >
              <Link to={company.url}>
                <Img
                  {...company?.image?.childImageSharp?.fluid}
                  alt={company.name}
                  ratio={1 / 3}
                  css={`
                    & > img {
                      object-fit: contain;
                    }
                  `}
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
