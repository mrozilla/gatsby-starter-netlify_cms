// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { string } from 'prop-types';

import { Input } from '~components/primitives/Input';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function TemporalInput({ type, ...rest }) {
  const [isPlaceholder, setIsPlaceholder] = useState(rest.value === '');

  const handlers = {
    onFocus: () => setIsPlaceholder(false),
    onBlur:  () => {
      if (!rest.value) {
        setIsPlaceholder(true);
      }
    },
  };

  return <Input {...handlers} type={isPlaceholder ? 'text' : type} {...rest} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// propTypes
// ─────────────────────────────────────────────────────────────────────────────

TemporalInput.propTypes = {
  type:  string.isRequired,
  value: string,
};
TemporalInput.defaultProps = {
  value: '',
};
