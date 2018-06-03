import gql from 'graphql-tag';
import React, { SFC, Fragment } from 'react';
import Heading from '../components/atoms/Heading';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

const query = gql`
  query {
    foo
  }
`;

const Home: SFC = () => (
  <Query query={query}>
    {({ data, error }) => {
      if (error) {
        return <p>{error.message}</p>;
      }

      if (!data) {
        return <p>Loading...</p>;
      }

      return (
        <Fragment>
          <Heading level={1}>{data.foo}</Heading>
          <Link to="/">Home</Link>
          <Link to="/ewqewqeqe">Not Found</Link>
        </Fragment>
      );
    }}
  </Query>
);

export default Home;
