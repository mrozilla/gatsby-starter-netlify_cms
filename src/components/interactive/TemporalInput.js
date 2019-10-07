// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import { string } from 'prop-types';

import { Input } from '~components/primitives/Input';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

export default function TemporalInput({ type, value, ...rest }) {
  const [isPlaceholder, setIsPlaceholder] = useState(value === '');

  const handlers = {
    onFocus: () => setIsPlaceholder(false),
    onBlur:  () => {
      if (!value) {
        setIsPlaceholder(true);
      }
    },
  };

  return <Input type={isPlaceholder ? 'text' : type} {...handlers} value={value} {...rest} />;
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
