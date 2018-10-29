import { FieldProps } from 'formik';
import { modularScale, padding, rem } from 'polished';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { animated, config, interpolate, useSpring } from 'react-spring';
import styled, { css } from 'styled-components';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface Props<T> extends FieldProps<any> {
  className?: string;
  label: ReactNode;
  options: Option<T>[];
}

const SelectContainer = styled.div``;

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SelectLabel = styled(animated.div)`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  ${padding(rem(8), rem(16))};
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

const Border = styled(animated.span)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: hsla(80, 50%, 50%, 1);
  width: 100%;
`;

const Label = styled(animated.label)`
  cursor: pointer;
  left: ${rem(6)};
  padding: ${rem(2)};
  position: absolute;
  top: 0;
`;

const LabelBacker = styled(animated.span)`
  background-color: #fff;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transform-origin: 0 0;
  width: 100%;
  z-index: -1;
`;

const Option = styled(animated.li)<{ disabled: boolean }>`
  ${padding(rem(8), rem(16))};
  background-color: hsla(0, 0%, 20%, 0.2);
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'inherit')};

  ${({ disabled }) =>
    !disabled &&
    css`
      &:hover {
        background-color: hsla(212, 50%, 50%, 1);
        color: #fff;
      }
    `};

  ${({ disabled }) => css`
    cursor: ${disabled ? 'default' : 'pointer'};
    color: ${disabled ? '#222' : '#fff'};
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
  ...props
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [spring, setSpring] = useSpring({
    config: config.default,
    x: 0,
    y: 0,
  });

  useEffect(() =>
    setSpring({ x: open ? 1 : 0, y: field.value === null ? 0 : 1 }),
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
    <SelectContainer className={className}>
      <SelectWrapper>
        <SelectLabel
          onClick={() => setOpen(prevOpen => !prevOpen)}
          style={{
            backgroundColor: spring.x.interpolate({
              output: ['#fff', 'hsla(0, 0%, 20%, 0.2)'],
              range: [0, 1],
            }),
            borderRadius: spring.x
              .interpolate({
                output: ['3px', '0px'],
                range: [0, 1],
              })
              .interpolate(x => `3px 3px ${x} ${x}`),
            color: spring.x.interpolate({
              output: ['#000', '#fff'],
              range: [0, 1],
            }),
          }}
        >
          {selectedLabel}
        </SelectLabel>
        <Label
          style={{
            color: spring.x.interpolate({
              output: ['#fff', '#000'],
              range: [0, 1],
            }),
            fontSize: spring.y.interpolate(x => modularScale(-x)),
            letterSpacing: spring.y.interpolate(x => `${x}px`),
            pointerEvents: field.value === '' ? 'none' : 'inherit',
            transform: spring.y
              .interpolate({ range: [0, 1], output: [5, -20] })
              .interpolate(y => `translate3d(0, ${rem(y)}, 0)`),
          }}
        >
          <LabelBacker
            style={{
              opacity: spring.x,
              transform: spring.x.interpolate(x => `scaleX(${x})`),
            }}
          />
          {props.label}
        </Label>
        <Border
          style={{
            transform: spring.x.interpolate(x => `scaleX(${x})`),
          }}
        />
        <OptionList
          style={{
            opacity: spring.x,
            pointerEvents: open ? 'inherit' : 'none',
            transform: spring.x
              .interpolate({
                output: [rem(-20), rem(0)],
                range: [0, 1],
              })
              .interpolate(y => `translate3d(0, ${y}, 0)`),
          }}
        >
          {options.map((option, i) => (
            <Option
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
