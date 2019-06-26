// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

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
          gridTemplateColumns={
            block.layout === 'grid'
            && `repeat(auto-fit, minmax(${layout === 'full' ? '30rem' : '16ch'}, 1fr))`
          }
          gridGap={
            block.layout === 'grid' ? `${layout === 'full' ? '3rem 4rem' : '3rem 1rem'}` : '1rem'
          }
          margin={block.layout === 'grid' ? '4rem 0 0' : '2rem 0 0'}
          listStyle={block.layout === 'list' ? 'disc' : 'none'}
          padding={block.layout === 'list' && '0 0 0 1em'}
        >
          {block.list.map(item => (
            <Li key={item.title}>
              {item.icon && (
                <Icon
                  icon={item.icon}
                  fontSize="4rem"
                  lineHeight="1"
                  color="var(--color-brand-primary)"
                />
              )}
              {item.image && (
                <Img {...item.image?.childImageSharp?.fluid} alt={item.title} margin="0 25%" />
              )}
              {item.title && <H2 fontWeight="700">{item.title}</H2>}
              {item.body && <P lineHeight="2.5rem">{item.body}</P>}
            </Li>
          ))}
        </Ul>
      );
    }

    if (block.type === 'buttons') {
      return (
        <Ul key={block?.buttons[0]?.url} margin="3rem -0.5rem 0" display="flex" flexWrap="wrap">
          {block.buttons.map(button => (
            <Li key={button.url} margin="0.5rem">
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
      gridColumn="2"
      display="grid"
      gridTemplateColumns={{
        xs: '1fr',
        lg: gridTemplateColumns[layout],
      }}
      gridGap="4rem 8rem"
      alignItems="center"
      padding={{
        xs: '5rem 10vw',
        md: '15vh 0 10vh',
        lg: '15vh 0 10vh',
      }}
      boxShadow="0 -1px 0 0 hsla(var(--hsl-text),0.1)"
      textAlign={layout === 'full' ? 'center' : ''}
    >
      {image && (
        <Img
          {...image?.childImageSharp?.fluid}
          ratio={2 / 3}
          order={{
            lg: layout === 'left' ? '2' : '',
          }}
          imgProps={{
            objectFit: 'contain',
          }}
        />
      )}
      {
        <View>
          {icon && (
            <Icon
              icon={icon}
              fontSize="6rem"
              color="var(--color-brand-primary)"
              margin="0 0 2rem"
            />
          )}
          <H1
            fontSize={{
              xs: '3rem',
              lg: '4rem',
            }}
            lineHeight="1"
            fontWeight="700"
            maxWidth="30ch"
            margin="0 auto"
          >
            {title}
          </H1>
          {subtitle && (
            <P
              fontSize="2.5rem"
              lineHeight={{
                xs: '2.5rem',
                lg: '3rem',
              }}
              maxWidth="50ch"
              margin="2rem auto 0"
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
  image: string,
};

SidekickContainer.defaultProps = {
  icon:     '',
  subtitle: '',
  layout:   'left',
  image:    '',
  blocks:   [],
};
