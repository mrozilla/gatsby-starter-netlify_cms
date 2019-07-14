// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Footer, Section, H2, Ul, Li, Link, Logo, Badge } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

const query = graphql`
  query {
    footer: mdx(fields: { sourceName: { eq: "menus" } }, frontmatter: { title: { eq: "Footer" } }) {
      frontmatter {
        links {
          type
          url
          title
          links {
            text
            url
            badge
          }
          mdx
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function FooterContainer() {
  const { footer } = useStaticQuery(query);

  const renderLinks = (item) => {
    if (item.type === 'markdown' || item.type === 'mdx') {
      return (
        <Li
          key={item.title}
          css={`
            font-size: 1.75rem;
          `}
        >
          <Link
            to="/"
            css={`
              display: block;
              margin: 0 0 2rem;
            `}
          >
            <Logo
              css={`
                font-size: 2rem;
              `}
            />
          </Link>
          <MDXRenderer key={item.mdx}>{item.mdx}</MDXRenderer>
        </Li>
      );
    }

    if (item.type === 'nested') {
      return (
        <Li key={item.title}>
          <H2
            css={`
              font-weight: 700;
              margin: 0 0 2rem;
            `}
          >
            {item.title}
          </H2>
          <Ul
            css={`
              grid-gap: 1rem;
            `}
          >
            {item.links.map(link => (
              <Li key={link.url || link.text}>
                {link.url ? (
                  <Link
                    to={link.url}
                    look="tertiary"
                    css={`
                      font-size: 1.75rem;
                    `}
                  >
                    {link.text}
                    {link.badge && <Badge>{link.badge}</Badge>}
                  </Link>
                ) : (
                  <H2
                    css={`
                      font-weight: 700;
                    `}
                  >
                    {link.text}
                  </H2>
                )}
              </Li>
            ))}
          </Ul>
        </Li>
      );
    }

    return null;
  };

  return (
    <Footer>
      <Section
        as="nav"
        css={`
          padding: var(--block-padding) var(--width-outside) calc(var(--block-padding));
          text-align: center;

          @media screen and (min-width: 900px) {
            text-align: unset;
          }
        `}
      >
        <Ul
          css={`
            grid-auto-columns: 1fr;
            grid-gap: 4rem 8rem;

            @media screen and (min-width: 900px) {
              grid-auto-flow: column;
            }
          `}
        >
          {footer?.frontmatter?.links?.map(renderLinks)}
        </Ul>
      </Section>
    </Footer>
  );
}
