// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { graphql } from 'gatsby';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export const fragments = graphql`
  fragment MetaFragment on MdxFrontmatter {
    meta {
      permalink
      title
      description
      ogImage {
        childImageSharp {
          resize(width: 1200, height: 630) {
            src
          }
        }
      }
    }
  }

  fragment HeaderFragment on MdxFrontmatter {
    links {
      title
      text
      url
      links {
        text
        url
      }
      look
      type
    }
  }
`;
