import React, { Component } from 'react';

interface IState {}

class ErrorBoundary extends Component<{}, IState> {
  public constructor(props: {}, context: any) {
    super(props, context);
    this.state = {};
  }

  public render() {
    return this.props.children;
  }
}
