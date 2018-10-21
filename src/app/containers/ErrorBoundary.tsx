import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  handleError: (error: Error, info: ErrorInfo) => ReactNode;
}

interface IValid {
  variant: 'ok';
}

interface IError {
  variant: 'error';
  error: Error;
  info: ErrorInfo;
}

type State = IValid | IError;

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props, context: any) {
    super(props, context);
    this.state = {
      variant: 'ok',
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState(state => ({
      ...state,
      error,
      info,
      variant: 'error',
    }));
  }

  render() {
    switch (this.state.variant) {
      case 'ok':
        return this.props.children;
      case 'error':
        if (typeof this.props.handleError === 'function') {
          return this.props.handleError(this.state.error, this.state.info);
        }
        return this.props.handleError;
    }
  }
}

export default ErrorBoundary;
