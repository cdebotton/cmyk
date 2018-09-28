import { FieldProps } from 'formik';
import { modularScale, rem } from 'polished';
import React, { HTMLProps } from 'react';
import { Spring } from 'react-spring';
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

  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  left: ${rem(8)};
  pointer-events: none;
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

const BORDER_PATH = 'M0,0 L40,0 L40,3 L0,3 L0,0 Z';
const FILL_PATH = 'M0,0 L40,0 L40,20 L0,30 L0,0 Z';

const PLACEHOLDER = {
  color: '#aaa',
  fontSize: modularScale(0),
  textTransform: 'none',
  transform: `translate3d(0, ${rem(24)}, 0)`,
};

const LABEL = {
  color: '#444',
  fontSize: modularScale(-1),
  textTransform: 'uppercase',
  transform: `translate3d(0, 0, 0)`,
};

function Input({ className, field, label, form, ...props }: Props) {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];

  return (
    <InputContainer className={className}>
      <Spring to={field.value === '' ? PLACEHOLDER : LABEL}>
        {style => <Label style={style}>{label}</Label>}
      </Spring>
      <InputField {...props} {...field} placeholder={undefined} />
      {touched && error && <Notice>{error}</Notice>}
      <ReactiveBorder.svg
        version="1.1"
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
      >
        <linearGradient id="fill">
          <stop offset="0%" stopColor="hsl(180, 50%, 50%)" />
          <stop offset="100%" stopColor="hsl(212, 50%, 50%)" />
        </linearGradient>
        <ReactiveBorder.g>
          <Spring to={{ shape: field.value === '' ? BORDER_PATH : FILL_PATH }}>
            {({ shape }) => <path fill="url(#fill)" d={shape} />}
          </Spring>
        </ReactiveBorder.g>
      </ReactiveBorder.svg>
    </InputContainer>
  );
}

export default Input;
