import { ThemedOuterStyledProps } from 'styled-components';

export interface Theme {
  mode: 'light' | 'dark';
}

export type CssHelperFn<P = {}> = (
  props: ThemedOuterStyledProps<P, Theme>,
) => string | number;
