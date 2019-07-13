// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import useEventListener from './useEventListener';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function useInactiveTab() {
  const handleInactiveTab = (evt) => {
    if (evt.target.visibilityState === 'hidden') {
      document.title = `😴 ${document.title}`;
    }

    if (evt.target.visibilityState === 'visible') {
      document.title = document.title.substr(2);
    }
  };

  useEventListener('visibilitychange', handleInactiveTab);
}
