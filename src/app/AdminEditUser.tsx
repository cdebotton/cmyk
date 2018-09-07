import { Field, Formik } from 'formik';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';
import Heading from './components/Heading';

const USER_QUERY = gql`
  query AdminEditUser($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      email
      profile {
        firstName
        lastName
      }
    }
  }
`;

interface IValues {
  email: string;
}

interface IProps extends RouteComponentProps<{ userId: string }> {
  className?: string;
}

function AdminEditUser({ className, match }: IProps) {
  return (
    <div className={className}>
      <Query
        query={USER_QUERY}
        variables={{ where: { id: match.params.userId } }}
      >
        {({ data, loading, error }) => {
          if (error) {
            return null;
          }

          if (loading || !data) {
            return null;
          }

          return (
            <>
              <Heading>Edit User {data.user.email}</Heading>
              <Formik<IValues>
                onSubmit={values => {
                  // tslint:disable-next-line no-console
                  console.log(values);
                }}
                initialValues={{
                  email: data.user.email,
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <Field name="email" value={data.user.email} />
                    <button type="submit">Save</button>
                  </form>
                )}
              </Formik>
            </>
          );
        }}
      </Query>
    </div>
  );
}

export default hot(module)(styled(AdminEditUser)`
  display: grid;
`);
