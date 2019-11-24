// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { shape, string, arrayOf } from 'prop-types';

import { Section, BlockHeader, Header, P, Ul, Li, Link, H2, Text, Button } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment PricingFragment on MdxFrontmatterBlocks {
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
    }
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

export default function PricingContainer({ header, pricing }) {
  const [frequency, setFrequency] = useState('monthly');

  return (
    <Section
      css={`
        grid-column: 2;
        display: grid;
        padding: var(--block-padding);
        box-shadow: var(--block-box-shadow);
      `}
    >
      <Header
        css={`
          text-align: center;
        `}
      >
        {header && <BlockHeader header={header} />}
        {pricing && (
          <Ul
            css={`
              display: flex;
              justify-content: center;
              margin: 4rem 0 4rem;
            `}
          >
            <Li>
              <Button
                look={frequency === 'monthly' ? 'primary' : 'secondary'}
                css={`
                  padding: 1rem 4rem;
                  font-size: 1.75rem;
                  border-radius: 0.5rem 0 0 0.5rem;
                `}
                onClick={() => setFrequency('monthly')}
              >
                Monthly
              </Button>
              <Button
                look={frequency === 'yearly' ? 'primary' : 'secondary'}
                css={`
                  padding: 1rem 4rem;
                  font-size: 1.75rem;
                  border-radius: 0 0.5rem 0.5rem 0;
                `}
                onClick={() => setFrequency('yearly')}
              >
                Yearly
              </Button>
            </Li>
          </Ul>
        )}
      </Header>
      {pricing && (
        <Ul
          css={`
            grid-template-columns: repeat(auto-fit, minmax(25ch, 1fr));
            grid-gap: 2rem;
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
                    style: 'currency',
                    currency: item.currency,
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
  header: BlockHeader.propTypes.header,
  pricing: arrayOf(
    shape({
      name: string,
      url: string,
      // image:
    }),
  ),
};

PricingContainer.defaultProps = {
  header: [],
  pricing: [],
};
