// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import {
  H1,
  H2,
  Section,
  P,
  Ul,
  Li,
  Icon,
  Button,
  Link,
  Img,
  AppStore,
  View,
  Map,
} from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SidekickFragment on MdxFrontmatterBlocks {
    type
    header {
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
      appStores {
        ios
        android
      }
    }
    columns {
      width
      textAlign
      blocks {
        type
        icon
        tagline
        title
        subtitle
        mdx
        image {
          src {
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          ratio
          alt
        }
        map {
          geo
          zoom
        }
        grid {
          icon
          title
          mdx
          image {
            src {
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            ratio
            alt
          }
        }
        buttons {
          title
          url
          look
        }
        appStores {
          ios
          android
        }
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderHeader(item, i) {
  /* eslint-disable react/no-array-index-key */

  return (
    <Fragment key={i}>
      {item.icon && (
        <Icon
          icon={item.icon}
          css={`
            margin: 0 auto 2rem;
            font-size: 6rem;

            background: var(--color-primary);
            color: var(--color-inverse);
            clip-path: circle();
            padding: 0.25em;
          `}
        />
      )}
      {item.tagline && (
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
          {item.tagline}
        </P>
      )}
      {item.title && (
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
          {item.title}
        </H1>
      )}
      {item.subtitle && (
        <P
          css={`
            margin: 2rem auto 0;
            max-width: 50ch;

            font-size: 2.5rem;
            line-height: 3rem;
          `}
        >
          {item.subtitle}
        </P>
      )}
      {item.mdx && <MDXRenderer>{item.mdx}</MDXRenderer>}
      {item.image && (
        <Img
          {...item.image.src?.childImageSharp?.fluid}
          alt={item.image.alt}
          ratio={item.image.ratio.split('/').reduce((p, c) => p / c)}
          css={`
            &:not(:last-child) {
              margin: 0 0 2rem;
            }
          `}
        />
      )}
      {item.buttons && (
        <Ul
          css={`
            margin: 3rem -0.5rem 0;
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {item.buttons.map((button) => (
            <Li
              key={button.url}
              css={`
                margin: 0.5rem;
              `}
            >
              <Button as={Link} to={button.url} look={button.look}>
                {button.title}
              </Button>
            </Li>
          ))}
        </Ul>
      )}
      {item.appStores && (
        <Ul
          css={`
            margin: 4rem -0.5rem 0;

            display: flex;
            flex-wrap: wrap;
            justify-content: center;

            & > li {
              margin: 0 0.5rem;

              flex: 0 0 16rem;
            }
          `}
        >
          {item.appStores.ios && (
            <Li>
              <Link to={item.appStores.ios}>
                <AppStore os="ios" />
              </Link>
            </Li>
          )}
          {item.appStores.android && (
            <Li>
              <Link to={item.appStores.android}>
                <AppStore os="android" />
              </Link>
            </Li>
          )}
        </Ul>
      )}
    </Fragment>
  );

  /* eslint-enable */
}

function renderColumn(column, i) {
  /* eslint-disable react/no-array-index-key */

  if (column.blocks) {
    return (
      <Li
        key={i}
        css={`
          text-align: ${column.textAlign};
        `}
      >
        {column.blocks.map(
          ({ icon, tagline, title, subtitle, mdx, image, map, grid, buttons, appStores }, j) => (
            <Fragment key={j}>
              {icon && (
                <Icon
                  icon={icon}
                  css={`
                    margin: 0 0 1rem;
                    font-size: 5rem;

                    background: var(--color-primary);
                    color: var(--color-inverse);
                    clip-path: circle();
                    padding: 0.25em;
                  `}
                />
              )}
              {tagline && (
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
              )}
              {title && (
                <H2
                  css={`
                    margin: 1rem 0;
                    max-width: 30ch;

                    font-size: 3rem;
                    line-height: 1;
                    font-weight: 700;

                    &:not(:first-of-type) {
                      margin: 6rem 0 1rem;
                    }

                    @media screen and (min-width: 1200px) {
                      font-size: 4rem;
                    }
                  `}
                >
                  {title}
                </H2>
              )}
              {subtitle && (
                <P
                  css={`
                    margin: 2rem 0;
                    max-width: 50ch;

                    font-size: 2.5rem;
                    line-height: 3rem;

                    &:not(:first-of-type) {
                      margin: 6rem 0 2rem;
                    }
                  `}
                >
                  {subtitle}
                </P>
              )}
              {mdx && <MDXRenderer>{mdx}</MDXRenderer>}
              {image && (
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
              )}
              {map && (
                <Map
                  center={JSON.parse(map?.geo)
                    ?.coordinates?.reverse()
                    ?.join(',')}
                  zoom={map.zoom}
                />
              )}
              {grid && (
                <Ul
                  css={`
                    grid-template-columns: repeat(auto-fit, minmax(20ch, 1fr));
                    grid-gap: 2rem;
                    margin: 4rem 0 0;
                  `}
                >
                  {grid.map((item) => (
                    <Li key={item.title || item.icon || item.image || item.mdx}>
                      {item.icon && (
                        <Icon
                          icon={item.icon}
                          css={`
                            font-size: 4rem;
                            line-height: 1;

                            background: var(--color-primary);
                            color: var(--color-inverse);
                            clip-path: circle();
                            padding: 0.25em;
                          `}
                        />
                      )}
                      {item.image && (
                        <Img
                          {...item.image?.src?.childImageSharp?.fluid}
                          alt={item.title}
                          ratio={image.ratio.split('/').reduce((p, c) => p / c)}
                          css={`
                            margin: 0 25%;
                          `}
                        />
                      )}
                      {item.title && (
                        <H2
                          css={`
                            font-weight: 700;
                          `}
                        >
                          {item.title}
                        </H2>
                      )}
                      {item.mdx && <MDXRenderer>{item.mdx}</MDXRenderer>}
                    </Li>
                  ))}
                </Ul>
              )}
              {buttons && (
                <Ul
                  css={`
                    margin: 3rem -0.5rem 0;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: ${column.textAlign === 'center'
                    ? column.textAlign
                    : `flex-${column.textAlign}`};
                  `}
                >
                  {buttons.map((button) => (
                    <Li
                      key={button.url}
                      css={`
                        margin: 0.5rem;
                      `}
                    >
                      <Button as={Link} to={button.url} look={button.look}>
                        {button.title}
                      </Button>
                    </Li>
                  ))}
                </Ul>
              )}
              {appStores && (
                <Ul
                  css={`
                    margin: 4rem -0.5rem 0;

                    display: flex;
                    flex-wrap: wrap;
                    justify-content: ${column.textAlign === 'center'
                    ? column.textAlign
                    : `flex-${column.textAlign}`};

                    & > li {
                      margin: 0 0.5rem;

                      flex: 0 0 16rem;
                    }
                  `}
                >
                  {appStores.ios && (
                    <Li>
                      <Link to={appStores.ios}>
                        <AppStore os="ios" />
                      </Link>
                    </Li>
                  )}
                  {appStores.android && (
                    <Li>
                      <Link to={appStores.android}>
                        <AppStore os="android" />
                      </Link>
                    </Li>
                  )}
                </Ul>
              )}
            </Fragment>
          ),
        )}
      </Li>
    );
  }

  return null;

  /* eslint-enable */
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SidekickContainer({ header, columns }) {
  return (
    <Section
      css={`
        grid-column: 2;
        text-align: center;

        box-shadow: var(--block-box-shadow);
        background: var(--block-background-color);
        margin: var(--block-margin);
        padding: var(--block-padding);
      `}
    >
      {header && (
        <View
          as="header"
          css={`
            & > p {
              max-width: 60ch;
              margin: 2rem auto;
            }
          `}
        >
          {header.map(renderHeader)}
        </View>
      )}
      {columns && (
        <Ul
          css={`
            text-align: initial;

            grid-gap: 8rem;
            align-items: center;
            margin: ${header?.length > 0 && '8rem 0 0'};

            @media screen and (min-width: 900px) {
              grid-template-columns: ${columns.length > 4
            ? 'repeat(auto-fit, minmax(30ch, 1fr))'
            : columns.map((column) => column.width).join(' ')};
            }
          `}
        >
          {columns.map(renderColumn)}
        </Ul>
      )}
    </Section>
  );
}

SidekickContainer.propTypes = {
  // icon:     string,
  // tagline:  string,
  // title:    string,
  // subtitle: string,
  // mdx:      string,
  columns: arrayOf(
    shape({
      blocks: arrayOf(
        shape({
          type: string.isRequired,
        }),
      ),
    }),
  ),
};

SidekickContainer.defaultProps = {
  // icon:     '',
  // tagline:  '',
  // title:    '',
  // subtitle: '',
  // mdx:      '',
  columns: [],
};
