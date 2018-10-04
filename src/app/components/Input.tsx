import { FieldProps } from 'formik';
import { modularScale, rem } from 'polished';
import React, { CSSProperties, HTMLProps } from 'react';
import { animated, Spring } from 'react-spring';
import styled from 'styled-components';

interface Props extends FieldProps<any> {
  className?: string;
  label: string;
  type?: HTMLProps<HTMLInputElement>['type'];
}

const InputField = styled.input`
  padding: ${rem(6)};
  height: ${rem(32)};
  width: 100%;
  border: none;
  background: transparent;
  border-bottom: 1px solid #ddd;

  &:focus {
    outline: none;
  }
`;

const Notice = styled.span`
  position: absolute;
  top: 100%;
  font-size: ${modularScale(-1)};
  left: ${rem(8)};
`;

const InputContainer = styled.span`
  z-index: 0;
  position: relative;
  padding: ${rem(16)} 0 ${rem(8)};
`;

const NativeStyles: { [x: string]: CSSProperties } = {
  label: {
    left: rem(8),
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
  },
};

const PLACEHOLDER = {
  color: '#aaa',
  fontSize: modularScale(0),
  transform: `translate3d(0, ${rem(24)}, 0)`,
};

const LABEL = {
  color: '#222',
  fontSize: modularScale(-1),
  transform: `translate3d(0, ${rem(3)}, 0)`,
};

function Input({ className, field, label, form, ...props }: Props) {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];

  return (
    <InputContainer className={className}>
      <Spring to={field.value === '' ? PLACEHOLDER : LABEL}>
        {style => (
          <animated.label style={{ ...NativeStyles.label, ...style }}>
            {label}
          </animated.label>
        )}
      </Spring>
      <InputField {...props} {...field} placeholder={undefined} />
      {touched && error && <Notice>{error}</Notice>}
    </InputContainer>
  );
}

export default Input;
