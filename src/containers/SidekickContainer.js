// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { H1, H2, Section, P, Ul, Li, Icon, Button, Link, Img, AppStore } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SidekickFragment on MdxFrontmatterBlocks {
    type
    icon
    tagline
    title
    subtitle
    mdx
    columns {
      width
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

function renderColumn(column, i) {
  /* eslint-disable react/no-array-index-key */

  if (column.blocks) {
    return (
      <Li key={i}>
        {column.blocks.map(
          ({ icon, tagline, title, subtitle, mdx, image, grid, buttons, appStores }, j) => (
            <Fragment key={j}>
              {icon && (
                <Icon
                  icon={icon}
                  css={`
                    margin: 0 0 1rem;
                    font-size: 5rem;
                    color: var(--color-brand-primary);
                  `}
                />
              )}
              {tagline && (
                <P
                  as="span"
                  css={`
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
                    margin: 0 0 2rem;
                  `}
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
                  {grid.map(item => (
                    <Li key={item.title || item.icon || item.image || item.mdx}>
                      {item.icon && (
                        <Icon
                          icon={item.icon}
                          css={`
                            font-size: 4rem;
                            line-height: 1;
                            color: var(--color-brand-primary);
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
                  `}
                >
                  {buttons.map(button => (
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
                    margin: 4rem 0 0;

                    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
                    grid-gap: 1rem;
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

export default function SidekickContainer({ icon, tagline, title, subtitle, mdx, columns }) {
  return (
    <Section
      css={`
        grid-column: 2;
        padding: var(--block-padding) 0;
        text-align: center;
        box-shadow: inset 0 2px 0 0 hsla(var(--hsl-text), 0.05);
      `}
    >
      {icon && (
        <Icon
          icon={icon}
          css={`
            display: block;
            margin: 0 auto 2rem;

            font-size: 6rem;
            color: var(--color-brand-primary);
          `}
        />
      )}
      {tagline && (
        <P
          as="span"
          css={`
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
        <H1
          css={`
            margin: 1rem auto 0;
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
      )}
      {subtitle && (
        <P
          css={`
            margin: 2rem auto;
            max-width: 50ch;

            font-size: 2.5rem;
            line-height: 3rem;
          `}
        >
          {subtitle}
        </P>
      )}
      {mdx && <MDXRenderer>{mdx}</MDXRenderer>}
      {columns && (
        <Ul
          css={`
            text-align: initial;

            grid-gap: 8rem;
            align-items: center;
            margin: ${(icon || tagline || title || subtitle || mdx) && '8rem 0 0'};

            @media screen and (min-width: 900px) {
              grid-template-columns: ${columns.map(column => column.width).join(' ')};
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
  icon:     string,
  tagline:  string,
  title:    string,
  subtitle: string,
  mdx:      string,
  columns:  arrayOf(
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
  icon:     '',
  tagline:  '',
  title:    '',
  subtitle: '',
  mdx:      '',
  columns:  [],
};
