// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { FaTwitter, FaFacebook, FaFacebookMessenger } from 'react-icons/fa';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';

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
      mdx: code {
        body
      }
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
      mdx,
    },
  },
}) {
  const share = useSocialShare({ text: title, url: location.href });

  return (
    <RootContainer>
      <SEOContainer meta={meta} />
      <Main
        gridGap="4rem"
        padding="20vh var(--width-outside) 10vh"
      >
        <Article
          itemScope
          itemType="http://schema.org/BlogPosting"
          gridColumn={{
            md: '2',
          }}
        >
          <View as="header" margin="0 0 8rem">
            <H1 itemProp="name" margin="0 0 3rem 0">
              <Link to={meta.permalink} itemProp="url" look="tertiary">
                {title}
              </Link>
            </H1>
            {meta.description && (
              <P fontSize="3rem">{meta.description}</P>
            )}
            <Text
              as="time"
              dateTime={new Date(date).toISOString()}
              itemProp="datePublished"
              fontSize="2rem"
            >
              {date}
            </Text>
            {' · '}
            <Text fontSize="2rem">{timeToRead} min read</Text>
          </View>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Article>
        <Aside
          gridColumn="1"
          gridRow={{
            md: '1',
          }}
          position="sticky"
          top="22vh"
          alignSelf="start"
        >
          <Ul gridGap="1rem">
            <Li lineHeight="3rem">
              <Button look="tertiary" padding="0.5rem" onClick={() => share('twitter')}>
                <Icon as={FaTwitter} fontSize="2.5rem" />
              </Button>
            </Li>
            <Li lineHeight="3rem">
              <Button look="tertiary" padding="0.5rem" onClick={() => share('facebook')}>
                <Icon as={FaFacebook} fontSize="2.5rem" />
              </Button>
            </Li>
            <Li lineHeight="3rem">
              <Button look="tertiary" padding="0.5rem" onClick={() => share('messenger')}>
                <Icon as={FaFacebookMessenger} fontSize="2.5rem" />
              </Button>
            </Li>
          </Ul>
        </Aside>
      </Main>
      <HighlightShareContainer location={location} />
    </RootContainer>
  );
}
