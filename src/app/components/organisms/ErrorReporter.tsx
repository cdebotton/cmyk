import React, { SFC, ErrorInfo } from 'react';

type Props = {
  componentStack: string | null;
  error: Error;
};

const ErrorReporter: SFC<Props> = ({ error, componentStack }) => (
  <div>
    <h2>{error.message}</h2>
    <pre>{error.message}</pre>
    <code>{JSON.stringify(error.stack, null, 2)}</code>
    <p>{componentStack}</p>
  </div>
);

export default ErrorReporter;
