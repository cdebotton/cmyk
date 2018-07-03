import { ComponentType } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import colors from './colors';
import { transparentize } from 'polished';

export enum Mode {
  Light = 'light',
  Dark = 'dark',
}

export interface Theme {
  mode: Mode;
}

export enum Format {
  Positive = 'positive',
  Neutral = 'neutral',
  Negative = 'negative',
}

type ShaderValue = 0 | 1 | 2 | 3 | 4;

interface Props {
  format?: Format;
  shader?: ShaderValue | [ShaderValue, ShaderValue];
  inverse?: boolean;
}

function backgroundColor<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  const {
    shader,
    format,
    inverse,
    theme: { mode },
  } = props;

  const selectedMode = inverse
    ? mode === Mode.Light
      ? Mode.Dark
      : Mode.Light
    : mode;
  const palette = format ? colors[format] : colors[selectedMode];

  if (shader && Array.isArray(shader)) {
    return `background-image: linear-gradient(to bottom right, ${shader
      .map(shade => palette[shade])
      .join(', ')})`;
  } else if (shader) {
    return `background-color: ${palette[shader]}`;
  } else if (format || inverse) {
    return `background-color: ${palette[0]}`;
  }

  return null;
}

function color<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  const {
    inverse,
    theme: { mode },
  } = props;

  if (props.format || mode === Mode.Dark || (inverse && mode === Mode.Light)) {
    return `color: ${colors.light[0]}`;
  }

  return null;
}

function borderColor<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  const {
    inverse,
    theme: { mode },
  } = props;

  if (props.format || mode === Mode.Dark || (inverse && mode === Mode.Light)) {
    return `border-color: ${transparentize(0.4, colors.light[0])}`;
  }

  return null;
}

export function theme<T>(component: ComponentType<T>) {
  return styled(component)`
    ${backgroundColor};
    ${color};
    ${borderColor};
  `;
}
