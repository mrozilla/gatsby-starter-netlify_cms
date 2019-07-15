// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Header, H2, Link, Nav, Logo, Button, Badge } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment HeaderFragment on MdxFrontmatter {
    links {
      title
      text
      url
      badge
      links {
        text
        url
        badge
      }
      look
      type
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeaderContainer() {
  const { header } = useStaticQuery(graphql`
    query {
      header: mdx(
        fields: { sourceName: { eq: "menus" } }
        frontmatter: { title: { eq: "Header" } }
      ) {
        frontmatter {
          ...HeaderFragment
        }
      }
    }
  `);

  return (
    <Header>
      <Nav>
        <Link
          to="/"
          css={`
            padding: 3.5rem 0;
          `}
        >
          <Logo />
        </Link>
        <Nav.Toggle
          css={`
            top: 2.5rem;
            right: -2rem;
          `}
        />
        <Nav.List>
          {header?.frontmatter?.links.map((item) => {
            if (item.type === 'link') {
              return (
                <Nav.List.Item key={item.url}>
                  <Link
                    to={item.url}
                    look="tertiary"
                    css={`
                      display: block;
                      padding: 1rem;

                      @media screen and (min-width: 1200px) {
                        padding: 3.5rem 2rem;
                      }
                    `}
                  >
                    {item.text}
                    {item.badge && <Badge>{item.badge}</Badge>}
                  </Link>
                </Nav.List.Item>
              );
            }

            if (item.type === 'button') {
              return (
                <Nav.List.Item
                  key={item.url}
                  css={`
                    padding: 1rem 0;
                  `}
                >
                  <Button
                    as={Link}
                    to={item.url}
                    look={item.look}
                    css={`
                      padding: 1rem 4rem;
                    `}
                  >
                    {item.text}
                  </Button>
                </Nav.List.Item>
              );
            }

            if (item.type === 'nested') {
              return (
                <Nav.List.Item key={item.title}>
                  <H2
                    tabIndex="0"
                    css={`
                      outline: none;
                      padding: 1rem;

                      &:hover {
                        color: var(--color-brand-primary);
                      }

                      @media screen and (min-width: 1200px) {
                        padding: 3.5rem 2rem;
                      }
                    `}
                  >
                    {item.title}
                  </H2>
                  <Nav.Toggle
                    css={`
                      top: -1rem;
                      right: -2rem;
                    `}
                  />
                  <Nav.List>
                    {item.links.map(link => (
                      <Nav.List.Item key={link.url}>
                        <Link
                          to={link.url}
                          look="tertiary"
                          css={`
                            display: block;
                            padding: 1rem;

                            @media screen and (min-width: 1200px) {
                              padding: 1rem 4rem;
                            }
                          `}
                        >
                          {link.text}
                          {link.badge && <Badge>{link.badge}</Badge>}
                        </Link>
                      </Nav.List.Item>
                    ))}
                  </Nav.List>
                </Nav.List.Item>
              );
            }

            return null;
          })}
        </Nav.List>
      </Nav>
    </Header>
  );
}
