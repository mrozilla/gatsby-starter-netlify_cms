// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Ul, Li, View, Link, Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment JobsFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    mdx
    jobs {
      title
      url
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function JobsContainer({ title, subtitle, mdx, jobs }) {
  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
      `}
    >
      <View
        as="header"
        css={`
          & > p {
            max-width: 60ch;
            margin: 2rem 0;
          }
        `}
      >
        {title && (
          <H1
            css={`
              font-size: 3rem;
              line-height: 1;
              font-weight: 700;
              max-width: 20ch;

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
              max-width: 50ch;
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
      </View>
      {jobs && (
        <Ul
          css={`
            margin: 4rem 0 2rem;

            background-color: var(--color-inverse);
            border-radius: 0.5rem;
            box-shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.05);
          `}
        >
          {jobs.map(item => (
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
  title:    string,
  subtitle: string,
  mdx:      string,
  jobs:     arrayOf(
    shape({
      title: string,
      url:   string,
    }),
  ),
};

JobsContainer.defaultProps = {
  title:    '',
  subtitle: '',
  mdx:      '',
  jobs:     [],
};
