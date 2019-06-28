// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { shape, string, arrayOf } from 'prop-types';

import { H1, Section, P, Ul, Li, Link, H2, Text, Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment PricingFragment on MdxFrontmatterBlocks {
    type
    title
    subtitle
    # body
    pricing {
      title
      price {
        monthly
        yearly
      }
      currency
      mdx
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function PricingContainer({ title, subtitle, pricing }) {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <Section
      gridColumn="2"
      display="grid"
      padding={{
        xs: '5rem 0',
        md: '10vh 0',
      }}
      boxShadow="0 -1px 0 0 hsla(var(--hsl-text),0.1)"
    >
      {title && (
        <H1
          fontSize={{
            xs: '3rem',
            lg: '4rem',
          }}
          lineHeight="1"
          fontWeight="700"
          textAlign="center"
          maxWidth="20ch"
          margin="0 auto"
        >
          {title}
        </H1>
      )}
      {subtitle && (
        <P
          fontSize="2.5rem"
          lineHeight={{
            xs: '2.5rem',
            lg: '3rem',
          }}
          textAlign="center"
          margin="2rem 0 0"
        >
          {subtitle}
        </P>
      )}
      {pricing && (
        <Ul display="flex" justifyContent="center" margin="8rem 0 4rem">
          <Li>
            <Button
              padding="1rem"
              fontWeight="400"
              color={frequency === 'monthly' ? 'var(--color-brand-primary)' : ''}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </Button>
            <Button
              padding="1rem"
              fontWeight="400"
              color={frequency === 'yearly' ? 'var(--color-brand-primary)' : ''}
              onClick={() => setFrequency('yearly')}
            >
              Yearly
            </Button>
          </Li>
        </Ul>
      )}
      {pricing && (
        <Ul gridTemplateColumns="repeat(auto-fit, minmax(25ch, 1fr))" gridGap="2rem 8rem">
          {pricing.map(item => (
            <Li
              display="flex"
              flexDirection="column"
              padding="4rem 4rem 2rem"
              backgroundColor="var(--color-inverse)"
              borderRadius="0.5rem"
              boxShadow="inset 0 0 0 1px hsla(var(--hsl-text), 0.1)"
            >
              <H2 fontWeight="700" margin="0 0 4rem">
                {item.title}
              </H2>
              <P margin="0 0 2rem">
                <Text fontSize="6rem" fontWeight="700">
                  {new Intl.NumberFormat('en-GB', {
                    style:                 'currency',
                    currency:              item.currency,
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0,
                  }).format(item.price[frequency])}
                </Text>{' '}
                / {frequency}
              </P>
              <MDXRenderer>{item.mdx}</MDXRenderer>
              <Button as={Link} look="primary" to="/pay/" width="100%" margin="auto 0 0">
                Buy
              </Button>
            </Li>
          ))}
        </Ul>
      )}
    </Section>
  );
}

PricingContainer.propTypes = {
  title:    string,
  subtitle: string,
  pricing:  arrayOf(
    shape({
      name: string,
      url:  string,
      // image:
    }),
  ),
};

PricingContainer.defaultProps = {
  title:    '',
  subtitle: '',
  pricing:  [],
};
