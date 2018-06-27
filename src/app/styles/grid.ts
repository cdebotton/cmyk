import { ComponentType } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from './theme';

type Styleable = { className?: string };

interface Props {
  gridTemplateRows?: (string | number)[];
  gridTemplateColumns?: (string | number)[];
  alignItems?: string;
  alignContent?: string;
  justifyContent?: string;
}

function gridTemplateRows<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.gridTemplateRows) {
    return `grid-template-rows: ${props.gridTemplateRows.join(' ')}`;
  }

  return null;
}

function gridTemplateColumns<T extends Props>(
  props: ThemedStyledProps<T, Theme>,
) {
  if (props.gridTemplateColumns) {
    return `grid-template-columns: ${props.gridTemplateColumns.join(' ')}`;
  }

  return null;
}

function alignContent<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.alignContent) {
    return `align-content: ${props.alignContent}`;
  }

  return null;
}

function alignItems<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.alignItems) {
    return `align-items: ${props.alignItems}`;
  }

  return null;
}

function justifyContent<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.justifyContent) {
    return `justify-items: ${props.justifyContent}`;
  }

  return null;
}

export default function grid<T extends Styleable>(component: ComponentType<T>) {
  return styled<T>(component)`
    display: grid;
    ${gridTemplateColumns};
    ${gridTemplateRows};
    ${alignContent};
    ${alignItems};
    ${justifyContent};
  `;
}
