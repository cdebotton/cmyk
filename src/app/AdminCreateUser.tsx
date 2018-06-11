import React, { SFC } from 'react';
import { Mutation, MutationUpdaterFn } from 'react-apollo';
import gql from 'graphql-tag';
import { Formik, Field, FormikProps } from 'formik';
import * as yup from 'yup';
import Heading from './components/atoms/Heading';

const createUserMutation = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      id
      email
      role
      profile {
        firstName
        lastName
      }
      lastLogin
    }
  }
`;

type Values = {
  email: string;
  password: string;
};

const AdminCreateUser: SFC = () => (
  <div>
    <Heading level={3}>Create user</Heading>
    <Mutation mutation={createUserMutation} update={updateOnCreateUser}>
      {mutationFn => (
        <Formik
          initialValues={{
            email: '',
            password: '',
            role: 'USER',
          }}
          validationSchema={schema}
          onSubmit={values => {
            mutationFn({
              variables: {
                input: { ...values, profile: { create: {} } },
              },
            });
          }}
        >
          {({ handleSubmit, isValid }: FormikProps<Values>) => (
            <form onSubmit={handleSubmit}>
              <Field
                type="email"
                name="email"
                component="input"
                placeholder="Email"
              />
              <Field
                type="password"
                name="password"
                component="input"
                placeholder="Password"
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

const updateOnCreateUser: MutationUpdaterFn<Response> = (cache, result) => {
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
};

export default AdminCreateUser;
