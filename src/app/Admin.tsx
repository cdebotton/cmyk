import {
  faAngry,
  faFolder,
  faImages,
  faMehBlank,
  faSun,
  faUser,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import { darken, lighten, margin, padding, rem } from 'polished';
import React from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps, Switch } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import styled, { css, ThemeProvider } from 'styled-components';
import { CurrentUserQuery } from './__generated__/CurrentUserQuery';
import ClientError from './ClientError';
import Button from './components/Button';
import Greeting from './components/Greeting';
import Heading from './components/Heading';
import DynamicRoute from './containers/DynamicRoute';
import ErrorBoundary from './containers/ErrorBoundary';
import Session from './containers/Session';

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

const Welcome = styled.div`
  font-family: 'Raleway';
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: max-content auto;
  min-height: 100vh;
  ${props => {
    switch (props.theme.mode) {
      case 'dark':
        return css`
          color: #fff;
          background: linear-gradient(to bottom, #0e1a1b, #111b28);
        `;
      default:
        throw ThemeNotImplementedError;
    }
  }};
`;

const Header = styled.header`
  display: grid;
  align-content: start;
  background-color: hsla(0, 0%, 0%, 0.41);
`;

const Navigation = styled.nav`
  display: grid;
  grid-gap: ${rem(16)};
`;

const PageLink = styled(NavLink)`
  position: relative;
  font-size: ${rem(12)};
  text-decoration: none;
  color: #fff;
  display: grid;
  grid-template-columns: min-content auto;
  align-items: center;
  grid-gap: ${rem(10)};
  ${padding(rem(4), 0, rem(4), rem(16))};

  &.active {
    background-color: #2573a7;

    &::after {
      content: ' ';
      display: block;
      position: absolute;
      left: 100%;
      top: 0;
      height: 100%;
      width: 0;
      border-top: solid 12px transparent;
      border-bottom: solid 12px transparent;
      border-left: solid 12px #2573a7;
    }
  }
`;

const LogoutButton = styled(Button)`
  justify-self: center;
  display: none;
`;

const AdminWelcome = styled(Welcome)`
  display: grid;
  align-content: start;
  grid-gap: ${rem(16)};
  ${margin(rem(32), rem(48))};
`;

const LinkIcon = styled(FontAwesomeIcon)`
  font-size: ${rem(16)};
`;

const Avatar = styled.span<{ size: number; src: string }>`
  border-radius: 50%;
  display: inline-block;
  background-image: url("${props => props.src}");
  background-position: center center;
  width: ${props => rem(props.size)};
  height: ${props => rem(props.size)};
  background-size: cover;
  font-family: 'Roboto', sans-serif;
`;

function Admin({ className, match }: Props) {
  return (
    <ThemeProvider theme={{ mode: 'dark', size: 'medium' }}>
      <ErrorBoundary
        handleError={(error, info) => <ClientError error={error} info={info} />}
      >
        <Layout className={className}>
          <Header>
            <Query<CurrentUserQuery> query={CURRENT_USER_QUERY}>
              {({ data, loading, error }) => {
                const user = data && data.session && data.session.user;
                const profile = user && user.profile;
                const name = profile ? profile.firstName : '';
                const avatar =
                  profile && profile.avatar ? profile.avatar.url : '';
                return (
                  <AdminWelcome>
                    <Greeting message="Oh hello" name={name} />
                    <Link to={`${match.url}/users/${user ? user.id : ''}`}>
                      <Avatar size={92} src={avatar} />
                    </Link>
                  </AdminWelcome>
                );
              }}
            </Query>
            <Navigation>
              <PageLink exact to={match.url}>
                <LinkIcon icon={faSun} size="2x" /> Home
              </PageLink>
              <PageLink to={`${match.url}/documents`}>
                <LinkIcon icon={faFolder} size="2x" /> Documents
              </PageLink>
              <PageLink to={`${match.url}/media`}>
                <LinkIcon icon={faImages} size="2x" /> Files
              </PageLink>
              <PageLink to={`${match.url}/users`}>
                <LinkIcon icon={faUser} size="2x" /> Users
              </PageLink>
              <PageLink to={`${match.url}/settings`}>
                <LinkIcon icon={faMehBlank} size="2x" /> Settings
              </PageLink>
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
          <Switch>
            <DynamicRoute
              exact
              path={`${match.url}`}
              loader={() => import('./AdminDashboard')}
            />
            <DynamicRoute
              path={`${match.url}/users/new`}
              loader={() => import('./AdminNewUser')}
            />
            <DynamicRoute
              path={`${match.url}/users/:userId`}
              loader={() => import('./AdminEditUser')}
            />
            <DynamicRoute
              path={`${match.url}/users`}
              loader={() => import('./AdminUsers')}
            />
            <DynamicRoute
              path={`${match.url}/media`}
              loader={() => import('./AdminFiles')}
            />
            <DynamicRoute loader={() => import('./NotFound')} />
          </Switch>
        </Layout>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default hot(module)(Admin);
