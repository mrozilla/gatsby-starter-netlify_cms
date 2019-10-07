// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
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
    mdx
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

export default function PricingContainer({ title, subtitle, mdx, pricing }) {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
        text-align: center;
      `}
    >
      {title && (
        <H1
          css={`
            font-size: 3rem;
            line-height: 1;
            font-weight: 700;
            max-width: 20ch;
            margin: 0 auto;

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
            font-size: 2.5rem;
            line-height: 2.5rem;
            max-width: 50ch;
            margin: 2rem auto 2rem;

            @media screen and (min-width: 1200px) {
              line-height: 3rem;
            }
          `}
        >
          {subtitle}
        </P>
      )}
      {mdx && <MDXRenderer>{mdx}</MDXRenderer>}
      {pricing && (
        <Ul
          css={`
            display: flex;
            justify-content: center;
            margin: 8rem 0 4rem;
          `}
        >
          <Li>
            <Button
              css={`
                padding: 1rem;
                font-weight: 400;
                color: ${frequency === 'monthly' ? 'var(--color-primary)' : ''};
              `}
              onClick={() => setFrequency('monthly')}
            >
              Monthly
            </Button>
            <Button
              css={`
                padding: 1rem;
                font-weight: 400;
                color: ${frequency === 'yearly' ? 'var(--color-primary)' : ''};
              `}
              onClick={() => setFrequency('yearly')}
            >
              Yearly
            </Button>
          </Li>
        </Ul>
      )}
      {pricing && (
        <Ul
          css={`
            grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr));
            grid-gap: 2rem 8rem;
            text-align: initial;
          `}
        >
          {pricing.map((item) => (
            <Li
              key={item.title}
              css={`
                display: flex;
                flex-direction: column;
                padding: 4rem 4rem 2rem;
                background: var(--color-inverse);
                border-radius: 0.5rem;
                box-shadow: inset 0 0 0 2px hsla(var(--hsl-text), 0.05);

                & > a {
                  margin: auto 0 0;
                }
              `}
            >
              <H2
                css={`
                  font-weight: 700;
                  margin: 0 0 4rem;
                `}
              >
                {item.title}
              </H2>
              <P
                css={`
                  margin: 0 0 2rem;
                `}
              >
                <Text
                  css={`
                    font-size: 6rem;
                    font-weight: 700;
                  `}
                >
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
              <Button as={Link} look="primary" to="/pay/">
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
  mdx:      string,
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
  mdx:      '',
  pricing:  [],
};
