import { FieldProps } from 'formik';
import { modularScale, position, rem, size } from 'polished';
import React, { CSSProperties, HTMLProps } from 'react';
import { animated, Spring } from 'react-spring';
import styled from 'styled-components';
import Toggle from '../containers/Toggle';

interface Props extends FieldProps<any> {
  className?: string;
  label: string;
  type?: HTMLProps<HTMLInputElement>['type'];
}

const InputField = styled.input`
  position: relative;
  padding: ${rem(8)};
  height: ${rem(32)};
  width: 100%;
  border: none;
  background-color: transparent;
  color: #fff;
  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.span`
  position: relative;
  overflow: hidden;
  display: block;
  border-radius: 3px;
  background-color: hsla(0, 0%, 100%, 0.2);
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

const labelStyles: CSSProperties = {
  left: rem(8),
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
};

const PLACEHOLDER: CSSProperties = {
  ...labelStyles,
  color: '#eee',
  fontSize: modularScale(0),
  transform: `translate3d(0, ${rem(24)}, 0)`,
};

const LABEL: CSSProperties = {
  ...labelStyles,
  color: '#fff',
  fontSize: modularScale(-1),
  transform: `translate3d(0, ${rem(3)}, 0)`,
};

function getHoverStyles(options: { hover: boolean; focus: boolean }) {
  const { hover } = options;
  const baseStyles: CSSProperties = {
    backgroundColor: 'hsla(212, 50%, 50%, 0)',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: `translate3d(100%, 0, 0) skew(-30deg)`,
    width: 'calc(100%)',
  };

  if (hover) {
    return {
      ...baseStyles,
      backgroundColor: 'hsla(240, 50%, 50%, 0.5)',
      transform: `translate3d(16px, 0, 0) skew(45deg)`,
    };
  }

  return baseStyles;
}

function Input({ className, field, label, form, ...props }: Props) {
  const touched = form.touched[field.name];
  const error = form.errors[field.name];

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
              <Spring
                native
                to={field.value === '' ? PLACEHOLDER : LABEL}
                render={styles => (
                  <animated.label style={styles}>{label}</animated.label>
                )}
              />
              <InputWrapper>
                <Spring
                  native
                  render={styles => <animated.span style={styles} />}
                  to={getHoverStyles({ focus: focus.on, hover: hover.on })}
                />
                <InputField
                  {...props}
                  {...field}
                  placeholder={undefined}
                  onFocus={focus.setOn}
                  onBlur={focus.setOff}
                />
              </InputWrapper>
              {touched && error && <Notice>{error}</Notice>}
            </InputContainer>
          )}
        </Toggle>
      )}
    </Toggle>
  );
}

export default Input;
