// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import DarkModeContainer from '~containers/general/DarkModeContainer';
import { Footer, Section, H2, Ul, Li, Link, Logo, Badge, P, Icon } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

const query = graphql`
  query {
    footer: mdx(
      fileAbsolutePath: { regex: "/cms/menus/" }
      frontmatter: { title: { eq: "Footer" } }
    ) {
      frontmatter {
        links {
          type
          url
          title
          links {
            title
            url
            badge
          }
          mdx
        }
      }
    }
    social: mdx(
      fileAbsolutePath: { regex: "/cms/menus/" }
      frontmatter: { title: { eq: "Social" } }
    ) {
      frontmatter {
        links {
          title
          url
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function FooterContainer() {
  const { footer, social } = useStaticQuery(query);

  const renderLinks = (item) => {
    if (item.type === 'markdown' || item.type === 'mdx') {
      return (
        <Li
          key={item.title}
          css={`
            font-size: 1.75rem;
          `}
        >
          <H2
            css={`
              font-weight: 700;
              margin: 0 0 2rem;
              font-size: 2rem;
            `}
          >
            {item.title}
          </H2>
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
            {item.links.map((link) => (
              <Li key={link.url || link.title}>
                {link.url ? (
                  <Link
                    to={link.url}
                    look="tertiary"
                    css={`
                      font-size: 1.75rem;
                    `}
                  >
                    {link.title}
                    {link.badge && <Badge>{link.badge}</Badge>}
                  </Link>
                ) : (
                  <H2
                    css={`
                      font-weight: 700;
                    `}
                  >
                    {link.title}
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
          padding: 10rem var(--width-outside);
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
          <Li>
            <Link
              to="/"
              css={`
                display: block;
                margin: 0 0 2rem;
              `}
            >
              <Logo />
            </Link>
          </Li>
          {footer?.frontmatter?.links?.map(renderLinks)}
        </Ul>
      </Section>
      <Section
        css={`
          padding: 2rem var(--width-outside);
          box-shadow: var(--block-box-shadow);

          display: grid;
          grid-auto-flow: column;
          grid-gap: 1rem;
          align-items: center;

          @media screen and (min-width: 900px) {
            grid-auto-columns: 1fr;
          }
        `}
      >
        <P
          css={`
            font-size: 1.75rem;
          `}
        >
          © 2019 All rights reserved
        </P>
        {social && (
          <Ul
            css={`
              grid-auto-flow: column;
              grid-gap: 2rem;

              @media screen and (min-width: 900px) {
                justify-content: center;
              }
            `}
          >
            {social?.frontmatter?.links?.map((link) => (
              <Li
                key={link.url}
                css={`
                  display: flex;
                  align-items: center;
                `}
              >
                <Link
                  to={link.url}
                  look="tertiary"
                  css={`
                    display: inline-flex;
                  `}
                >
                  <Icon icon={`Fa${link.title}`} />
                </Link>
              </Li>
            ))}
          </Ul>
        )}
        <DarkModeContainer
          css={`
            justify-self: end;
          `}
        />
      </Section>
    </Footer>
  );
}
