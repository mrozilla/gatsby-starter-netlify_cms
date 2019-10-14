// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';

import { Button, Icon } from '~components';

import { useLocalStorage } from '~utils';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function DarkModeContainer({ ...rest }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    const hsl = {
      light: {
        text:    '200, 5%, 35%',
        bg:      '0, 0%, 99%',
        dark:    '0, 0%, 5%',
        inverse: '0, 0%, 100%',
      },
      dark: {
        text:    '200, 5%, 60%',
        bg:      '0, 0%, 10%',
        dark:    '0, 0%, 95%',
        inverse: '0, 0%, 5%',
      },
    };

    const selectedTheme = hsl[theme] || hsl.light;

    document.documentElement.style.setProperty('--hsl-text', selectedTheme.text);
    document.documentElement.style.setProperty('--hsl-bg', selectedTheme.bg);
    document.documentElement.style.setProperty('--hsl-dark', selectedTheme.dark);
    document.documentElement.style.setProperty('--hsl-inverse', selectedTheme.inverse);
  }, [theme]);

  return (
    <Button
      title="Toggle dark mode"
      look="tertiary"
      css={`
        padding: 0;
      `}
      onClick={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
      {...rest}
    >
      <Icon icon={theme === 'light' ? 'FaMoon' : 'FaSun'} />
    </Button>
  );
}
