// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { RootContainer,
  SEOContainer,
  BreadcrumbsContainer,
  HeroContainer,
  SidekickContainer,
  TestimonialsContainer,
  LogosContainer,
  PricingContainer,
  BlogContainer } from '~containers';
import { Main } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  query($path: String!) {
    page: mdx(frontmatter: { meta: { permalink: { eq: $path } } }) {
      frontmatter {
        ...SEOFragment
        blocks {
          ...HeroFragment
          ...SidekickFragment
          ...TestimonialsFragment
          ...LogosFragment
          ...PricingFragment
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderBlocks(blocks) {
  if (!blocks) {
    return null;
  }

  return blocks.map((block, i) => {
    /* eslint-disable react/no-array-index-key */

    if (block.type === 'hero') {
      return <HeroContainer key={i} {...block} />;
    }

    if (block.type === 'sidekick') {
      return <SidekickContainer key={i} {...block} />;
    }

    if (block.type === 'testimonials') {
      return <TestimonialsContainer key={i} {...block} />;
    }

    if (block.type === 'logos') {
      return <LogosContainer key={i} {...block} />;
    }

    if (block.type === 'pricing') {
      return <PricingContainer key={i} {...block} />;
    }

    if (block.type === 'blog') {
      return <BlogContainer key={i} {...block} />;
    }

    if (block.type === 'mdx' || block.type === 'markdown') {
      return (
        <MDXRenderer key={block.mdx} components={{ wrapper: Fragment }}>
          {block.mdx}
        </MDXRenderer>
      );
    }

    return null;

    /* eslint-enable */
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PageTemplateContainer({
  data: {
    page: {
      frontmatter: { meta, blocks },
    },
  },
  location,
}) {
  return (
    <RootContainer>
      <SEOContainer meta={meta} />
      <Main
        css={`
          grid-template-columns: var(--width-outside) 1fr var(--width-outside);
        `}
      >
        <BreadcrumbsContainer location={location} />
        {renderBlocks(blocks)}
      </Main>
    </RootContainer>
  );
}
