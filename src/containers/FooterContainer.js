// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { FaFacebookSquare, FaTwitterSquare, FaYoutubeSquare } from 'react-icons/fa';

import { Footer, Section, H1, H2, P, Ul, Li, Link, Form, Input, Button, Logo } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

const query = graphql`
  query {
    footer: mdx(fields: { sourceName: { eq: "menus" } }, frontmatter: { title: { eq: "Footer" } }) {
      frontmatter {
        links {
          # mdx
          type
          url
          title
          links {
            text
            url
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
        <Li key={item.title} fontSize="1.75rem">
          <Link to="/" display="block" margin="0 0 2rem">
            <Logo fontSize="2rem" />
          </Link>
          <MDXRenderer key={item.mdx}>
            {item.mdx}
          </MDXRenderer>
        </Li>
      );
    }

    if (item.type === 'nested') {
      return (
        <Li key={item.title}>
          <H2 fontWeight="700" margin="0 0 2rem">
            {item.title}
          </H2>
          <Ul gridGap="1rem">
            {item.links.map(link => (
              <Li key={link.url || link.text}>
                {link.url ? (
                  <Link to={link.url} look="tertiary" fontSize="1.75rem">
                    {link.text}
                  </Link>
                ) : (
                  <H2 fontWeight="700">{link.text}</H2>
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
        padding="8rem var(--width-outside) 16rem"
        textAlign={{
          xs: 'center',
          lg: 'unset',
        }}
      >
        <Ul gridAutoFlow={{ lg: 'column' }} gridAutoColumns="1fr" gridGap="4rem 8rem">
          {footer?.frontmatter?.links?.map(renderLinks)}
        </Ul>
      </Section>
    </Footer>
  );
}
