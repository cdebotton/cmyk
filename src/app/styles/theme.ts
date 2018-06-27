import { ComponentType } from 'react';
import styled, {
  ThemedOuterStyledProps,
  ThemedStyledProps,
} from 'styled-components';
import colors from './colors';

export interface Theme {
  mode: 'light' | 'dark';
}

type ShaderValue = 0 | 1 | 2 | 3 | 4;

interface Props {
  format?: 'positive' | 'negative' | 'neutral';
  shader?: ShaderValue | [ShaderValue, ShaderValue];
}

function backgroundColor<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  const {
    shader,
    format,
    theme: { mode },
  } = props;

  const palette = format ? colors[format] : colors[mode];

  if (shader && Array.isArray(shader)) {
    return `background-image: linear-gradient(to bottom right, ${shader
      .map(shade => palette[shade])
      .join(', ')})`;
  } else if (shader) {
    return `background-color: ${palette[shader]}`;
  } else if (format) {
    return `background-color: ${palette[0]}`;
  }

  return null;
}

function color<T extends Props>(props: ThemedOuterStyledProps<T, Theme>) {
  if (props.format || (props.theme && props.theme.mode === 'dark')) {
    return `color: ${colors.light[0]}`;
  }

  return null;
}

export function theme<T>(component: ComponentType<T>) {
  return styled(component)`
    ${backgroundColor};
    ${color};
  `;
}
