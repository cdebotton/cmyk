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

const ReactiveBorder = {
  g: styled.g``,
  svg: styled.svg`
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  `,
};

const NativeStyles: { [x: string]: CSSProperties } = {
  label: {
    left: rem(8),
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
  },
};

const FILL_PATH = 'M0,6 L2,4 L2,0 L0,0 Z';
const EMPTY_PATH = 'M0,16 L2,16 L3,15 L0,15 Z';

const PLACEHOLDER = {
  color: '#aaa',
  fontSize: modularScale(0),
  transform: `translate3d(0, ${rem(24)}, 0)`,
};

const LABEL = {
  color: '#fff',
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
      <ReactiveBorder.svg
        version="1.1"
        viewBox="0 0 2 16"
        preserveAspectRatio="none"
      >
        <ReactiveBorder.g>
          <Spring
            native
            to={{ shape: field.value === '' ? EMPTY_PATH : FILL_PATH }}
          >
            {({ shape }) => (
              <animated.path fill="hsl(180, 50%, 50%)" d={shape} />
            )}
          </Spring>
        </ReactiveBorder.g>
      </ReactiveBorder.svg>
    </InputContainer>
  );
}

export default Input;
