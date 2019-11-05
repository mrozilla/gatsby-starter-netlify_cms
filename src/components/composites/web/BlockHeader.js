// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { arrayOf, shape, string } from 'prop-types';

import Icon from '~components/multimedia/Icon';
import { P } from '~components/text/P';
import { H1 } from '~components/text/HX';
import Img from '~components/multimedia/Img';
import { Ul, Li } from '~components/text/List';
import Link from '~components/interactive/Link';
import AppStore from '~components/multimedia/AppStore';
import Button from '~components/interactive/Button';
import { Text } from '~components/primitives/Text';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  fragment BlockHeaderFragment on MdxFrontmatterBlocksHeader {
    icon
    tagline
    title
    subtitle
    mdx
    buttons {
      title
      url
      look
    }
    image {
      src {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      ratio
      alt
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderAnnouncement({ url, title, body }) {
  const backgroundImage = ''; // TODO: resolve

  return (
    <Link
      to={url}
      css={`
          background: hsla(var(${backgroundImage ? '--hsl-inverse' : '--hsl-primary'}), 0.05);
          border-radius: 999px;
          padding: 0.5rem 1rem 0.5rem 0.5rem;
          display: inline-flex;
          align-items: center;
          line-height: 1;
          margin: 0 0 4rem;

          &:hover {
            background: hsla(var(${backgroundImage ? '--hsl-inverse' : '--hsl-primary'}), 0.1);
          }

          &::before {
            content: "${title}";
            font-size: 1.5rem;
            font-weight: 700;
            text-transform: uppercase;
            background: var(--gradient-brand);
            color: var(--color-inverse);
            padding: 0.25rem 0.5rem;
            margin: 0 1rem 0 0;
            border-radius: 999px;
          }
    `}
    >
      <Text
        css={`
          color: var(${backgroundImage ? '--color-inverse' : '--color-primary'});
        `}
      >
        {body}
      </Text>
    </Link>
  );
}

function renderIcon({ icon }) {
  return (
    <Icon
      icon={icon}
      css={`
        margin: 0 auto 2rem;
        font-size: 6rem;

        background: hsla(var(--hsl-primary), 0.1);
        color: var(--color-primary);
        clip-path: circle();
        padding: 0.25em;
      `}
    />
  );
}

function renderTagline({ tagline }) {
  return (
    <P
      as="span"
      css={`
        color: var(--color-primary);
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 1.5rem;
        font-weight: 700;
      `}
    >
      {tagline}
    </P>
  );
}

function renderTitle({ title }) {
  return (
    <H1
      css={`
        margin: 1rem auto 2rem;
        max-width: 30ch;

        font-size: 3rem;
        line-height: 1;
        font-weight: 700;

        @media screen and (min-width: 1200px) {
          font-size: 4rem;
        }
      `}
    >
      {title}
    </H1>
  );
}

function renderSubtitle({ subtitle }) {
  return (
    <P
      css={`
        margin: 2rem auto 0;
        max-width: 50ch;

        font-size: 2.5rem;
        line-height: 3rem;
      `}
    >
      {subtitle}
    </P>
  );
}

function renderImage({ image }) {
  return (
    <Img
      {...image.src?.childImageSharp?.fluid}
      alt={image.alt}
      ratio={image.ratio.split('/').reduce((p, c) => p / c)}
      css={`
        &:not(:last-child) {
          margin: 0 0 2rem;
        }
      `}
    />
  );
}

function renderButtons({ buttons }) {
  return (
    <Ul
      css={`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin: 4rem -0.5rem 0;
      `}
    >
      {buttons.map((button) => (
        <Li
          key={button.url}
          css={`
            margin: 0.5rem;
          `}
        >
          {button.look === 'appStore' || button.look === 'playStore' ? (
            <Link to={button.url}>
              <AppStore store={button.look} />
            </Link>
          ) : (
            <Button as={Link} to={button.url} look={button.look}>
              {button.title}
            </Button>
          )}
        </Li>
      ))}
    </Ul>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function BlockHeader({ header }) {
  if (header.length === 0) return null;

  return header.map((item, i) => (
    // eslint-disable-next-line react/no-array-index-key
    <Fragment key={i}>
      {item.type === 'announcement' && renderAnnouncement(item)}
      {item.type === 'icon' && renderIcon(item)}
      {item.type === 'tagline' && renderTagline(item)}
      {item.type === 'title' && renderTitle(item)}
      {item.type === 'subtitle' && renderSubtitle(item)}
      {item.type === 'mdx' && <MDXRenderer>{item.mdx}</MDXRenderer>}
      {item.type === 'image' && renderImage(item)}
      {item.type === 'buttons' && renderButtons(item)}
    </Fragment>
  ));
}

BlockHeader.propTypes = {
  header: arrayOf(
    shape({
      announcement: shape({
        url:   string,
        title: string,
        body:  string,
      }),
      subtitle: string,
      mdx:      string,
      buttons:  arrayOf(
        shape({
          title: string.isRequired,
          url:   string.isRequired,
          look:  string.isRequired,
        }),
      ),
    }),
  ),
};

BlockHeader.defaultProps = {
  header: [],
};