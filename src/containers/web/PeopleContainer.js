// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { Section, Header, BlockHeader, P, Ul, Li, Img, Link, Icon } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment PeopleFragment on MdxFrontmatterBlocks {
    type
    header {
      ...BlockHeaderFragment
    }
    people {
      name
      position
      company
      mdx
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
      contact {
        icon
        url
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PeopleContainer({ header, people }) {
  return (
    <Section
      css={`
        grid-column: 2;
        padding: var(--block-padding);
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
      {people && (
        <Ul
          css={`
            margin: 8rem auto 0;
            grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
            grid-gap: 4rem;

            max-width: 100rem;
          `}
        >
          {people.map((person) => (
            <Li
              css={`
                font-size: 1.5rem;
                line-height: 2rem;
              `}
            >
              {person.image && (
                <Img
                  {...person.image?.src?.childImageSharp?.fluid}
                  alt={person.name || person.image?.alt}
                  ratio={person.image?.ratio.split('/').reduce((p, c) => p / c)}
                  css={`
                    max-width: 16rem;
                    margin: 0 auto 1rem;
                    background: hsla(var(--hsl-text), 0.05);
                    border-radius: 999px;
                  `}
                />
              )}
              {person.name && (
                <P
                  css={`
                    line-height: 2rem;
                    font-size: 1.75rem;
                    font-weight: 700;
                  `}
                >
                  {person.name}
                </P>
              )}
              {(person.company || person.name) && (
                <P
                  css={`
                    line-height: 2rem;
                    font-size: 1.75rem;
                    margin: 0.5rem 0;
                  `}
                >
                  {person.position}
                  {person.position && person.company && ', '}
                  {person.company}
                </P>
              )}
              {person.contact && (
                <Ul
                  css={`
                    grid-auto-flow: column;
                    grid-auto-columns: max-content;
                    justify-content: center;
                    grid-gap: 0.5rem;
                  `}
                >
                  {person.contact.map((contact) => (
                    <Li>
                      <Link look="primary" to={contact.url}>
                        <Icon icon={contact.icon} />
                      </Link>
                    </Li>
                  ))}
                </Ul>
              )}
              {person.mdx && <MDXRenderer>{person.mdx}</MDXRenderer>}
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

PeopleContainer.propTypes = {
  header: BlockHeader.propTypes.header,
  people: arrayOf(
    shape({
      name:     string,
      position: string,
      company:  string,
      image:    shape({
        alt: string.isRequired,
        src: shape({
          childImageSharp: shape({
            fluid: shape({
              src: string,
            }),
          }),
        }),
      }),
      contact: arrayOf(
        shape({
          icon: string,
          url:  string,
        }),
      ),
    }),
  ),
};

PeopleContainer.defaultProps = {
  header: [],
  people: [],
};
