// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { Section, Header, BlockHeader, Ul, Li, Link, Img } from '~components';
import { useOnScreen } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment LogosFragment on MdxFrontmatterBlocks {
    type
    header {
      ...BlockHeaderFragment
    }
    logos {
      title
      url
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

export default function LogosContainer({ header, logos }) {
  const [ref, isIntersecting] = useOnScreen({ rootMargin: '-25%' });

  return (
    <Section
      ref={ref}
      css={`
        grid-column: 2;
        padding: 5rem 0;
        box-shadow: var(--block-box-shadow);
        text-align: center;
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
      {logos && (
        <Ul
          css={`
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 3rem -1rem -1rem;
          `}
        >
          {logos.map((company, i) => (
            <Li
              key={company.url}
              css={`
                flex: 0 0 25rem;
                margin: 1rem;

                opacity: ${isIntersecting ? '1' : '0'};
                transform: scale(${isIntersecting ? '1' : '0.9'});
                transition: opacity 250ms, transform 250ms;
                transition-delay: calc(100ms * ${i});
              `}
            >
              <Link to={company.url}>
                <Img
                  {...company.image?.src?.childImageSharp?.fluid}
                  alt={company.name || company.image?.alt}
                  ratio={company.image?.ratio.split('/').reduce((p, c) => p / c)}
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
  header: BlockHeader.propTypes.header,
  logos: arrayOf(
    shape({
      name: string,
      url: string,
      // image:
    }),
  ),
};

LogosContainer.defaultProps = {
  header: [],
  logos: [],
};
