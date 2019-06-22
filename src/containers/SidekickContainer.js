// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { FaRegCheckCircle } from 'react-icons/fa';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Ul, Li, Icon, Button, Link, Video, Img, Text, View } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SidekickFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    layout
    blocks {
      type
      list {
        title
      }
      # buttons {
      #   title
      #   url
      #   look
      # }
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

function renderBlocks(blocks) {
  return blocks.map((block) => {
    if (block.type === 'list') {
      return (
        <Ul>
          {block.list.map(item => (
            <Li fontSize="2.5rem">
              <Icon
                as={FaRegCheckCircle}
                fontSize="2rem"
                margin="0 1rem 0 0"
                color="var(--color-brand-primary)"
              />
              {item.title}
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

export default function SidekickContainer({ title, subtitle, layout, image, blocks }) {
  return (
    <Section
      gridColumn="2"
      display="grid"
      gridTemplateColumns={{
        xs: '1fr',
        lg: layout === 'left' ? '2fr 3fr' : '3fr 2fr',
      }}
      padding={{
        xs: '5rem 10vw',
        md: '15vh 0 10vh',
        lg: '15vh 0 10vh',
      }}
      boxShadow="0 1px 0 0 hsla(var(--hsl-text),0.1)"
    >
      {image && (
        <Img
          {...image?.childImageSharp?.fluid}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          zIndex="-1"
          role="presentation"
          imgProps={{
            objectPosition: 'top left',
            mixBlendMode:   'luminosity',
            opacity:        '0.1',
          }}
          after={{
            content:         '""',
            position:        'absolute',
            width:           '100%',
            height:          '100%',
            top:             '0',
            left:            '0',
            zIndex:          '-1',
            backgroundImage: 'var(--gradient-brand)',
          }}
        />
      )}
      {
        <View gridColumn={layout === 'left' ? '1' : '2'}>
          <H1
            fontSize={{
              xs: '3rem',
              lg: '4rem',
            }}
            lineHeight="1"
            fontWeight="700"
            color={image && 'var(--color-inverse)'}
            margin="0 0 2rem"
          >
            {title}
          </H1>
          {subtitle && (
            <P
              fontSize={{
                xs: '2rem',
                lg: '2.5rem',
              }}
              lineHeight={{
                xs: '2.5rem',
                lg: '3rem',
              }}
              color={image && 'var(--color-inverse)'}
              margin="0 0 2rem"
            >
              {subtitle}
            </P>
          )}
          {blocks && renderBlocks(blocks)}
        </View>
      }
    </Section>
  );
}

SidekickContainer.propTypes = {
  title:    string.isRequired,
  subtitle: string,
  body:     string,
  buttons:  arrayOf(
    shape({
      title: string.isRequired,
      url:   string.isRequired,
      look:  string.isRequired,
    }),
  ),
  image: string,
};

SidekickContainer.defaultProps = {
  subtitle: '',
  body:     '',
  buttons:  [],
  image:    '',
};
