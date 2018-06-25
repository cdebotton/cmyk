import React, { createElement, SFC, ComponentType } from 'react';
import styled from 'styled-components';
import { CssHelperFn } from '../../theme';

interface Props {
  className?: string;
  templateRows?: string;
  templateColumns?: string;
  component?: ComponentType<any> | string;
}

const Grid: SFC<Props> = ({
  component = 'div',
  templateColumns: _0,
  templateRows: _1,
  ...props
}) => {
  return createElement(component, props);
};

const getTemplateRows: CssHelperFn<Props> = props => {
  if (props.templateRows) {
    return props.templateRows;
  }

  return '';
};

const getTemplateColumns: CssHelperFn<Props> = props => {
  if (props.templateColumns) {
    return props.templateColumns;
  }

  return '';
};

export default styled(Grid)`
  position: relative;
  display: grid;
  grid-template-columns: ${getTemplateColumns};
  grid-template-rows: ${getTemplateRows};
`;
