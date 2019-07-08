// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf, object } from 'prop-types';

import { H1, H2, Section, P, Ul, Li, Icon, Button, Link, Img, View } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SidekickFragment on MdxFrontmatterBlocks {
    type
    icon
    title
    subtitle
    image {
      childImageSharp {
        fluid(maxWidth: 600) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    layout
    blocks {
      type
      list {
        icon
        title
        body
        image {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
      layout
      buttons {
        title
        url
        look
      }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderBlocks(blocks, layout) {
  return blocks.map((block) => {
    if (block.type === 'list') {
      return (
        <Ul
          key={`${block.type}-${block.layout}`}
          css={`
            grid-template-columns: ${block.layout === 'grid'
              && `repeat(auto-fit, minmax(${layout === 'full' ? '30rem' : '16ch'}, 1fr))`};
            grid-gap: ${block.layout === 'grid'
                ? `${layout === 'full' ? '3rem 4rem' : '3rem 1rem'}`
                : '1rem'};
            margin: ${block.layout === 'grid' ? '4rem 0 0' : '2rem 0 0'};
            list-style: ${block.layout === 'list' ? 'disc' : 'none'};
            padding: ${block.layout === 'list' && '0 0 0 1em'};
          `}
        >
          {block.list.map(item => (
            <Li key={item.title || item.icon || item.image || item.body}>
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
                  {...item.image?.childImageSharp?.fluid}
                  alt={item.title}
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
              {item.body && (
                <P
                  css={`
                    line-height: 2.5rem;
                  `}
                >
                  {item.body}
                </P>
              )}
            </Li>
          ))}
        </Ul>
      );
    }

    if (block.type === 'buttons') {
      return (
        <Ul
          key={block?.buttons[0]?.url}
          css={`
            margin: 3rem -0.5rem 0;
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {block.buttons.map(button => (
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
      );
    }

    return null;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SidekickContainer({ icon, title, subtitle, image, layout, blocks }) {
  const gridTemplateColumns = {
    left:  '3fr 4fr',
    right: '4fr 3fr',
    full:  '1fr',
  };

  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 4rem 8rem;
        align-items: center;

        padding: var(--block-padding) 0;
        box-shadow: 0 -1px 0 0 hsla(var(--hsl-text), 0.1);
        text-align: ${layout === 'full' ? 'center' : ''};

        @media screen and (min-width: 1200px) {
          grid-template-columns: ${gridTemplateColumns[layout]};
        }
      `}
    >
      {image && (
        <Img
          {...image?.childImageSharp?.fluid}
          alt={title || subtitle}
          ratio={2 / 3}
          css={`
            & > img {
              object-fit: contain;
            }

            @media screen and (min-width: 1200px) {
              order: ${layout === 'left' ? '2' : ''};
            }
          `}
        />
      )}
      {
        <View>
          {icon && (
            <Icon
              icon={icon}
              css={`
                font-size: 6rem;
                color: var(--color-brand-primary);
                margin: 0 0 2rem;
              `}
            />
          )}
          <H1
            css={`
              font-size: 3rem;
              line-height: 1;
              font-weight: 700;
              max-width: 30ch;
              margin: 0 auto;

              @media screen and (min-width: 1200px) {
                font-size: 4rem;
              }
            `}
          >
            {title}
          </H1>
          {subtitle && (
            <P
              css={`
                font-size: 2.5rem;
                line-height: 2.5rem;
                max-width: 50ch;
                margin: 2rem auto 0;

                @media screen and (min-width: 1200px) {
                  line-height: 4rem;
                }
              `}
            >
              {subtitle}
            </P>
          )}
          {blocks && renderBlocks(blocks, layout)}
        </View>
      }
    </Section>
  );
}

SidekickContainer.propTypes = {
  icon:     string,
  title:    string.isRequired,
  subtitle: string,
  layout:   string,
  blocks:   arrayOf(
    shape({
      type: string.isRequired,
    }),
  ),
  image: shape({
    childImageSharp: object,
  }),
};

SidekickContainer.defaultProps = {
  icon:     '',
  subtitle: '',
  layout:   'left',
  blocks:   [],
  image:    null,
};
