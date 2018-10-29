import { FieldProps } from 'formik';
import { padding, rem, size } from 'polished';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import styled, { css } from 'styled-components';
import InputLabel from './InputLabel';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface Props<T> extends FieldProps<any> {
  className?: string;
  label: ReactNode;
  options: Option<T>[];
  tabIndex?: number;
}

const SelectContainer = styled.div`
  &:focus,
  &:active {
    outline: none;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
`;

const SelectLabel = styled(animated.div)`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  ${padding(rem(8), rem(16))};
`;

const Arrow = styled(animated.svg)`
  align-self: center;
  display: block;
  position: absolute;
  right: ${rem(10)};
  top: 50%;
  bottom: 50%;
  margin-top: -${rem(5)};
  ${size(rem(5), rem(10))};
`;

const OptionList = styled(animated.ul)`
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  top: 100%;
  width: 100%;
  box-shadow: 0 1px 5px hsla(0, 0%, 0%, 0.4);
`;

const Border = styled(animated.span)<{ format: 'hover' | 'focus' }>`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background-color: ${({ format }) => {
    switch (format) {
      case 'hover':
        return 'hsla(212, 50%, 50%, 1)';
      case 'focus':
        return 'hsla(90, 50%, 50%, 1)';
    }
  }};
  transform-origin: 0 0;
  width: 100%;
`;

const Option = styled(animated.li)<{ disabled: boolean }>`
  ${padding(rem(8), rem(16))};
  background-color: hsla(0, 0%, 20%, 0.2);
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'inherit')};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:focus,
      &:hover {
        background-color: hsla(212, 50%, 50%, 1);
        color: #fff;
        outline: none;
      }
    `};

  ${({ disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${disabled ? 'hsla(0, 0%, 0%, 0.25)' : '#fff'};
  `};

  &:last-of-type {
    border-radius: 0 0 3px 3px;
  }
`;

function Select<T extends string>({
  className,
  options,
  form,
  field,
  tabIndex = 0,
  ...props
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const [spring, setSpring] = useSpring({
    config: config.default,
    empty: 0,
    hover: 0,
    open: 0,
  });

  useEffect(() =>
    setSpring({
      empty: field.value === null ? 0 : 1,
      hover: hover ? 1 : 0,
      open: open ? 1 : 0,
    }),
  );

  const selected = useMemo(
    () =>
      options
        .map<[ReactNode, T]>(({ label, value: optionValue }) => [
          label,
          optionValue,
        ])
        .find(([_, optionValue]) => optionValue === field.value),
    [options, field.value],
  );

  const selectedLabel = !selected ? props.label : selected[0];

  return (
    <SelectContainer
      className={className}
      onMouseMoveCapture={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={tabIndex}
      role="menu"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <SelectWrapper>
        <SelectLabel
          style={{
            backgroundColor: spring.open.interpolate({
              output: ['#fff', 'hsla(0, 0%, 20%, 0.2)'],
              range: [0, 1],
            }),
            borderRadius: spring.open
              .interpolate({
                output: ['3px', '0px'],
                range: [0, 1],
              })
              .interpolate(x => `3px 3px ${x} ${x}`),
            color: spring.open.interpolate({
              output: ['#000', '#fff'],
              range: [0, 1],
            }),
          }}
        >
          {selectedLabel}
          <Arrow viewBox="0 0 10 5">
            <animated.path
              d="M0,0 L10,0 L5,5 L0,0 Z"
              style={{
                transform: spring.open
                  .interpolate({
                    output: ['0deg', '180deg'],
                    range: [0, 1],
                  })
                  .interpolate(r => `rotateZ(${r})`),
                transformOrigin: 'center center',
              }}
              fill={spring.open.interpolate({
                output: ['#000', '#fff'],
                range: [0, 1],
              })}
            />
          </Arrow>
        </SelectLabel>
        <InputLabel focused={open} empty={field.value === null}>
          {props.label}
        </InputLabel>
        <Border
          format="hover"
          style={{
            transform: spring.hover.interpolate(x => `scaleX(${x})`),
          }}
        />
        <Border
          format="focus"
          style={{
            transform: spring.open.interpolate(x => `scaleX(${x})`),
          }}
        />
        <OptionList
          style={{
            opacity: spring.open,
            pointerEvents: open ? 'inherit' : 'none',
            transform: spring.open
              .interpolate({
                output: [rem(-20), rem(0)],
                range: [0, 1],
              })
              .interpolate(y => `translate3d(0, ${y}, 0)`),
          }}
        >
          {options.map(option => (
            <Option
              role="menuitem"
              tabIndex={option.value === field.value ? -1 : tabIndex}
              key={`OPTION_${field.name}_${option.value}`}
              disabled={option.value === field.value}
              onClick={_event => {
                form.setFieldValue(field.name, option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </Option>
          ))}
        </OptionList>
      </SelectWrapper>
    </SelectContainer>
  );
}

export default Select;
