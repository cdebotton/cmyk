import React, { SFC, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field } from 'formik';
import Heading from './components/atoms/Heading';

const createUserMutation = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

const AdminCreateUser: SFC = () => (
  <div>
    <Heading level={3}>Create user</Heading>
    <Mutation mutation={createUserMutation}>
      {mutationFn => (
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={values => {
            mutationFn({
              variables: {
                input: values,
              },
            });
          }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name="email"
                render={({ field }) => (
                  <Fragment>
                    <input type="text" placeholder="Email" {...field} />
                  </Fragment>
                )}
              />
              <Field
                name="password"
                render={({ field }) => (
                  <Fragment>
                    <input type="password" placeholder="Password" {...field} />
                  </Fragment>
                )}
              />
              <button type="submit">Create</button>
            </form>
          )}
        </Formik>
      )}
    </Mutation>
  </div>
);

export default AdminCreateUser;
