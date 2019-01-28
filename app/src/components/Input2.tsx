import { padding, rem } from 'polished';
import React, { useContext, useState, ChangeEvent, FormEvent } from 'react';
import { useSpring, animated } from 'react-spring/hooks';
import styled from 'styled-components/macro';
import InputLabel from './InputLabel';
import { FormDispatch, FormReader } from '../hooks/useForm2';
import { getIn } from '../hooks/useForm2/utils';

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
  path: string;
}

function Input({ className, label, path }: Props) {
  const dispatch = useContext(FormDispatch);
  const state = useContext(FormReader);

  if (!state) {
    throw new Error('Input not nested in <Form />');
  }

  const value = getIn(state.values, path);
  const touched = getIn(state.touched, path);
  const errors = getIn(state.errors, path);
  const focused = getIn(state.focused, path);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (!dispatch) {
      throw new Error('Input not nested in <Form />');
    }
    dispatch({ type: 'CHANGE_FIELD', payload: { path, value: event.currentTarget.value } });
  }

  function handleBlur(_: FormEvent<HTMLInputElement>) {
    if (!dispatch) {
      throw new Error('Input not nested in <Form />');
    }
    dispatch({ type: 'BLUR_FIELD', payload: path });
  }

  function handleFocus(_: FormEvent<HTMLInputElement>) {
    if (!dispatch) {
      throw new Error('Input not nested in <Form />');
    }
    dispatch({ type: 'FOCUS_FIELD', payload: path });
  }

  const [hover, setHover] = useState(false);
  const id = `field-${path}`;
  const showError = touched === true && errors !== undefined;

  const { errorSpring, focusSpring, hoverSpring } = useSpring({
    errorSpring: errors !== null ? 1 : 0,
    hoverSpring: hover ? 1 : 0,
    focusSpring: focused ? 1 : 0,
  });

  return (
    <div
      css={`
        transform-style: preserve-3d;
        perspective: 800;
        z-index: 0;
        position: relative;
        ${padding(rem(16), 0)};
      `}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div css="position: relative">
        <InputField
          value={value}
          id={id}
          placeholder={undefined}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
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
        <InputLabel focused={focused} empty={value === ''} htmlFor={id}>
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
      </div>
    </div>
  );
}

export default Input;
