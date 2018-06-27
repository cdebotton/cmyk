import { ComponentType } from 'react';
import styled, { ThemedStyledProps } from 'styled-components';
import { Theme } from './Theme';

interface Props {
  gridRow?: number | string | [number, string];
  gridColumn?: number | string | [number, string];
  alignSelf?: string;
}

function gridRow<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.gridRow && Array.isArray(props.gridRow)) {
    return `grid-row: ${props.gridRow.join(' / ')}`;
  } else if (props.gridRow) {
    return `grid-row: ${props.gridRow}`;
  }

  return null;
}

function gridColumn<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.gridColumn && Array.isArray(props.gridColumn)) {
    return `grid-column: ${props.gridColumn.join(' / ')}`;
  } else if (props.gridColumn) {
    return `grid-column: ${props.gridColumn}`;
  }

  return null;
}

function alignSelf<T extends Props>(props: ThemedStyledProps<T, Theme>) {
  if (props.alignSelf) {
    return `grid-row: ${props.alignSelf}`;
  }

  return null;
}

export default function gridItem<T>(component: ComponentType<T>) {
  return styled(component)`
    ${gridRow};
    ${gridColumn};
    ${alignSelf};
  `;
}
