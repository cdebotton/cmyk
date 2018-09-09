import React, { Component } from 'react';

interface IProps {
  className?: string;
}

class Grid extends Component<IProps> {
  public render() {
    const { className } = this.props;
    return <ul className={className} />;
  }
}

export default Grid;
