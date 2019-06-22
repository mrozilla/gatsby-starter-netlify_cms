// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Button, Link, Video, Img, Text } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment HeroFragment on MdxFrontmatterBlocks {
    type
    kicker {
      url
      title
      body
    }
    title
    subtitle
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

export default function HeroContainer({ kicker, title, subtitle, body, buttons, image, video }) {
  return (
    <Section
      gridColumn="1 / -1"
      padding={{
        xs: '5rem 10vw',
        md: '15vh 20vw 10vh',
        lg: '15vh 25vw 10vh',
      }}
      textAlign="center"
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
      {video && <Video src={video} />}
      {kicker && (
        <Link
          to={kicker.url}
          backgroundColor="hsla(var(--hsl-brand-primary), 0.05)"
          borderRadius="999px"
          padding="0.25rem 1rem 0.25rem 0.25rem"
          display="inline-flex"
          alignItems="center"
          lineHeight="1"
          margin="0 0 4rem"
          before={{
            content:         `"${kicker.title}"`,
            fontSize:        '1.5rem',
            fontWeight:      '700',
            textTransform:   'uppercase',
            backgroundImage: 'var(--gradient-brand)',
            color:           'var(--color-inverse)',
            padding:         '0.25rem 0.5rem',
            margin:          '0 0.5rem 0 0',
            borderRadius:    '999px',
          }}
        >
          <Text color="var(--color-brand-primary)">{kicker.body}</Text>
        </Link>
      )}
      <H1
        fontSize={{
          xs: '4rem',
          lg: '6rem',
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
            xs: '2.5rem',
            lg: '3rem',
          }}
          lineHeight="1"
          color={image && 'var(--color-inverse)'}
          margin="0 0 4rem"
        >
          {subtitle}
        </P>
      )}
      {buttons.length > 0
        && buttons.map(button => (
          <Button
            key={button.url}
            as={Link}
            to={button.url}
            look={button.look}
            display="inline-block"
            grouped
          >
            {button.title}
          </Button>
        ))}
    </Section>
  );
}

HeroContainer.propTypes = {
  kicker: shape({
    url:   string.isRequired,
    title: string.isRequired,
    body:  string.isRequired,
  }),
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
  video: string,
};

HeroContainer.defaultProps = {
  kicker:   null,
  subtitle: '',
  body:     '',
  buttons:  [],
  image:    '',
  video:    '',
};
