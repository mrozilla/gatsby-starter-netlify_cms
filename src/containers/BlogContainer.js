// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { string } from 'prop-types';

import { H1, Section, P, Ul, Li, Link, H2, Img } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

const query = graphql`
  query {
    posts: allMdx(filter: { fields: { sourceName: { eq: "posts" } } }) {
      nodes {
        timeToRead
        frontmatter {
          title
          subtitle
          date(formatString: "MMMM D, YYYY")
          meta {
            permalink
            ogImage {
              childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function BlogContainer({ title, subtitle }) {
  const { posts } = useStaticQuery(query);

  return (
    <Section
      css={`
        grid-column: 2;
        padding: 5rem 0;
        box-shadow: 0 -px 0 0 hsla(var(--hsl-text), 0.1);

        @media screen and (min-width: 900px) {
          padding: 10vh 0;
        }
      `}
    >
      {title && (
        <H1
          css={`
            font-size: 3rem;
            line-height: 1;
            font-weight: 700;
            text-align: center;
            max-width: 20ch;
            margin: 0 auto;

            @media screen and (min-width: 1200px) {
              font-size: 4rem;
            }
          `}
        >
          {title}
        </H1>
      )}
      {subtitle && (
        <P
          css={`
            font-size: 2.5rem;
            line-height: 2.5rem;
            text-align: center;
            max-width: 50ch;
            margin: 2rem auto 0;

            @media screen and (min-width: 1200px) {
              line-height: 3rem;
            }
          `}
        >
          {subtitle}
        </P>
      )}
      {posts && (
        <Ul
          css={`
            grid-template-columns: repeat(auto-fill, minmax(30ch, 1fr));
            grid-gap: 8rem 4rem;
            margin: 8rem 0 0;
          `}
        >
          {posts.nodes.map((post, i) => (
            <Li
              key={post.frontmatter.meta.permalink}
              css={`
                grid-column: ${i === 0 ? '1 / -1' : ''};
              `}
            >
              <Link
                to={post.frontmatter.meta.permalink}
                css={`
                  display: ${i === 0 ? 'grid' : ''};
                  grid-template-columns: 2fr 1fr;
                  grid-gap: 0 2rem;

                  &:hover {
                    & h2 {
                      color: var(--color-primary);
                      text-decoration: underline;
                    }
                    & img {
                      transform: scale(1.05);
                    }
                  }
                `}
              >
                <Img
                  {...post.frontmatter.meta.ogImage?.childImageSharp?.fluid}
                  alt={post.frontmatter.title}
                  ratio={2 / 1}
                  css={`
                    grid-row: span 4;
                    margin: ${i === 0 ? '' : '0 0 2rem'};
                    box-shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.05);
                    border-radius: 0.5rem;

                    & > img {
                      transition: transform 250ms;
                    }
                  `}
                />
                <H2
                  css={`
                    grid-column: 2;
                    font-size: 3rem;
                    font-weight: 700;
                  `}
                >
                  {post.frontmatter.title}
                </H2>
                {post.frontmatter.subtitle && (
                  <P
                    css={`
                      grid-column: 2;
                      margin: 2rem 0 0;
                    `}
                  >
                    {post.frontmatter.subtitle}
                  </P>
                )}
                <P
                  css={`
                    grid-column: 2;
                    font-size: 1.5rem;
                    margin: 1rem 0 0;
                  `}
                >
                  {post.frontmatter.date && `${post.frontmatter.date} · `}
                  {post.timeToRead} min read
                </P>
              </Link>
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

BlogContainer.propTypes = {
  title:    string,
  subtitle: string,
};

BlogContainer.defaultProps = {
  title:    '',
  subtitle: '',
};
