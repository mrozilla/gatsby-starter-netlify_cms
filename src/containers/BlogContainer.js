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
          date
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
      gridColumn="2"
      display="grid"
      padding={{
        xs: '5rem 0',
        md: '10vh 0',
      }}
      boxShadow="0 -1px 0 0 hsla(var(--hsl-text),0.1)"
    >
      {title && (
        <H1
          fontSize={{
            xs: '3rem',
            lg: '4rem',
          }}
          lineHeight="1"
          fontWeight="700"
          textAlign="center"
          maxWidth="20ch"
          margin="0 auto"
        >
          {title}
        </H1>
      )}
      {subtitle && (
        <P
          fontSize="2.5rem"
          lineHeight={{
            xs: '2.5rem',
            lg: '3rem',
          }}
          textAlign="center"
          maxWidth="50ch"
          margin="2rem auto 0"
        >
          {subtitle}
        </P>
      )}
      {posts && (
        <Ul gridTemplateColumns="repeat(auto-fill, minmax(30ch, 1fr))" margin="4rem 0 0">
          {posts.nodes.map(post => (
            <Li key={post.frontmatter.meta.permalink}>
              <Link to={post.frontmatter.meta.permalink}>
                <Img
                  {...post.frontmatter.meta.ogImage?.childImageSharp?.fluid}
                  ratio={1 / 2}
                  margin="0 0 2rem"
                />
                <H2 fontSize="3rem" fontWeight="700">{post.frontmatter.title}</H2>
                {post.frontmatter.subtitle && <P margin="2rem 0 0">{post.frontmatter.subtitle}</P>}
                <P fontSize="1.5rem" margin="1rem 0 0">
                  {post.frontmatter.date && `${new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                    year:  'numeric',
                    month: 'long',
                    day:   'numeric',
                  })} · `}{post.timeToRead} min read
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
