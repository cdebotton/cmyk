import React, { SFC, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { Query, QueryResult, Mutation } from 'react-apollo';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import gql from 'graphql-tag';
import Heading from '../components/atoms/Heading';
import PageLoader from '../components/molecules/PageLoader';

const usersQuery = gql`
  query AdminUsersList {
    allUsers(first: 20) @connection(key: "allUsers", filter: ["type"]) {
      edges {
        cursor
        node {
          nodeId
          id
          username
          email
          createdAt
          updatedAt
        }
      }
    }
  }
`;

const createUserMutation = gql`
  mutation CreateUserMutation($input: CreateUserInput!) {
    createUser(input: $input) @connection(key: "allUsers", filter: ["type"]) {
      userEdge {
        cursor
        node {
          nodeId
          id
          username
          email
          createdAt
          updatedAt
        }
      }
    }
  }
`;

type Result = {
  allUsers: {
    edges: {
      node: {
        id: number;
        username: string;
        email: string;
      };
    }[];
  };
};

type Values = {
  email: string;
  username: string;
  password: string;
};

const AdminUsers: SFC = () => (
  <Query query={usersQuery}>
    {({ data, error }: QueryResult<Result>) => {
      if (!data) {
        return <PageLoader />;
      }

      if (error) {
        return null;
      }

      return (
        <div>
          <Heading>Users</Heading>
          <Mutation mutation={createUserMutation}>
            {mutateFn => (
              <Formik
                initialValues={{ email: '', username: '', password: '' }}
                onSubmit={user => {
                  mutateFn({
                    variables: {
                      input: { user },
                    },
                  });
                }}
                render={({ handleSubmit }: FormikProps<Values>) => (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <Field
                        name="email"
                        render={({ field, form }: FieldProps<Values>) => (
                          <Fragment>
                            <input type="text" placeholder="Email" {...field} />
                            {form.touched.email &&
                              form.errors.email &&
                              form.errors.email}
                          </Fragment>
                        )}
                      />
                      <Field
                        name="username"
                        render={({ field, form }: FieldProps<Values>) => (
                          <Fragment>
                            <input
                              type="text"
                              placeholder="Username"
                              {...field}
                            />
                            {form.touched.username &&
                              form.errors.username &&
                              form.errors.username}
                          </Fragment>
                        )}
                      />
                      <Field
                        name="password"
                        render={({ field, form }: FieldProps<Values>) => (
                          <Fragment>
                            <input
                              type="password"
                              placeholder="Password"
                              {...field}
                            />
                            {form.touched.password &&
                              form.errors.password &&
                              form.errors.password}
                          </Fragment>
                        )}
                      />
                      <button type="submit">Create</button>
                    </form>
                  </div>
                )}
              />
            )}
          </Mutation>

          {data.allUsers.edges.length > 0 && (
            <ul>
              {data.allUsers.edges.map(edge => (
                <li key={edge.node.id}>{edge.node.email}</li>
              ))}
            </ul>
          )}
        </div>
      );
    }}
  </Query>
);

export default hot(module)(AdminUsers);
