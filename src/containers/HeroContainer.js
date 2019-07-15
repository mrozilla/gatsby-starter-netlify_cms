// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Button, Link, Video, Img, Text, Ul, Li } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment HeroFragment on MdxFrontmatterBlocks {
    type
    backgroundImage {
      childImageSharp {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    announcement {
      url
      title
      body
    }
    title
    subtitle
    mdx
    buttons {
      title
      url
      look
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HeroContainer({
  backgroundImage,
  announcement,
  title,
  subtitle,
  mdx,
  buttons,
  video,
}) {
  return (
    <Section
      css={`
        grid-column: 1 / -1;
        position: relative;
        text-align: center;
        padding: var(--block-padding);
        padding-left: var(--width-outside);
        padding-right: var(--width-outside);
        color: ${backgroundImage && 'var(--color-inverse)'};
      `}
    >
      {backgroundImage && (
        <Img
          {...backgroundImage?.childImageSharp?.fluid}
          role="presentation"
          alt=""
          css={`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: -1;
              background-image: var(--gradient-brand);
            }

            & > img {
              object-position: top left;
              mix-blend-mode: luminosity;
              opacity: 0.1;
            }
          `}
        />
      )}
      {video && <Video src={video} />}
      {announcement && (
        <Link
          to={announcement.url}
          css={`
            background-color: hsla(var(${
              backgroundImage ? '--hsl-inverse' : '--hsl-brand-primary'
            }), 0.05);
            border-radius: 999px;
            padding: 0.25rem 1rem 0.25rem 0.25rem;
            display: inline-flex;
            align-items: center;
            line-height: 1;
            margin: 0 0 4rem;

            &::before {
              content: "${announcement.title}";
              font-size: 1.5rem;
              font-weight: 700;
              text-transform: uppercase;
              background-image: var(--gradient-brand);
              color: var(--color-inverse);
              padding: 0.25rem 0.5rem;
              margin: 0 1rem 0 0;
              border-radius: 999px;
            }
          `}
        >
          <Text
            css={`
              color: var(${backgroundImage ? '--color-inverse' : '--color-brand-primary'});
            `}
          >
            {announcement.body}
          </Text>
        </Link>
      )}
      <H1
        css={`
          font-size: 4rem;
          line-height: 1;
          font-weight: 700;
          max-width: 20ch;
          margin: 0 auto;

          @media screen and (min-width: 1200px) {
            font-size: 6rem;
          }

          & ~ p {
            margin: 2rem auto 0;
            max-width: 60ch;
          }
        `}
      >
        {title}
      </H1>
      {subtitle && (
        <P
          css={`
            font-size: 2.5rem;
            line-height: 1;
            max-width: 50ch;
            margin: 2rem auto;

            @media screen and (min-width: 1200px) {
              font-size: 3rem;
            }
          `}
        >
          {subtitle}
        </P>
      )}
      {mdx && <MDXRenderer>{mdx}</MDXRenderer>}
      {buttons && (
        <Ul
          css={`
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin: 4rem -0.5rem 0;
          `}
        >
          {buttons.map(button => (
            <Li
              key={button.url}
              css={`
                margin: 0.5rem;
              `}
            >
              <Button key={button.url} as={Link} to={button.url} look={button.look}>
                {button.title}
              </Button>
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

HeroContainer.propTypes = {
  announcement: shape({
    url:   string.isRequired,
    title: string.isRequired,
    body:  string.isRequired,
  }),
  title:    string.isRequired,
  subtitle: string,
  mdx:      string,
  buttons:  arrayOf(
    shape({
      title: string.isRequired,
      url:   string.isRequired,
      look:  string.isRequired,
    }),
  ),
  // backgroundImage: string, // TODO:
  video: string,
};

HeroContainer.defaultProps = {
  announcement: null,
  subtitle:     '',
  mdx:          '',
  buttons:      [],
  // backgroundImage:    '',
  video:        '',
};
