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
    <Header
      css={`
        position: sticky;
        z-index: var(--z-index-header);
        top: 0;
        width: 100%;
        max-height: 100vh;

        background: var(--color-inverse);
        box-shadow: inset 0 -2px hsla(var(--hsl-text), 0.05);

        padding: 0 var(--width-outside);
      `}
    >
      <Nav>
        <Link
          to="/"
          css={`
            padding: 2rem 0;
            display: flex;
            align-items: center;
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
        <Nav.List
          css={`
            justify-self: end;
          `}
        >
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
                    padding: 3rem 0;

                    & > a {
                      padding: 1rem 3rem;
                    }
                  `}
                >
                  <Button as={Link} to={item.url} look={item.look}>
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
                        color: var(--color-primary);
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
                    {item.links.map((link) => (
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
