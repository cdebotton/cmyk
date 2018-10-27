import { FieldProps } from 'formik';
import { modularScale, padding, rem } from 'polished';
import React, { CSSProperties, HTMLProps, useEffect, useState } from 'react';
import { animated, config, interpolate, useSpring } from 'react-spring';
import styled from 'styled-components';

const baseBorderStyle: CSSProperties = {
  bottom: 0,
  height: '4px',
  left: 0,
  position: 'absolute',
  width: '100%',
};

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

const InputField = styled.input`
  position: relative;
  padding: ${rem(8)};
  width: 100%;
  border: none;
  color: #000;
  overflow: hidden;
  display: block;
  border-radius: 3px;
  background-color: #fff;

  &:focus {
    outline: none;
  }
`;

interface Props extends FieldProps<any> {
  className?: string;
  label: string;
  type?: HTMLProps<HTMLInputElement>['type'];
}

function Input({ className, field, label, form, ...props }: Props) {
  const [{ value: errorSpring }, setErrorSpring] = useSpring({
    config: config.default,
    value: 0,
  });
  const [{ value: focusSpring }, setFocusSpring] = useSpring({
    config: config.default,
    value: 0,
  });
  const [{ value: hoverSpring }, setHoverSpring] = useSpring({
    config: config.default,
    value: 0,
  });
  const [{ value: valueSpring }, setValueSpring] = useSpring({
    config: config.default,
    value: 0,
  });
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const touched = form.touched[field.name];
  const error = form.errors[field.name];
  const id = `field-${field.name}`;
  const showError = touched === true && error !== undefined;

  useEffect(() => {
    setErrorSpring({ value: error !== null ? 1 : 0 });
    setHoverSpring({ value: hover ? 1 : 0 });
    setFocusSpring({ value: focus ? 1 : 0 });
    setValueSpring({ value: field.value !== '' ? 1 : 0 });
  });

  return (
    <InputContainer
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <InputWrapper>
        <InputField
          {...props}
          {...field}
          id={id}
          placeholder={undefined}
          onFocus={() => setFocus(true)}
          onBlur={event => {
            setFocus(false);
            field.onBlur(event);
          }}
        />
        <animated.label
          htmlFor={id}
          style={{
            color: interpolate(
              [valueSpring, focusSpring],
              (v, f) => v + f,
            ).interpolate({
              output: ['#333', focus ? '#000' : '#fff'],
              range: [0, 1],
            }),
            cursor: 'pointer',
            fontSize: valueSpring.interpolate(y => modularScale(-y)),
            left: rem(6),
            letterSpacing: valueSpring.interpolate(y => `${y}px`),
            padding: rem(2),
            pointerEvents: field.value === '' ? 'none' : 'inherit',
            position: 'absolute',
            top: 0,
            transform: valueSpring
              .interpolate({ range: [0, 1], output: [5, -20] })
              .interpolate(y => `translate3d(0, ${rem(y)}, 0)`),
          }}
        >
          <animated.span
            style={{
              backgroundColor: '#fff',
              height: '100%',
              left: 0,
              opacity: focusSpring,
              position: 'absolute',
              top: 0,
              transform: focusSpring.interpolate(x => `scaleX(${x})`),
              transformOrigin: '0 0',
              width: '100%',
              zIndex: -1,
            }}
          />
          {label}
        </animated.label>
        <animated.span
          style={{
            ...baseBorderStyle,
            backgroundColor: hoverSpring.interpolate(
              x => `hsla(212, 50%, 50%, ${x})`,
            ),
            transform: hoverSpring.interpolate(x => `scaleX(${x})`),
          }}
        />
        <animated.span
          style={{
            ...baseBorderStyle,
            backgroundColor: focusSpring.interpolate(
              (x: number) => `hsla(90, 50%, 50%, ${x})`,
            ),
            transform: focusSpring.interpolate(x => `scaleX(${x})`),
          }}
        />
        <animated.span
          hidden={!showError}
          style={errorSpring.interpolate(x => {
            return {
              opacity: x,
              position: 'absolute',
              transform: `translate3d(0, ${rem(x * 16)}, 0)`,
            };
          })}
        >
          {error}
        </animated.span>
      </InputWrapper>
    </InputContainer>
  );
}

export default Input;
