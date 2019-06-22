// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import Helmet from 'react-helmet';
import { graphql, useStaticQuery } from 'gatsby';
import { shape, string } from 'prop-types';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SEOFragment on MdxFrontmatter {
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
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SEOContainer({ meta: { title, description, permalink, ogImage } }) {
  const {
    site: {
      siteMetadata: { siteUrl, siteTitle },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          siteTitle
        }
      }
    }
  `);
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        { name: 'description', content: description },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@mrozilla' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:creator', content: '@mrozilla' },
        {
          name:    'twitter:image',
          content: `${siteUrl}${ogImage?.childImageSharp?.resize?.src}`,
        },

        { property: 'og:title', content: `${title}` },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}${permalink}` },
        {
          property: 'og:image',
          content:  `${siteUrl}${ogImage?.childImageSharp?.resize?.src}`,
        },
        { property: 'og:description', content: description },
        { property: 'fb:app_id', content: process.env.GATSBY_FB_APP_ID },
      ]}
      link={[
        {
          rel:  'canonical',
          href: `${siteUrl}${permalink}`,
        },
      ]}
      htmlAttributes={{ lang: 'en' }}
    />
  );
}

SEOContainer.propTypes = {
  meta: shape({
    title:       string.isRequired,
    description: string.isRequired,
    permalink:   string.isRequired,
    ogImage:     shape({
      childImageSharp: shape({
        resize: shape({
          src: string.isRequired,
        }),
      }),
    }),
  }).isRequired,
};
