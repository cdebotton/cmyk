import React, { SFC } from 'react';
import { Route } from 'react-router';

type Props = {
  statusCode: number;
};

const Status: SFC<Props> = ({ children, statusCode }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.statusCode = statusCode;
      }

      return children;
    }}
  />
);

export default Status;
