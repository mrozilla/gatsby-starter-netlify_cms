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
    announcement {
      title
      url
      body
    }
    links {
      title
      url
      badge
      links {
        title
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
        fileAbsolutePath: { regex: "/cms/menus/" }
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
      `}
    >
      {header?.frontmatter?.announcement?.map(({ url, body }) => (
        <Link
          key={url}
          to={url}
          css={`
            display: block;
            background: hsla(var(--hsl-primary), 1);
            padding: 2rem;

            font-size: 1.75rem;
            font-weight: 700;
            text-align: center;
            color: var(--color-inverse);

            &::after {
              content: '›';
              display: inline-block;
              margin: 0 0 0 1rem;
              transition: transform 250ms;
            }

            &:hover {
              background: hsla(var(--hsl-primary), 0.95);

              &::after {
                transform: translateX(0.5rem);
              }
            }
          `}
        >
          {body}
        </Link>
      ))}
      <Nav
        css={`
          padding: 0 var(--width-outside);
        `}
      >
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
            right: 0;
            padding: 2.5rem 2rem;
          `}
        />
        <Nav.List
          css={`
            @media screen and (min-width: 900px) {
              justify-self: end;
            }
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
                      padding: 1rem 0;
                      @media screen and (min-width: 900px) {
                        padding: 3.5rem 2rem;
                      }
                    `}
                  >
                    {item.title}
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
                    & > a {
                      padding: 1rem 3rem;
                    }
                    @media screen and (min-width: 900px) {
                      padding: 3rem 1rem;
                    }
                  `}
                >
                  <Button as={Link} to={item.url} look={item.look}>
                    {item.title}
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
                      padding: 1rem 0;

                      &:hover {
                        color: var(--color-primary);
                      }
                      @media screen and (min-width: 900px) {
                        padding: 3.5rem 1rem;
                      }
                    `}
                  >
                    {item.title}
                  </H2>
                  <Nav.Toggle
                    css={`
                      top: 0;
                      right: -2rem;
                      padding: 1.5rem 2rem;
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
                            padding: 1rem 0;
                            width: 100%;

                            @media screen and (min-width: 1200px) {
                              padding: 1rem 2rem;
                            }
                          `}
                        >
                          {link.title}
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
