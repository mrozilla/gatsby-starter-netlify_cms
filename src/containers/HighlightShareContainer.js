// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react';
import { FaTwitter, FaFacebook, FaFacebookMessenger } from 'react-icons/fa';

import { Aside, Icon, Button, Ul, Li } from '~components';
import { useSocialShare, useSelection } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function HighlightShareContainer({ location }) {
  const [selectedText, selectedTextPosition] = useSelection();
  const share = useSocialShare({ text: selectedText, url: location.href });

  return (
    selectedText && (
      <Aside
        display="flex"
        justifyContent="center"
        position="absolute"
        top={`calc(${selectedTextPosition.top + window.pageYOffset}px - 5rem)`}
        left={selectedTextPosition.left}
        width={selectedTextPosition.width}
      >
        <Ul
          position="relative"
          gridAutoFlow="column"
          borderRadius="0.5rem"
          padding="0 0.5rem"
          backgroundColor="var(--color-text)"
          boxShadow="0 0.5rem 1rem hsla(var(--hsl-text), 0.25)"
          after={{
            content:     "''",
            position:    'absolute',
            borderStyle: 'solid',
            borderWidth: '0.5rem',
            marginLeft:  '-0.5rem',
            top:         '100%',
            left:        '50%',

            borderColor: 'var(--color-text) transparent transparent transparent',
          }}
        >
          <Li lineHeight="3rem">
            <Button look="tertiary-inverse" padding="0.5rem" onClick={() => share('twitter')}>
              <Icon as={FaTwitter} fontSize="2.5rem" />
            </Button>
          </Li>
          <Li lineHeight="3rem">
            <Button look="tertiary-inverse" padding="0.5rem" onClick={() => share('facebook')}>
              <Icon as={FaFacebook} fontSize="2.5rem" />
            </Button>
          </Li>
          <Li lineHeight="3rem">
            <Button look="tertiary-inverse" padding="0.5rem" onClick={() => share('messenger')}>
              <Icon as={FaFacebookMessenger} fontSize="2.5rem" />
            </Button>
          </Li>
        </Ul>
      </Aside>
    )
  );
}
