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
      <Main gridTemplateColumns="var(--width-outside) 1fr var(--width-outside)" padding="10rem 0 0">
        <Section
          gridColumn="2"
          padding={{
            xs: '5rem var(--width-outside)',
            md: '20vh 0 15vh',
            lg: '20vh 0 15vh',
          }}
          textAlign="center"
        >
          <H1
            fontSize={{
              xs: '6rem',
              lg: '10rem',
            }}
            lineHeight="1"
            fontWeight="700"
            letterSpacing="-0.04em"
            margin="0 0 2rem"
          >
            404
          </H1>
          <P fontSize="5rem" lineHeight="5rem" letterSpacing="-0.025em" margin="0 0 4rem">
            Page not found
          </P>
          <P fontSize="2.5rem">
            Whoops, this page doesn&apos;t exist. Check the links in the menus around, they might help.
            <br />And if they don&apos;t help you can always go back to the{' '}
            <Link to="/" look="primary">
              home page
            </Link>
          </P>
        </Section>
      </Main>
    </RootContainer>
  );
}
