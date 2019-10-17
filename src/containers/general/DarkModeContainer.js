// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from 'react';

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
    <input
      type="checkbox"
      title="Toggle dark mode"
      aria-label="Toggle dark mode"
      css={`
        --size: 1.75rem;

        appearance: none;
        outline: none;
        cursor: pointer;

        width: var(--size);
        height: var(--size);
        box-shadow: inset calc(var(--size) * 0.33) calc(var(--size) * -0.25) 0;
        border-radius: 999px;
        transition: all 500ms;

        &:checked {
          --ray-size: calc(var(--size) * -0.4);
          --offset-orthogonal: calc(var(--size) * 0.65);
          --offset-diagonal: calc(var(--size) * 0.45);

          transform: scale(0.75);
          box-shadow: inset 0 0 0 var(--size),
            calc(var(--offset-orthogonal) * -1) 0 0 var(--ray-size),
            var(--offset-orthogonal) 0 0 var(--ray-size),
            0 calc(var(--offset-orthogonal) * -1) 0 var(--ray-size),
            0 var(--offset-orthogonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) calc(var(--offset-diagonal) * -1) 0 var(--ray-size),
            var(--offset-diagonal) var(--offset-diagonal) 0 var(--ray-size),
            calc(var(--offset-diagonal) * -1) var(--offset-diagonal) 0 var(--ray-size),
            var(--offset-diagonal) calc(var(--offset-diagonal) * -1) 0 var(--ray-size);
        }

        &:hover {
          color: var(--color-primary);
        }
      `}
      checked={theme === 'dark'}
      onChange={({ target }) => setTheme(target.checked ? 'dark' : 'light')}
      {...rest}
    />
  );
}
