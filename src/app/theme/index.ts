import { css, ThemedOuterStyledProps } from 'styled-components';
import colors from './colors';

export interface Theme {
  mode: 'light' | 'dark';
}

export type CssHelperFn<P = {}> = (
  props: ThemedOuterStyledProps<P, Theme>,
) => string | number;

type GridTemplateUnit = 'min-content' | 'max-content' | 'auto' | number;

type ShadeRange = 0 | 1 | 2 | 3 | 4;

interface ThemingProps {
  format?: 'positive' | 'neutral' | 'negative';
  shade?: ShadeRange | [ShadeRange, ShadeRange];
  templateRows?: GridTemplateUnit[];
  templateColumns?: GridTemplateUnit[];
  alignContent?: 'start' | 'center' | 'end';
}

const getBackgroundColor: CssHelperFn<ThemingProps> = props => {
  const { format, shade = 0, theme } = props;
  const mode = theme && theme.mode ? theme.mode : 'light';
  const palette = colors[format || mode];

  return Array.isArray(shade)
    ? `linear-gradient(to bottom right, ${shade
        .map(color => palette[color])
        .join(', ')})`
    : palette[shade];
};

const getColor: CssHelperFn<ThemingProps> = props => {
  if (!props.format && (!props.theme || props.theme.mode === 'light')) {
    return colors.dark[0];
  }

  return colors.light[0];
};

const getTemplateRows: CssHelperFn<ThemingProps> = props => {
  return props.templateRows ? props.templateRows.join(' ') : 'min-content';
};

const getTemplateColumns: CssHelperFn<ThemingProps> = props => {
  return props.templateColumns
    ? props.templateColumns.join(' ')
    : 'min-content';
};

const getAlignContent: CssHelperFn<ThemingProps> = props => {
  return props.alignContent ? props.alignContent : 'start';
};

export function theming() {
  return css`
    display: grid;
    align-content: ${getAlignContent};
    background: ${getBackgroundColor};
    color: ${getColor};
    grid-template-columns: ${getTemplateColumns};
    grid-template-rows: ${getTemplateRows};
  `;
}
