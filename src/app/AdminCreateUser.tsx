import React, { SFC, Fragment } from 'react';
import { Mutation, FetchResult } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field, FormikProps } from 'formik';
import * as yup from 'yup';
import Heading from './components/atoms/Heading';

const createUserMutation = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
    }
  }
`;

type Values = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(4)
    .max(40)
    .required(),
});

type CacheQuery = {
  users: {
    id: string;
    email: string;
  }[];
};

type Response = {
  createUser: {
    id: string;
    email: string;
  };
};

const AdminCreateUser: SFC = () => (
  <div>
    <Heading level={3}>Create user</Heading>
    <Mutation
      mutation={createUserMutation}
      update={(cache, result: FetchResult<Response>) => {
        if (!result.data) {
          return;
        }

        const query = gql`
          query {
            users {
              id
              email
            }
          }
        `;
        const data = cache.readQuery<CacheQuery>({ query });
        if (!data) {
          return;
        }

        cache.writeQuery({
          query,
          data: { users: data.users.concat(result.data.createUser) },
        });
      }}
    >
      {mutationFn => (
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={schema}
          onSubmit={values => {
            mutationFn({
              variables: {
                input: values,
              },
            });
          }}
        >
          {({ handleSubmit, isValid }: FormikProps<Values>) => (
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
              <button type="submit" disabled={!isValid}>
                Create
              </button>
            </form>
          )}
        </Formik>
      )}
    </Mutation>
  </div>
);

export default AdminCreateUser;
