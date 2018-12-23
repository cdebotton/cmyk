import { padding, rem } from 'polished';
import React, { ChangeEventHandler, FormEventHandler, HTMLProps, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring/hooks';
import styled from 'styled-components/macro';
import InputLabel from './InputLabel';

const InputContainer = styled.div`
  transform-style: preserve-3d;
  perspective: 800;
  z-index: 0;
  position: relative;
  ${padding(rem(16), 0)};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const InputField = styled(animated.input)`
  position: relative;
  padding: ${rem(8)};
  width: 100%;
  border: none;
  color: #000;
  overflow: hidden;
  display: block;
  border-radius: 3px;

  &:focus {
    outline: none;
  }
`;

const InputBorder = styled(animated.span)`
  bottom: 0;
  height: 4px;
  left: 0;
  position: absolute;
  width: 100%;
  transform-origin: 0 0;
`;

const ErrorLabel = styled(animated.span)`
  position: absolute;
  top: 100%;
  left: 0;
`;

interface Props {
  className?: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: FormEventHandler<HTMLInputElement>;
  type?: HTMLProps<HTMLInputElement>['type'];
  name: string;
  dirty?: boolean;
  touched?: boolean;
  errors?: string[] | null;
}

function Input({ className, label, touched, errors, dirty: _, ...field }: Props) {
  const [{ value: errorSpring }, setErrorSpring] = useSpring(() => {
    return {
      value: field.value !== '' ? 1 : 0,
    };
  });

  const [{ value: focusSpring }, setFocusSpring] = useSpring(() => {
    return { value: 0 };
  });

  const [{ value: hoverSpring }, setHoverSpring] = useSpring(() => {
    return {
      value: 0,
    };
  });

  console.log(errors, '!!!');

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const id = `field-${field.name}`;
  const showError = touched === true && errors !== undefined;

  useEffect(() => {
    setErrorSpring({ value: errors !== null ? 1 : 0 });
    setHoverSpring({ value: hover ? 1 : 0 });
    setFocusSpring({ value: focus ? 1 : 0 });
  });

  return (
    <InputContainer
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <InputWrapper>
        <InputField
          {...field}
          id={id}
          placeholder={undefined}
          onFocus={() => setFocus(true)}
          onBlur={event => {
            setFocus(false);
            field.onBlur(event);
          }}
          style={{
            backgroundColor: focusSpring.interpolate({
              output: ['#fff', 'hsla(0, 0%, 20%, 0.2'],
              range: [0, 1],
            }),
            color: focusSpring.interpolate({
              output: ['#000', '#fff'],
              range: [0, 1],
            }),
          }}
        />
        <InputLabel focused={focus} empty={field.value === ''} htmlFor={id}>
          {label}
        </InputLabel>
        <InputBorder
          style={{
            backgroundColor: hoverSpring.interpolate(x => `hsla(212, 50%, 50%, ${x})`),
            transform: hoverSpring.interpolate(x => `scaleX(${x})`),
          }}
        />
        <InputBorder
          style={{
            backgroundColor: focusSpring.interpolate(x => `hsla(90, 50%, 50%, ${x})`),
            transform: focusSpring.interpolate(x => `scaleX(${x})`),
          }}
        />
        <ErrorLabel
          hidden={!showError}
          style={{
            opacity: errorSpring,
            transform: errorSpring.interpolate(x => `translate3d(0, ${rem(x * 16)}, 0)`),
          }}
        >
          {errors}
        </ErrorLabel>
      </InputWrapper>
    </InputContainer>
  );
}

export default Input;
