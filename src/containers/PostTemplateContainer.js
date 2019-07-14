// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { RootContainer, SEOContainer, HighlightShareContainer } from '~containers';
import { Main, Article, Aside, Link, H1, P, Ul, Li, Button, Icon, View, Text } from '~components';
import { useSocialShare } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  query($path: String!) {
    article: mdx(frontmatter: { meta: { permalink: { eq: $path } } }) {
      timeToRead
      frontmatter {
        ...SEOFragment
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PostTemplateContainer({
  location,
  data: {
    article: {
      timeToRead,
      frontmatter: { title, date, meta },
      body,
    },
  },
}) {
  const share = useSocialShare({ text: title, url: location.href });

  return (
    <RootContainer>
      <SEOContainer meta={meta} />
      <Main
        css={`
          grid-gap: 4rem;
          padding: 16rem var(--width-outside) 16rem;

          @media screen and (min-width: 1200px) {
            grid-template-columns: auto 1fr;
          }
        `}
      >
        <Article itemScope itemType="http://schema.org/BlogPosting">
          <View
            as="header"
            css={`
              margin: 0 0 8rem;
            `}
          >
            <H1
              itemProp="name"
              css={`
                margin: 0 0 3rem 0;
              `}
            >
              <Link to={meta.permalink} itemProp="url" look="tertiary">
                {title}
              </Link>
            </H1>
            {meta.description && (
              <P
                css={`
                  font-size: 3rem;
                `}
              >
                {meta.description}
              </P>
            )}
            <Text
              as="time"
              dateTime={new Date(date).toISOString()}
              itemProp="datePublished"
              css={`
                font-size: 2rem;
              `}
            >
              {date}
            </Text>
            {' · '}
            <Text
              css={`
                font-size: 2rem;
              `}
            >
              {timeToRead} min read
            </Text>
          </View>
          <MDXRenderer>{body}</MDXRenderer>
        </Article>
        <Aside
          css={`
            grid-column: 1;
            position: sticky;
            top: 22vh;
            align-self: start;

            @media screen and (min-width: 900px) {
              grid-row: 1;
            }
          `}
        >
          <Ul
            css={`
              grid-gap: 1rem;
            `}
          >
            <Li
              css={`
                line-height: 3rem;
              `}
            >
              <Button
                look="tertiary"
                css={`
                  padding: 0.5rem;
                `}
                onClick={() => share('twitter')}
              >
                <Icon
                  icon="FaTwitter"
                  css={`
                    font-size: 2.5rem;
                  `}
                />
              </Button>
            </Li>
            <Li
              css={`
                line-height: 3rem;
              `}
            >
              <Button
                look="tertiary"
                css={`
                  padding: 0.5rem;
                `}
                onClick={() => share('facebook')}
              >
                <Icon
                  icon="FaFacebook"
                  css={`
                    font-size: 2.5rem;
                  `}
                />
              </Button>
            </Li>
            <Li
              css={`
                line-height: 3rem;
              `}
            >
              <Button
                look="tertiary"
                css={`
                  padding: 0.5rem;
                `}
                onClick={() => share('messenger')}
              >
                <Icon
                  icon="FaFacebookMessenger"
                  css={`
                    font-size: 2.5rem;
                  `}
                />
              </Button>
            </Li>
          </Ul>
        </Aside>
      </Main>
      <HighlightShareContainer location={location} />
    </RootContainer>
  );
}
