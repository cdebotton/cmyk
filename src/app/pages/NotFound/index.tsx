import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import Status from '../../packages/routes/Status';

interface Props extends RouteComponentProps<{}> {}

const NotFound: SFC<Props> = ({ location: { pathname } }) => (
  <Status statusCode={404}>
    <div>
      <h1>Whoops!</h1>
      <p>
        Sorry, but we couldn't find <code>{pathname}</code>
      </p>
    </div>
  </Status>
);

export default NotFound;
