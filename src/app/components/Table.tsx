import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps<T> {
  className?: string;
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
}

const GridContainer = styled.ul``;

class Grid<T> extends Component<IProps<T>> {
  public render() {
    const { className, items, renderItem } = this.props;
    return (
      <GridContainer className={className}>
        {items.map(renderItem)}
      </GridContainer>
    );
  }
}

export default Grid;
