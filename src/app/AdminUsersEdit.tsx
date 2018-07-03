import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { Formik, Form, Field } from 'formik';
import Heading from './components/atoms/Heading';
import { GetUser } from './generated/operation-result-types';
import NotFound from './NotFound';

const GET_USER_QUERY = gql`
  query GetUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      role
      profile {
        firstName
        lastName
        dateOfBirth
      }
    }
  }
`;

interface Props extends RouteComponentProps<{ userId: string }> {}

const AdminUsersEdit: SFC<Props> = ({
  match,
  history,
  location,
  staticContext,
}) => (
  <div>
    <Query
      query={GET_USER_QUERY}
      variables={{ where: { id: match.params.userId } }}
    >
      {({ data, loading, error }: QueryResult<GetUser>) => {
        if (error) {
          return <p>{error.message}</p>;
        }

        if (!data || loading) {
          return <p>Loading...</p>;
        }

        if (!data.user) {
          return (
            <NotFound
              match={match}
              history={history}
              location={location}
              staticContext={staticContext}
            />
          );
        }

        return (
          <div>
            <Heading level={3}>{data.user.email}</Heading>
            <Formik
              initialValues={data.user}
              onSubmit={values => console.log(values)}
            >
              {() => (
                <Form>
                  <Field type="text" component="input" name="email" />
                  <button type="submit">Save</button>
                </Form>
              )}
            </Formik>
            <pre>{JSON.stringify(data.user, null, 2)}</pre>
          </div>
        );
      }}
    </Query>
  </div>
);

export default AdminUsersEdit;
