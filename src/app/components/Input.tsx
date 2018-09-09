import { FieldProps } from 'formik';
import { modularScale, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

interface IProps extends FieldProps<any> {
  className?: string;
  label: string;
}

const InputField = styled.input`
  padding: ${rem(6)};
  width: 100%;
`;

const Label = styled.label`
  position: absolute;
  font-size: ${modularScale(-1)};
  top: 0;
  left: ${rem(8)};
`;

const Notice = styled.span`
  position: absolute;
  top: 100%;
  font-size: ${modularScale(-1)};
  left: ${rem(8)};
`;

function Input<T>({ className, field, label, form, ...props }: IProps) {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];

  return (
    <span className={className}>
      {field.value !== '' && <Label>{label}</Label>}
      <InputField {...props} {...field} placeholder={label} />
      {touched && error && <Notice>{error}</Notice>}
    </span>
  );
}

export default styled(Input)`
  position: relative;
  padding: ${rem(16)} 0 ${rem(8)};
`;