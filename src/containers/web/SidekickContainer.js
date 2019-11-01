// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { graphql } from 'gatsby';

import { Header, BlockHeader, Section, Ul, BlockColumns } from '~components';

// ─────────────────────────────────────────────────────────────────────────────
// query
// ─────────────────────────────────────────────────────────────────────────────

export const fragment = graphql`
  fragment SidekickFragment on MdxFrontmatterBlocks {
    type
    header {
      ...BlockHeaderFragment
    }
    columns {
      ...BlockColumnsFragment
    }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function SidekickContainer({ header, columns }) {
  return (
    <Section
      css={`
        grid-column: 2;
        text-align: center;

        box-shadow: var(--block-box-shadow);
        background: var(--block-background-color);
        margin: var(--block-margin);
        padding: var(--block-padding);
      `}
    >
      {header && (
        <Header
          css={`
            & > p {
              max-width: 60ch;
              margin: 2rem auto;
            }
          `}
        >
          <BlockHeader header={header} />
        </Header>
      )}
      {columns && (
        <Ul
          css={`
            text-align: initial;

            grid-gap: 8rem;
            align-items: center;
            margin: ${header?.length > 0 && '8rem 0 0'};

            @media screen and (min-width: 900px) {
              grid-template-columns: ${columns.length > 4
            ? 'repeat(auto-fit, minmax(30ch, 1fr))'
            : columns.map((column) => column.width).join(' ')};
            }
          `}
        >
          <BlockColumns columns={columns} />
        </Ul>
      )}
    </Section>
  );
}

SidekickContainer.propTypes = {
  header:  BlockHeader.propTypes.header,
  columns: BlockColumns.propTypes.columns,
};

SidekickContainer.defaultProps = {
  header:  [],
  columns: [],
};
