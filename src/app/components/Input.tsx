import { FieldProps } from 'formik';
import { modularScale, padding, rem } from 'polished';
import React, { CSSProperties, HTMLProps, ReactNode, useState } from 'react';
import { animated, Spring } from 'react-spring';
import styled from 'styled-components';

const PLACEHOLDER: CSSProperties = {
  color: '#333',
  fontSize: modularScale(0),
  letterSpacing: '0px',
  transform: `translate3d(0, ${rem(8)}, 0)`,
};

const LABEL: CSSProperties = {
  color: '#fff',
  fontSize: modularScale(-1),
  letterSpacing: '1px',
  transform: `translate3d(0, ${rem(-20)}, 0)`,
};

const FOCUSED_LABEL: CSSProperties = {
  color: '#000',
  fontSize: modularScale(-1),
  letterSpacing: '1px',
  transform: `translate3d(0, ${rem(-20)}, 0)`,
};

function ReactiveLabel(props: {
  empty: boolean;
  focused: boolean;
  htmlFor: string;
  children: ReactNode;
}) {
  const { empty, children, focused, htmlFor } = props;
  return (
    <Spring native to={empty ? PLACEHOLDER : focused ? FOCUSED_LABEL : LABEL}>
      {styles => (
        <>
          <animated.label
            htmlFor={htmlFor}
            style={{
              ...styles,
              cursor: 'pointer',
              left: rem(6),
              padding: rem(2),
              pointerEvents: empty ? 'none' : 'inherit',
              position: 'absolute',
              top: 0,
            }}
          >
            <Spring
              native
              to={
                focused
                  ? { opacity: 1, transform: 'scaleX(1)' }
                  : { opacity: 0, transform: 'scaleX(0)' }
              }
            >
              {({ opacity, transform }) => (
                <animated.span
                  style={{
                    opacity,
                    transform,
                    backgroundColor: '#fff',
                    height: '100%',
                    left: 0,
                    position: 'absolute',
                    top: 0,
                    transformOrigin: '0 0',
                    width: '100%',
                    zIndex: -1,
                  }}
                />
              )}
            </Spring>
            {children}
          </animated.label>
        </>
      )}
    </Spring>
  );
}

enum BorderStep {
  None,
  Half,
  Full,
}

const baseBorderStle = {
  backgroundColor: 'hsla(212, 50%, 50%, 0)',
  bottom: 0,
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
      >
        {styles => <animated.span style={styles} />}
      </Spring>
      <Spring
        native
        to={step === BorderStep.Full ? fullBorderStyle : baseBorderStle}
      >
        {styles => <animated.span style={styles} />}
      </Spring>
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

function ReactiveError(props: { children: ReactNode; on: boolean }) {
  const { on, children } = props;
  return (
    <Spring
      to={
        on
          ? { transform: `translate3d(0, ${rem(16)}, 0)`, opacity: 1 }
          : { transform: `translate3d(0, ${rem(0)}, 0`, opacity: 0 }
      }
    >
      {styles => (
        <animated.span
          style={{
            ...styles,
            bottom: 0,
            fontSize: modularScale(-1),
            left: rem(8),
            pointerEvents: 'none',
            position: 'absolute',
          }}
        >
          {children}
        </animated.span>
      )}
    </Spring>
  );
}

interface Props extends FieldProps<any> {
  className?: string;
  label: string;
  type?: HTMLProps<HTMLInputElement>['type'];
}

function Input({ className, field, label, form, ...props }: Props) {
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const touched = form.touched[field.name];
  const error = form.errors[field.name];
  const id = `field-${field.name}`;
  const showError = touched === true && error !== undefined;

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
        <ReactiveLabel htmlFor={id} focused={focus} empty={field.value === ''}>
          {label}
        </ReactiveLabel>
        <ReactiveBorder step={getBorderStep({ focus, hover })} />
        <ReactiveError on={showError}>{showError ? error : ''}</ReactiveError>
      </InputWrapper>
    </InputContainer>
  );
}

export default Input;
