import { padding, rem, size } from 'polished';
import React, {
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useRef,
  forwardRef,
  Ref,
  useContext,
} from 'react';
import { animated, useSpring, useTrail } from 'react-spring/hooks';
import styled, { css } from 'styled-components/macro';
import InputLabel from './InputLabel';
import useViewport from '../hooks/useViewport';
import useBoundingBox from '../hooks/useBoundingBox';
import { FormDispatch, FormReader } from '../hooks/useForm2';
import { getIn } from '../hooks/useForm2/utils';

interface Option<T> {
  value: T;
  label: ReactNode;
}

interface Props<T> {
  className?: string;
  path: string;
  label: ReactNode;
  options: Option<T>[];
  tabIndex?: number;
}

const SelectLabel = styled(animated.div)`
  background-color: #fff;
  color: #000;
  cursor: pointer;
  ${padding(rem(8), rem(8))};
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
  background-color: hsla(0, 0%, 20%, 0.2);
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

enum OpenDir {
  up,
  down,
}

function Select<T extends string>(
  { className, options, tabIndex = 0, path, ...props }: Props<T>,
  ref: Ref<HTMLDivElement>,
) {
  const dispatch = useContext(FormDispatch);
  const state = useContext(FormReader);

  const value = getIn(state!.values, path);

  const [openDir, setOpenDir] = useState<OpenDir>(OpenDir.down);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const [spring, setSpring] = useSpring(() => {
    return {
      empty: 0,
      hover: 0,
      open: 0,
    };
  });

  const optionsRef = useRef<HTMLUListElement | null>(null);
  const viewport = useViewport();
  const rect = useBoundingBox(optionsRef);

  useEffect(() => {
    if (rect.top >= viewport.top && rect.top + rect.height < viewport.bottom) {
      setOpenDir(OpenDir.down);
    } else {
      setOpenDir(OpenDir.up);
    }
  }, [rect, viewport]);

  useEffect(() => {
    setSpring({
      empty: value === null ? 0 : 1,
      hover: hover ? 1 : 0,
      open: open ? 1 : 0,
    });
  });

  const selected = useMemo(
    () =>
      options
        .map<[ReactNode, T]>(({ label, value: optionValue }) => [label, optionValue])
        .find(([_, optionValue]) => optionValue === value),
    [options, value],
  );

  const selectedLabel = !selected ? props.label : selected[0];

  const animatedOptions = useTrail(options.length, {
    x: open ? 0 : 30,
    opacity: open ? 1.0 : 0.0,
  });

  return (
    <div
      css={`
        &:focus,
        &:active {
          outline: none;
        }
      `}
      className={className}
      onMouseMoveCapture={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      tabIndex={tabIndex}
      role="menu"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      // onClick={onClick}
      ref={ref}
    >
      <div
        css={`
          position: relative;
          display: grid;
          width: 100%;
        `}
      >
        <InputLabel focused={open} empty={value === null}>
          {props.label}
        </InputLabel>
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
          <span
            css={`
              opacity: ${value === null ? 0 : 1};
            `}
          >
            {selectedLabel}
          </span>
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
          ref={optionsRef}
          style={{
            opacity: spring.open,
            pointerEvents: open ? 'inherit' : 'none',
            transform: spring.open
              .interpolate({
                output:
                  openDir === OpenDir.down ? [rem(-20), rem(0)] : [rem(20), rem(-32 - rect.height)],
                range: [0, 1],
              })
              .interpolate(y => `translate3d(0, ${y}, 0)`),
          }}
        >
          {animatedOptions.map(({ opacity, x }, key) => {
            const option = options[key];

            return (
              <Option
                role="menuitem"
                style={{
                  opacity,
                  // @ts-ignore
                  transform: x.interpolate(dx => `translate3d(${dx}px, 0px, 0px)`),
                }}
                tabIndex={option.value === value ? -1 : tabIndex}
                key={`OPTION_${name}_${option.value}`}
                disabled={option.value === value}
                onClick={() => {
                  dispatch!({ type: 'CHANGE_FIELD', payload: { path, value: option.value } });
                  setOpen(false);
                }}
              >
                {option.label}
              </Option>
            );
          })}
        </OptionList>
      </div>
    </div>
  );
}

export default forwardRef<HTMLDivElement, Props<any>>(Select);
