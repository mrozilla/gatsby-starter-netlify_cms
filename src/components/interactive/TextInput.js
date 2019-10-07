// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { forwardRef } from 'react';
import { func } from 'prop-types';

import { Input } from '~components/primitives/Input';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

const TextInput = forwardRef(({ onChange, ...rest }, ref) => {
  const handleChange = (event) => {
    if (event.target.type === 'url') {
      // intentional check for state of one slash deleted
      if (event.target.value === 'https:/') {
        event.target.value = ''; // eslint-disable-line no-param-reassign
        return onChange(event);
      }

      if (!event.target.value.startsWith('https://')) {
        event.target.value = `https://${event.target.value}`; // eslint-disable-line no-param-reassign
        return onChange(event);
      }
    }

    return onChange(event);
  };

  return <Input ref={ref} onChange={handleChange} {...rest} />;
});

TextInput.propTypes = {
  onChange: func,
};
TextInput.defaultProps = {
  onChange: () => null,
};

export default TextInput;
