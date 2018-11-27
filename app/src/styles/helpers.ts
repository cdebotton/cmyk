import { ThemedStyledProps } from 'styled-components';
import * as colors from './colors';

export interface Theme {
  mode: 'dark' | 'light';
  size: 'small' | 'medium' | 'large';
}

export const ThemeError = new Error('Component not wrapped in a theme provider');

export type Format = 'positive' | 'negative' | 'neutral';

export interface Formattable {
  format?: Format;
}

export function gradient(
  options: { offset?: number; steps?: number } = {
    offset: 0,
    steps: 5,
  },
) {
  const { offset = 0, steps = 5 } = options;
  return function generate<P extends Formattable>(props: ThemedStyledProps<P, Theme>) {
    const { theme, format } = props;

    if (!theme) {
      throw ThemeError;
    }

    const colorGroup = format ? colors[format] : colors[theme.mode];
    return `background-image: linear-gradient(to bottom right, ${colorGroup
      .slice(offset, offset + steps)
      .join(', ')})`;
  };
}

export function foreground(
  options: { shade?: number } = {
    shade: 1,
  },
) {
  const { shade = 1 } = options;
  return function generate<P extends Formattable>(props: ThemedStyledProps<P, Theme>) {
    const { theme, format } = props;

    if (!theme) {
      throw ThemeError;
    }

    const inverseMode = theme.mode === 'light' ? 'dark' : 'light';
    const colorGroup = format ? colors.light : colors[inverseMode];
    const clr = colorGroup[shade];

    return `color: ${clr}`;
  };
}

export function color(
  options: { color: Theme['mode'] | Format; shade?: number } = {
    color: 'neutral',
    shade: 1,
  },
) {
  return function<P>(_props: ThemedStyledProps<P, Theme>) {
    const { color: clr, shade = 1 } = options;
    return colors[clr][shade];
  };
}
