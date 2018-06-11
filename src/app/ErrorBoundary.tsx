import React, { Component, ErrorInfo } from 'react';
import ErrorReporter from './components/organisms/ErrorReporter';

type Props = {
  onError?: (error: Error, componentStack: string) => void;
};

type State = {
  error: Error | null;
  info: ErrorInfo | null;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      error: null,
      info: null,
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError } = this.props;

    if (typeof onError === 'function') {
      try {
        onError.call(this, error, info ? info.componentStack : '');
      } finally {
      }
    }

    this.setState({ error, info });
  }

  render() {
    const { children } = this.props;
    const { error, info } = this.state;

    if (error !== null) {
      return (
        <ErrorReporter
          error={error}
          componentStack={info ? info.componentStack : null}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
