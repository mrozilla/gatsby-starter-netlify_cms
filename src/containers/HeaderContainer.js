// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { Header, H2, Link, Nav, Logo, Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
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

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeaderContainer({ location }) {
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
        <Link to="/" padding="1rem">
          <Logo />
        </Link>
        <Nav.Toggle top="2rem" />
        <Nav.List>
          {header?.frontmatter?.links.map((item) => {
            if (item.type === 'link') {
              return (
                <Nav.List.Item key={item.url}>
                  <Link
                    to={item.url}
                    look="tertiary"
                    display="block"
                    padding={{
                      xs: '1rem',
                      lg: '3rem 2rem',
                    }}
                  >
                    {item.text}
                  </Link>
                </Nav.List.Item>
              );
            }

            if (item.type === 'button') {
              return (
                <Nav.List.Item key={item.url} padding="1rem 0">
                  <Button as={Link} to={item.url} look={item.look} padding="1rem 4rem">
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
                    outline="none"
                    padding={{
                      xs: '1rem',
                      lg: '3rem 2rem',
                    }}
                    hover={{
                      color: 'var(--color-brand-primary)',
                    }}
                  >
                    {item.title}
                  </H2>
                  <Nav.Toggle />
                  <Nav.List>
                    {item.links.map(link => (
                      <Nav.List.Item key={link.url}>
                        <Link
                          to={link.url}
                          look="tertiary"
                          display="block"
                          padding={{
                            xs: '1rem',
                            lg: '1rem 4rem',
                          }}
                        >
                          {link.text}
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
