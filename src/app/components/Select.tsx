import { FieldProps } from 'formik';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface Props<T> extends FieldProps<any> {
  className?: string;
  value: T;
  options: Option<T>[];
}

function Select<T extends string>({
  className,
  options,
  value,
  form,
  field,
  ...props
}: Props<T>) {
  return (
    <SelectContainer className={className}>
      <select {...props} {...field}>
        {options.map(option => (
          <option key={`OPTION_${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </SelectContainer>
  );
}

const SelectContainer = styled.span``;

export default Select;
