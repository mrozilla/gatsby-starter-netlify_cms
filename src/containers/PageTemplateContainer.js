// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

import { RootContainer,
  SEOContainer,
  HeroContainer,
  SidekickContainer,
  TestimonialsContainer, LogosContainer } from '~containers';
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

  return blocks.map((block) => {
    if (block.type === 'hero') {
      return <HeroContainer key={block.title} {...block} />;
    }

    if (block.type === 'sidekick') {
      return <SidekickContainer key={block.title} {...block} />;
    }

    if (block.type === 'testimonials') {
      return <TestimonialsContainer key={block.title} {...block} />;
    }
    
    if (block.type === 'logos') {
      return <LogosContainer key={block.title} {...block} />;
    }

    if (block.type === 'mdx' || block.type === 'markdown') {
      return (
        <MDXRenderer key={block.mdx} components={{ wrapper: Fragment }}>
          {block.mdx}
        </MDXRenderer>
      );
    }
    return null;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PageTemplate({
  data: {
    page: {
      frontmatter: { meta, blocks },
    },
  },
}) {
  return (
    <RootContainer>
      <SEOContainer meta={meta} />
      <Main gridTemplateColumns="var(--width-outside) 1fr var(--width-outside)" padding="10rem 0 0">
        {renderBlocks(blocks)}
      </Main>
    </RootContainer>
  );
}
