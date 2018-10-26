import { faAngry } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { margin, padding, rem } from 'polished';
import React, { lazy, Suspense } from 'react';
import { Query } from 'react-apollo';
import { Route, RouteComponentProps, Switch } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { CurrentUserQuery } from './__generated__/CurrentUserQuery';
import ClientError from './ClientError';
import Avatar from './components/Avatar';
import Button from './components/Button';
import Loader from './components/Loader';
import ErrorBoundary from './containers/ErrorBoundary';
import Session from './containers/Session';
import PortalOutlet from './PortalOutlet';
import GlobalStyles from './styles/AdminStyles';
import background from './styles/background';

interface Props extends RouteComponentProps<{}> {
  className?: string;
}

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    session {
      user {
        id
        profile {
          id
          firstName
          avatar {
            id
            url
          }
        }
      }
    }
  }
`;

class ThemeNotImplementedError extends Error {
  constructor(msg: string) {
    super(`Theme not implemented for mode ${msg}`);
  }
}

const Layout = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  grid-gap: ${rem(16)};
  color: #fff;
  min-height: 100vh;
  ${background};
`;

const Header = styled.header`
  position: relative;
  display: grid;
  grid-gap: ${rem(16)};
  grid-template-columns: min-content auto max-content;
  align-items: center;
  align-content: center;
  width: 100vw;
  ${padding(rem(16), rem(32), rem(16), rem(16))};

  &::after {
    content: ' ';
    display: block;
    width: calc(100% - ${rem(64)});
    height: 1px;
    background-color: rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 0;
    ${margin(0, rem(32))};
  }
`;

const Navigation = styled.nav`
  display: grid;
  grid-template-columns: ${props =>
    `repeat(${React.Children.count(props.children)}, max-content)`};
  grid-gap: ${rem(8)};
`;

const PageLink = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-family: 'Raleway', sans-serif;
  font-size: ${rem(24)};
  font-weight: 300;
  color: hsla(0, 80%, 100%, 0.5);

  &.active {
    color: rgba(255, 255, 255, 1);
  }
`;

const LogoutButton = styled(Button)``;

const AdminDashboard = lazy(() => import('./AdminDashboard'));
const AdminNewUser = lazy(() => import('./AdminNewUser'));
const AdminEditUser = lazy(() => import('./AdminEditUser'));
const AdminUsers = lazy(() => import('./AdminUsers'));
const AdminDocuments = lazy(() => import('./AdminDocuments'));
const AdminFiles = lazy(() => import('./AdminFiles'));
const NotFound = lazy(() => import('./NotFound'));

function Admin({ className, match }: Props) {
  return (
    <ErrorBoundary
      handleError={(error, info) => <ClientError error={error} info={info} />}
    >
      <ThemeProvider theme={{ mode: 'dark', size: 'medium' }}>
        <Layout className={className}>
          <GlobalStyles />
          <Header>
            <Query<CurrentUserQuery> query={CURRENT_USER_QUERY}>
              {({ data, loading, error }) => {
                const user = data && data.session && data.session.user;
                const profile = user && user.profile;
                const name = profile ? profile.firstName : '';
                const avatar =
                  profile && profile.avatar ? profile.avatar.url : '';
                return (
                  <Link to={`${match.url}/users/${user ? user.id : ''}`}>
                    <Avatar size={64} src={avatar} />
                  </Link>
                );
              }}
            </Query>
            <Navigation>
              <PageLink exact to={match.url}>
                Home
              </PageLink>
              <PageLink to={`${match.url}/documents`}>Documents</PageLink>
              <PageLink to={`${match.url}/media`}>Files</PageLink>
              <PageLink to={`${match.url}/users`}>Users</PageLink>
              <PageLink to={`${match.url}/settings`}>Settings</PageLink>
            </Navigation>
            <Session>
              {({ session, client }) => {
                if (!session) {
                  return null;
                }

                return (
                  <LogoutButton
                    format="neutral"
                    onClick={() => {
                      localStorage.removeItem('jwt');
                      client.resetStore();
                    }}
                  >
                    <FontAwesomeIcon icon={faAngry} />
                  </LogoutButton>
                );
              }}
            </Session>
          </Header>
          <Suspense maxDuration={300} fallback={<Loader />}>
            <Switch>
              <Route exact path={`${match.url}`} component={AdminDashboard} />
              <Route path={`${match.url}/users/new`} component={AdminNewUser} />
              <Route
                path={`${match.url}/users/:userId`}
                component={AdminEditUser}
              />
              <Route path={`${match.url}/users`} component={AdminUsers} />
              <Route
                path={`${match.url}/documents`}
                component={AdminDocuments}
              />
              <Route path={`${match.url}/media`} component={AdminFiles} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
          <PortalOutlet />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Admin;
