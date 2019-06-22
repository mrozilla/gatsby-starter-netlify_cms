// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect } from 'react';

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

  useEffect(() => {
    document.addEventListener('visibilitychange', handleInactiveTab);
    return () => document.removeEventListener('visibilitychange', handleInactiveTab);
  });
}
