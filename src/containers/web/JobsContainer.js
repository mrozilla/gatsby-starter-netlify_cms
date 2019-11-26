// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { Section, Header, BlockHeader, H1, P, Ul, Li, Link, Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment JobsFragment on MdxFrontmatterBlocks {
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
    jobs {
      title
      url
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function JobsContainer({ header, jobs }) {
  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
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
      {jobs && (
        <Ul
          css={`
            margin: 4rem 0 2rem;

            background: var(--color-inverse);
            border-radius: 0.5rem;
            box-shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.05);
          `}
        >
          {jobs.map((item) => (
            <Li
              key={item.title}
              css={`
                display: flex;
                align-items: center;
                justify-content: space-between;

                padding: 3rem 0;
                margin: 0 4rem;

                &:not(:first-of-type) {
                  box-shadow: 0 -2px 0 0 hsla(var(--hsl-text), 0.05);
                }
              `}
            >
              <H1
                css={`
                  font-size: 3rem;
                  font-weight: 700;
                `}
              >
                {item.title}
              </H1>
              <Button as={Link} to={item.url} look="primary">
                Learn more
              </Button>
            </Li>
          ))}
        </Ul>
      )}
      <P
        css={`
          font-size: 1.75rem;
        `}
      >
        Don&apos;t see a position that fits your skill set?{' '}
        <Link to="mailto:jobs@example.com" look="primary">
          Talk to us
        </Link>
      </P>
    </Section>
  );
}

JobsContainer.propTypes = {
  header: BlockHeader.propTypes.header,
  jobs: arrayOf(
    shape({
      title: string,
      url: string,
    }),
  ),
};

JobsContainer.defaultProps = {
  header: [],
  jobs: [],
};
