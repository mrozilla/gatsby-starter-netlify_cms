// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { Section, Header, BlockHeader, Ul, Li, Details, Summary } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment FAQFragment on MdxFrontmatterBlocks {
    type
    header {
      ...BlockHeaderFragment
    }
    faq {
      title
      mdx
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function FAQContainer({ header, faq }) {
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
  header: BlockHeader.propTypes.header,
  faq:    arrayOf(
    shape({
      title: string,
      mdx:   string,
    }),
  ),
};

FAQContainer.defaultProps = {
  header: [],
  faq:    [],
};
