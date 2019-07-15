// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { shape, string } from 'prop-types';

import { View, Ol, Li, Link } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function BreadcrumbsContainer({ location, separator }) {
  if (location.pathname === '/') {
    return null;
  }

  const { pages } = useStaticQuery(graphql`
    query {
      pages: allMdx(filter: { fields: { sourceName: { eq: "pages" } } }) {
        nodes {
          frontmatter {
            meta {
              title
              permalink
            }
          }
        }
      }
    }
  `);

  const breadcrumbs = location.pathname.split('/').reduce(
    (acc, item, i) => {
      if (item === '') {
        return acc;
      }

      const pathname = `${acc[i - 1].url}${item}${item === '/' ? '' : '/'}`;
      const title = pages.nodes.find(page => page.frontmatter.meta.permalink === pathname)
        ?.frontmatter.meta.title;
      return [
        ...acc,
        {
          url: pathname,
          title,
        },
      ];
    },
    [
      {
        url:   '/',
        title: 'Home',
      },
    ],
  );

  return (
    <View
      as="nav"
      aria-label="Breadcrumb"
      css={`
        grid-column: 2;

        box-shadow: 0 2px 0 0 var(--color-bg);
        z-index: 1;
      `}
    >
      <Ol
        css={`
          grid-auto-flow: column;
          grid-auto-columns: max-content;
          grid-gap: 1rem;

          padding: 1rem 0;
          font-size: 1.5rem;
        `}
      >
        {breadcrumbs.map(
          page => page.title && (
          <Li
            key={page.url}
            css={`
              transition: opacity 250ms;

              &:not(:last-child) {
                opacity: 0.5;
                &::after {
                  content: "${separator}";
                  display: inline-block;
                  margin: 0 0 0 1rem;
                  opacity: 0.5;
                }
              }

              &:hover {
                opacity: 1;
              }
            `}
          >
            {page.url === location.pathname ? (
              page.title
            ) : (
              <Link to={`${page.url}`} look="tertiary">
                {page.title}
              </Link>
            )}
          </Li>
          ),
        )}
      </Ol>
    </View>
  );
}

BreadcrumbsContainer.propTypes = {
  location: shape({
    pathname: string.isRequired,
  }).isRequired,
  separator: string,
};

BreadcrumbsContainer.defaultProps = {
  separator: '/',
};
