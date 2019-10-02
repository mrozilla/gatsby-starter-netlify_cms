// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { string, node } from 'prop-types';
import { Link as GatsbyLink } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-analytics';
import styled, { css } from 'styled-components';

// ─────────────────────────────────────────────────────────────────────────────
// helpers
// ─────────────────────────────────────────────────────────────────────────────

const StyledLink = styled.a`
  outline: none;

  transition: all 250ms;

  /* &[aria-current] {
    font-weight: 700; /* TODO: investigate if better styling
  } */

  ${({ look }) => {
    if (look === 'primary') {
      return css`
        color: var(--color-primary);
        text-decoration: underline var(--color-primary);
      `;
    }
    if (look === 'secondary') {
      return css`
        color: var(--color-primary);
        &:hover,
        &:focus,
        &:active {
          text-decoration: underline var(--color-primary);
        }
      `;
    }
    if (look === 'tertiary') {
      return css`
        &:hover,
        &:focus,
        &:active {
          color: var(--color-primary);
          text-decoration: underline var(--color-primary);
        }
      `;
    }

    return null;
  }};
`;

const parseLink = (link) => {
  if (link.startsWith('www.')) return `https://${link}`;
  if (!link.startsWith('mailto:') && link.includes('@')) return `mailto:${link}`;
  if (!link.startsWith('tel:') && link.includes('+')) return `tel:${link}`;
  return link;
};

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function Link({ href, to, children, ...rest }) {
  const link = href || to || '';

  if (['http', 'mailto:', 'tel:', 'www.'].some(t => link.includes(t))) {
    return (
      <StyledLink
        as={OutboundLink}
        href={parseLink(link)}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </StyledLink>
    );
  }
  return (
    <StyledLink as={GatsbyLink} to={link} {...rest}>
      {children}
    </StyledLink>
  );
}

Link.propTypes = {
  children: node.isRequired,
  href:     string,
  to:       string,
};
Link.defaultProps = {
  href: null,
  to:   null,
};
