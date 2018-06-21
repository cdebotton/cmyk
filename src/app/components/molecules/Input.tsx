import React, { HTMLProps, SFC } from 'react';
import styled from 'styled-components';
import { FormikProps } from 'formik';
import { rem } from 'polished';
import colors from '../../theme/colors';
import InputPlaceholder from '../atoms/InputPlaceholder';
import InputBorder from '../atoms/InputBorder';
import InputError from '../atoms/InputError';
import FieldState from '../../containers/FieldState';

type Props = {
  className?: string;
  placeholder?: string;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    onBlur: (e: any) => void;
    value: any;
    name: string;
  };
  form: FormikProps<any>;
};

const Input: SFC<Props> = ({ className, field, form, placeholder }) => {
  const hasValue = field.value !== '';
  const hasError = form.touched[field.name] && form.errors[field.name];

  return (
    <FieldState>
      {({ value: { isFocused, isHovering }, dispatch }) => (
        <div className={className}>
          <InputField
            autoComplete="off"
            {...field}
            onFocus={() => dispatch({ type: 'SET_FOCUS', payload: true })}
            onBlur={event => {
              field.onBlur(event);
              dispatch({ type: 'SET_FOCUS', payload: false });
            }}
            onMouseEnter={() => dispatch({ type: 'SET_HOVER', payload: true })}
            onMouseLeave={() => dispatch({ type: 'SET_HOVER', payload: false })}
          />
          {placeholder && (
            <InputPlaceholder isLabel={hasValue}>
              {placeholder}
            </InputPlaceholder>
          )}
          <InputBorder grow={isFocused} />
          {hasError && <InputError>{form.errors[field.name]}</InputError>}
        </div>
      )}
    </FieldState>
  );
};

export default styled(Input)`
  position: relative;
  border-bottom: 2px solid #aaa;
  margin: ${rem(32)} 0;
`;

const InputField = styled.input`
  position: relative;
  width: 100%;
  padding: 0 ${rem(5)};
  border: none;
  appearance: none;
  background-color: transparent;
  color: ${colors.palette.light[0]};

  &:focus {
    outline: none;
  }
`;
