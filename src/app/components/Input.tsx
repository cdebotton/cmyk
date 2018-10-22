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
  padding: ${rem(6)};
  height: ${rem(32)};
  width: 100%;
  border: none;
  background-color: transparent;
  color: #fff;
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

const StateFiller = styled.svg`
  z-index: -1;
  pointer-events: none;
  border-radius: 3px;
  ${position('absolute', 0, 0)};
  ${size('100%')};
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
  ...NativeStyles.label,
  color: '#eee',
  fontSize: modularScale(0),
  transform: `translate3d(0, ${rem(24)}, 0)`,
};

const LABEL = {
  ...NativeStyles.label,
  color: '#fff',
  fontSize: modularScale(-1),
  transform: `translate3d(0, ${rem(3)}, 0)`,
};

const PathStates = {
  empty: 'M0,16 L0,16 L0,48 L0,48 Z',
  full: 'M0,16 L100,16 L100,48 L0,48 Z',
  partial: 'M0,16 L80,16 L90,48 L0,48 Z',
};

function getHoverSpringTo(options: { hover: boolean; focus: boolean }) {
  const { hover, focus } = options;

  if (focus) {
    return { d: PathStates.full, fill: 'hsla(212, 50%, 50%, 0.5)' };
  }

  if (hover) {
    return { d: PathStates.partial, fill: 'hsla(212, 50%, 50%, 0.5)' };
  }

  return { d: PathStates.empty, fill: 'hsla(180, 50%, 50%, 0.0)' };
}

function getFocusSpringTo(focus: boolean) {
  if (focus) {
    return { d: PathStates.full, fill: 'hsla(250, 50%, 50%, 0.5)' };
  }

  return { d: PathStates.empty, fill: 'hsla(180, 50%, 50%, 0.0)' };
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
              <Spring native to={field.value === '' ? PLACEHOLDER : LABEL}>
                {styles => (
                  <animated.label style={styles}>{label}</animated.label>
                )}
              </Spring>
              <StateFiller viewBox="0 0 100 56" preserveAspectRatio="none">
                <path d={PathStates.full} fill="hsla(0, 0%, 100%, 0.2)" />
                <Spring<{}, ReturnType<typeof getHoverSpringTo>>
                  native
                  to={getHoverSpringTo({ hover: hover.on, focus: focus.on })}
                >
                  {({ d, fill }) => <animated.path d={d} fill={fill} />}
                </Spring>
                <Spring<{}, ReturnType<typeof getFocusSpringTo>>
                  native
                  to={getFocusSpringTo(focus.on)}
                >
                  {({ d, fill }) => <animated.path d={d} fill={fill} />}
                </Spring>
              </StateFiller>
              <InputField
                {...props}
                {...field}
                placeholder={undefined}
                onFocus={focus.setOn}
                onBlur={focus.setOff}
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
