// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import {
  RootContainer,
  HeaderContainer,
  FooterContainer,
  SEOContainer,
  BreadcrumbsContainer,
  HeroContainer,
  SidekickContainer,
  TestimonialsContainer,
  LogosContainer,
  PricingContainer,
  BlogContainer,
  FAQContainer,
  PeopleContainer,
  JobsContainer,
} from '~containers';
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
          ...FAQFragment
          ...PeopleFragment
          ...JobsFragment
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

    if (block.type === 'faq') {
      return <FAQContainer key={i} {...block} />;
    }

    if (block.type === 'people') {
      return <PeopleContainer key={i} {...block} />;
    }

    if (block.type === 'jobs') {
      return <JobsContainer key={i} {...block} />;
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
      <HeaderContainer />
      <SEOContainer meta={meta} />
      <Main
        css={`
          grid-template-columns: var(--width-outside) 1fr var(--width-outside);
        `}
      >
        <BreadcrumbsContainer location={location} />
        {renderBlocks(blocks)}
      </Main>
      <FooterContainer />
    </RootContainer>
  );
}

PageTemplateContainer.propTypes = {
  data: shape({
    page: shape({
      frontmatter: shape({
        meta: shape({
          permalink: string,
        }),
        blocks: arrayOf(
          shape({
            type: string,
          }),
        ),
      }),
    }),
  }).isRequired,
  location: shape({
    pathname: string,
  }).isRequired,
};
