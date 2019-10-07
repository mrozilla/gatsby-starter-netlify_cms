// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Ul, Li, Details, Summary, View } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment FAQFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    mdx
    faq {
      title
      mdx
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function FAQContainer({ title, subtitle, mdx, faq }) {
  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
      `}
    >
      <View as="header">
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
              margin: 2rem 0 2rem;

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
      {faq && (
        <Ul
          css={`
            margin: 4rem 0 0;
            max-width: 60ch;
          `}
        >
          {faq.map((item, i) => (
            <Li key={item.title}>
              <Details
                open={i === 0}
                css={`
                  margin: 0 0 4rem;
                  padding: 0 0 0 6rem;
                `}
              >
                <Summary
                  css={`
                    font-size: 3rem;
                    font-weight: 700;
                    margin: 0 0 3rem -6rem;
                  `}
                >
                  {item.title}
                </Summary>
                <MDXRenderer>{item.mdx}</MDXRenderer>
              </Details>
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

FAQContainer.propTypes = {
  title:    string,
  subtitle: string,
  mdx:      string,
  faq:      arrayOf(
    shape({
      title: string,
      mdx:   string,
    }),
  ),
};

FAQContainer.defaultProps = {
  title:    '',
  subtitle: '',
  mdx:      '',
  faq:      [],
};
