import React, { SFC, ReactNode } from 'react';
import { FieldProps } from 'formik';
import styled from 'styled-components';

interface Props<V = any> extends FieldProps<V> {
  className?: string;
  placeholder?: ReactNode;
  type?: 'email' | 'text' | 'number';
}

const Input: SFC<Props> = ({ className, field, form, type }) => {
  const { name } = field;
  const error = form.errors[name];
  const touched = form.touched[name];

  return (
    <div className={className}>
      <input {...field} type={type} />
      {touched && error && <p>{error}</p>}
    </div>
  );
};

export default styled(Input)`
  position: relative;

  input {
    width: 100%;
  }
`;
