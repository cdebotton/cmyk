import { FieldProps } from 'formik';
import { modularScale, position, rem, size } from 'polished';
import React, { CSSProperties, HTMLProps, ReactNode } from 'react';
import { animated, Spring } from 'react-spring';
import styled from 'styled-components';
import Toggle from '../containers/Toggle';

const InputField = styled.input`
  position: relative;
  padding: ${rem(8)};
  height: ${rem(32)};
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

const Notice = styled.span`
  position: absolute;
  top: 100%;
  font-size: ${modularScale(-1)};
  left: ${rem(8)};
`;

const InputContainer = styled.span`
  transform-style: preserve-3d;
  perspective: 800;
  z-index: 0;
  position: relative;
  padding: ${rem(16)} 0 ${rem(8)};
`;

const PLACEHOLDER: CSSProperties = {
  color: '#333',
  fontSize: modularScale(0),
  transform: `translate3d(0, ${rem(24)}, ${rem(0)})`,
};

const LABEL: CSSProperties = {
  color: '#fff',
  fontSize: modularScale(-1),
  transform: `translate3d(0, ${rem(0)}, ${rem(0)})`,
};

const FOCUSED_LABEL: CSSProperties = {
  color: '#fff',
  fontSize: modularScale(-1),
  transform: `translate3d(0, ${rem(0)}, ${rem(15)})`,
};

function ReactiveLabel(props: {
  empty: boolean;
  focused: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  const { empty, children, focused, htmlFor } = props;
  return (
    <Spring
      native
      to={empty ? PLACEHOLDER : focused ? FOCUSED_LABEL : LABEL}
      render={styles => (
        <animated.label
          htmlFor={htmlFor}
          style={{
            ...styles,
            cursor: 'pointer',
            left: rem(8),
            pointerEvents: empty ? 'none' : 'inherit',
            position: 'absolute',
            top: 0,
          }}
        >
          {children}
        </animated.label>
      )}
    />
  );
}

enum BorderStep {
  None,
  Half,
  Full,
}

const baseBorderStle = {
  backgroundColor: 'hsla(212, 50%, 50%, 0)',
  bottom: rem(8),
  height: '4px',
  left: 0,
  position: 'absolute',
  transform: 'scaleX(0)',
  width: '100%',
};

const halfBorderStyle = {
  ...baseBorderStle,
  backgroundColor: 'hsla(212, 50%, 50%, 1.0)',
  transform: 'scaleX(1)',
};

const fullBorderStyle = {
  ...baseBorderStle,
  backgroundColor: 'hsla(90, 50%, 50%, 1.0)',
  transform: 'scaleX(1)',
};

function ReactiveBorder(props: { step: BorderStep }) {
  const { step } = props;

  return (
    <>
      <Spring
        native
        to={step !== BorderStep.None ? halfBorderStyle : baseBorderStle}
        render={styles => <animated.span style={styles} />}
      />
      <Spring
        native
        to={step === BorderStep.Full ? fullBorderStyle : baseBorderStle}
        render={styles => <animated.span style={styles} />}
      />
    </>
  );
}

function getBorderStep(options: { focus: boolean; hover: boolean }) {
  const { focus, hover } = options;
  if (focus) {
    return BorderStep.Full;
  }
  if (hover) {
    return BorderStep.Half;
  }
  return BorderStep.None;
}

interface Props extends FieldProps<any> {
  className?: string;
  label: string;
  type?: HTMLProps<HTMLInputElement>['type'];
}

function Input({ className, field, label, form, ...props }: Props) {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];
  const id = `field-${field.name}`;

  return (
    <Toggle>
      {hover => (
        <Toggle>
          {focus => (
            <InputContainer
              className={className}
              onMouseEnter={hover.setOn}
              onMouseLeave={hover.setOff}
            >
              <InputField
                {...props}
                {...field}
                id={id}
                placeholder={undefined}
                onFocus={focus.setOn}
                onBlur={focus.setOff}
              />
              <ReactiveLabel
                htmlFor={id}
                focused={focus.on}
                empty={field.value === ''}
              >
                {label}
              </ReactiveLabel>
              <ReactiveBorder
                step={getBorderStep({ focus: focus.on, hover: hover.on })}
              />
              {touched && error && <Notice>{error}</Notice>}
            </InputContainer>
          )}
        </Toggle>
      )}
    </Toggle>
  );
}

export default Input;
