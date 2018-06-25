import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import Status from './containers/Status';
import Heading from './components/atoms/Heading';

interface Props extends RouteComponentProps<{}> {}

const NotFound: SFC<Props> = ({ location: { pathname } }) => (
  <Status statusCode={404}>
    <div>
      <Heading>Whoops!</Heading>
      <p>
        Sorry, but we couldn't find <code>{pathname}</code>
      </p>
    </div>
  </Status>
);

export default NotFound;
