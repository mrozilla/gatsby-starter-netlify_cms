// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { arrayOf, shape, string } from 'prop-types';

import Icon from '~components/multimedia/Icon';
import { P } from '~components/text/P';
import { H2 } from '~components/text/HX';
import Img from '~components/multimedia/Img';
import { Ul, Li } from '~components/text/List';
import Link from '~components/interactive/Link';
import AppStore from '~components/multimedia/AppStore';
import Button from '~components/interactive/Button';
import Map from '~components/multimedia/Map';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const query = graphql`
  fragment BlockColumnsFragment on MdxFrontmatterBlocksColumns {
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
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function BlockColumns({ columns }) {
  if (columns.length === 0) return null;

  return columns.map((column, i) => (
    <Li
      key={i} // eslint-disable-line react/no-array-index-key
      css={`
        text-align: ${column.textAlign};
      `}
    >
      {column.blocks.map(
        ({ icon, tagline, title, subtitle, mdx, image, map, grid, buttons }, j) => (
          // eslint-disable-next-line react/no-array-index-key
          <Fragment key={j}>
            {icon && (
              <Icon
                icon={icon}
                css={`
                  margin: 0 0 1rem;
                  font-size: 6rem;

                  background: hsla(var(--hsl-primary), 0.1);
                  color: var(--color-primary);
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

                          background: hsla(var(--hsl-primary), 0.1);
                          color: var(--color-primary);
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
            )}
          </Fragment>
        ),
      )}
    </Li>
  ));
}

BlockColumns.propTypes = {
  columns: arrayOf(
    shape({
      blocks:    arrayOf(shape({ type: string.isRequired })),
      textAlign: string,
    }),
  ),
};

BlockColumns.defaultProps = {
  columns: [],
};
