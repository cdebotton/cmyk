import React, { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface IProps<T> {
  className?: string;
  idColumn: keyof T;
  columns: Array<keyof T>;
  items: T[];
}

const GridContainer = styled.ul``;

class Grid<T> extends Component<IProps<T>> {
  public static defaultProps = {
    id: 'id',
  };

  public render() {
    const { className, items } = this.props;

    return (
      <GridContainer className={className}>
        {items.map(item => (
          <li key={`TABLE_ITEM_${item[this.props.idColumn]}`} />
        ))}
      </GridContainer>
    );
  }
}

export default Grid;
