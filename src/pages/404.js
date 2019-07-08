// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { Main, Section, H1, P, Link } from '~components';
import { RootContainer } from '~containers';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function ErrorNotFoundPage() {
  return (
    <RootContainer>
      <Main
        css={`
          grid-template-columns: var(--width-outside) 1fr var(--width-outside);
          padding: 10rem 0 0;
        `}
      >
        <Section
          css={`
            grid-column: 2;
            padding: 5rem var(--width-outside);
            text-align: center;

            @media screen and (min-width: 900px) {
              padding: 20vh 0 15vh;
            }
          `}
        >
          <H1
            css={`
              font-size: 6rem;
              line-height: 1;
              font-weight: 700;
              letter-spacing: -0.04em;
              margin: 0 0 2rem;

              @media screen and (min-width: 1200px) {
                font-size: 10rem;
              }
            `}
          >
            404
          </H1>
          <P
            css={`
              font-size: 5rem;
              line-height: 5rem;
              letter-spacing: -0.025em;
              margin: 0 0 4rem;
            `}
          >
            Page not found
          </P>
          <P
            css={`
              font-size: 2.5rem;
            `}
          >
            Whoops, this page doesn&apos;t exist. Check the links in the menus around, they might
            help.
            <br />
            And if they don&apos;t help you can always go back to the{' '}
            <Link to="/" look="primary">
              home page
            </Link>
          </P>
        </Section>
      </Main>
    </RootContainer>
  );
}
