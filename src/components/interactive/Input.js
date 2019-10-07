// ─────────────────────────────────────────────────────────────────────────────
// import
// ─────────────────────────────────────────────────────────────────────────────

import React, { forwardRef } from 'react';
import { string, arrayOf, shape } from 'prop-types';

import { Text } from '~components/primitives/Text';

import Button from '~components/interactive/Button';
import { Checkbox } from '~components/interactive/Checkbox';
import { Fieldset } from '~components/interactive/Fieldset';
import { Radio } from '~components/interactive/Radio';
import { Select } from '~components/interactive/Select';
import TextInput from '~components/interactive/TextInput';
import PasswordInput from '~components/interactive/PasswordInput';
import TemporalInput from '~components/interactive/TemporalInput';
import TextAreaInput from '~components/interactive/TextAreaInput';

import { Label } from '~components/text/Label';
import { Legend } from '~components/text/Legend';
import { Tooltip } from '~components/text/Tooltip';
import { Error } from '~components/text/Error';

import Icon from '~components/multimedia/Icon';

// ─────────────────────────────────────────────────────────────────────────────
// component
// ─────────────────────────────────────────────────────────────────────────────

const Input = forwardRef(
  ({ type, name, label, placeholder, description, error, options, list, ...rest }, ref) => {
    const renderInput = () => {
      if (type === 'radio') {
        return (
          <>
            {label && <Legend>{label}</Legend>}
            {options.map((radio) => (
              <Label
                key={radio.value}
                htmlFor={radio.value}
                css={`
                  line-height: 4rem;
                `}
              >
                <Radio
                  ref={ref}
                  id={radio.value}
                  name={name}
                  value={radio.value}
                  checked={radio.checked}
                  {...rest}
                />
                <Text>{radio.label}</Text>
              </Label>
            ))}
            {description && <Tooltip>{description}</Tooltip>}
          </>
        );
      }

      if (type === 'checkbox') {
        return (
          <>
            {label && <Legend>{label}</Legend>}
            {options.map((checkbox) => (
              <Label
                key={checkbox.value}
                htmlFor={checkbox.value}
                css={`
                  line-height: 4rem;p
                `}
              >
                <Checkbox
                  ref={ref}
                  id={checkbox.value}
                  value={checkbox.value}
                  checked={checkbox.checked}
                  {...rest}
                />
                <Text>{checkbox.label}</Text>
              </Label>
            ))}
            {description && <Tooltip>{description}</Tooltip>}
          </>
        );
      }

      if (type === 'select') {
        return (
          <>
            <Select ref={ref} id={name} {...rest}>
              <option hidden value="">
                {placeholder}
              </option>
              <optgroup label={placeholder}>
                {options.map((option) => (
                  <option key={option.value} value={option.value} selected={option.selected}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            </Select>
            <Label htmlFor={name}>{label}</Label>
            <Icon
              icon="FaChevronDown"
              css={`
                position: absolute;
                top: 2.75rem;
                right: 1rem;
                pointer-events: none;
                font-size: 1.75rem;
                opacity: 0.25;
              `}
            />
            {description && <Tooltip>{description}</Tooltip>}
            {/* {error && <Error>{error}</Error>} */}
          </>
        );
      }

      if (type === 'search') {
        return (
          <>
            <TextInput
              ref={ref}
              id={name}
              type="search"
              name={name}
              placeholder={placeholder}
              list={`datalist-${name}`}
              autoComplete="off"
              {...rest}
            />
            <Label htmlFor={name}>{label}</Label>
            <datalist id={`datalist-${name}`}>
              {list.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </datalist>
            {description && <Tooltip>{description}</Tooltip>}
            {error && <Error>{error}</Error>}
          </>
        );
      }

      if (type === 'textarea') {
        return (
          <>
            <TextAreaInput ref={ref} id={name} name={name} placeholder={placeholder} {...rest} />
            <Label htmlFor={name}>{label}</Label>
            {description && <Tooltip>{description}</Tooltip>}
            {error && <Error>{error}</Error>}
          </>
        );
      }

      if (type === 'password') {
        return (
          <>
            <PasswordInput
              ref={ref}
              id={name}
              type="password"
              name={name}
              placeholder={placeholder}
              {...rest}
            />
            <Label htmlFor={name}>{label}</Label>
            {description && <Tooltip>{description}</Tooltip>}
            {error && <Error>{error}</Error>}
          </>
        );
      }

      if (['date', 'datetime-local', 'month', 'week', 'time'].some((option) => option === type)) {
        return (
          <>
            <TemporalInput
              ref={ref}
              id={name}
              type={type}
              name={name}
              placeholder={placeholder}
              {...rest}
            />
            <Label htmlFor={name}>{label}</Label>
            {description && <Tooltip>{description}</Tooltip>}
            {error && <Error>{error}</Error>}
          </>
        );
      }

      return (
        <>
          <TextInput
            ref={ref}
            id={name}
            type={type}
            name={name}
            placeholder={placeholder}
            {...rest}
          />
          <Label htmlFor={name}>{label}</Label>
          {description && <Tooltip>{description}</Tooltip>}
          {error && <Error>{error}</Error>}
        </>
      );
    };

    if (type === 'submit') {
      return (
        <Button
          as="input"
          type="submit"
          value={label}
          look="primary"
          css={`
            grid-area: ${name};
          `}
        />
      );
    }

    return (
      <Fieldset
        css={`
          grid-area: ${name};
        `}
      >
        {renderInput()}
      </Fieldset>
    );
  },
);

Input.propTypes = {
  type:        string.isRequired,
  name:        string.isRequired,
  label:       string.isRequired,
  placeholder: string,
  description: string,
  error:       string,
  options:     arrayOf(
    shape({
      value: string.isRequired,
      label: string.isRequired,
    }),
  ),
  list: arrayOf(string),
};
Input.defaultProps = {
  placeholder: '',
  description: '',
  error:       '',
  options:     [],
  list:        [],
};

export default Input;
