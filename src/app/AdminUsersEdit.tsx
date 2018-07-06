import React, { SFC } from 'react';
import { RouteComponentProps } from 'react-router';
import gql from 'graphql-tag';
import { Query, QueryResult } from 'react-apollo';
import { Formik, Form, Field, FieldProps } from 'formik';
import Heading from './components/atoms/Heading';
import { GetUser } from './generated/operation-result-types';
import NotFound from './NotFound';
import grid from './styles/grid';
import gridItem from './styles/gridItem';
import Input from './components/molecules/Input';

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

const EditUserForm = grid(Form);
const EditUserInput = gridItem(Input);

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

        const { email, role, profile } = data.user;

        return (
          <div>
            <Heading level={3}>{data.user.email}</Heading>
            <Formik
              initialValues={{ email, role, profile }}
              onSubmit={values => console.log(values)}
            >
              {() => (
                <EditUserForm
                  gridTemplateColumns={['1fr', '1fr']}
                  gridTemplateRows={['repeat(3, min-content)']}
                  gridGap={20}
                >
                  <Field
                    name="email"
                    render={(props: FieldProps) => (
                      <EditUserInput
                        {...props}
                        type="email"
                        gridRow={[1, 'span 1']}
                        gridColumn={[1, 'span 2']}
                      />
                    )}
                  />
                  <Field
                    name="profile.firstName"
                    render={(props: FieldProps) => (
                      <EditUserInput
                        {...props}
                        gridRow={[2, 'span 1']}
                        gridColumn={[1, 'span 1']}
                      />
                    )}
                  />
                  <Field
                    name="profile.lastName"
                    render={(props: FieldProps) => (
                      <EditUserInput
                        {...props}
                        gridRow={[2, 'span 1']}
                        gridColumn={[2, 'span 1']}
                      />
                    )}
                  />
                  <button type="submit">Save</button>
                  <button type="reset">Reset</button>
                </EditUserForm>
              )}
            </Formik>
          </div>
        );
      }}
    </Query>
  </div>
);

export default AdminUsersEdit;
