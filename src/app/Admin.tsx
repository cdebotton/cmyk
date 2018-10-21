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
import { darken, lighten, margin, opacify, padding, rem, size } from 'polished';
import { normalize } from 'polished';
import React, { Placeholder } from 'react';
import { Query } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { RouteComponentProps, Switch } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import styled, { css, keyframes, ThemeProvider } from 'styled-components';
import { CurrentUserQuery } from './__generated__/CurrentUserQuery';
import ClientError from './ClientError';
import Button from './components/Button';
import Greeting from './components/Greeting';
import Heading from './components/Heading';
import Loader from './components/Loader';
import DynamicRoute from './containers/DynamicRoute';
import ErrorBoundary from './containers/ErrorBoundary';
import Session from './containers/Session';

import { createGlobalStyle } from 'styled-components';
import Avatar from './components/Avatar';
import PortalManager from './containers/PortalManager';
import PortalOutlet from './PortalOutlet';
const GlobalStyles = createGlobalStyle`
  ${normalize()};

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    font-family: Roboto, sans-serif;
  }

  ::selection {
    background-color: hsla(300, 100%, 50%, 0.5);
  }

  a {
    color: hsla(212, 50%, 50%, 1.0);
  }
`;

interface Props extends RouteComponentProps<{}> {
  className?: string;
  portalElement: HTMLElement;
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

const ScrollAnimation = keyframes`
  from {
    background-position: 0 0;
  }

  to {
    background-position: -300vw -300vh;
  }
`;

const Layout = styled.div`
  display: grid;
  grid-template-rows: min-content auto;
  grid-gap: ${rem(16)};
  color: #fff;
  min-height: 100vh;

  &::before {
    content: ' ';
    z-index: -1;
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    width: 100vw;
    background-size: 400vw;
    height: 400vh;
    background-image: linear-gradient(
      to top left,
      hsl(352, 50%, 50%),
      hsl(342, 50%, 50%),
      hsl(332, 50%, 50%),
      hsl(322, 50%, 50%),
      hsl(312, 50%, 50%),
      hsl(302, 50%, 50%),
      hsl(292, 50%, 50%),
      hsl(282, 50%, 50%),
      hsl(272, 50%, 50%),
      hsl(262, 50%, 50%),
      hsl(252, 50%, 50%),
      hsl(242, 50%, 50%),
      hsl(232, 50%, 50%),
      hsl(222, 50%, 50%),
      hsl(212, 50%, 50%),
      hsl(202, 50%, 50%),
      hsl(192, 50%, 50%),
      hsl(182, 50%, 50%),
      hsl(172, 50%, 50%),
      hsl(162, 50%, 50%)
    );
    animation: ${ScrollAnimation} 120s linear infinite alternate;
    transform: translate3d(0, 0, 0);
  }
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
          <Placeholder delayMs={300} fallback={<Loader />}>
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
                path={`${match.url}/documents`}
                loader={() => import('./AdminDocuments')}
              />
              <DynamicRoute
                path={`${match.url}/media`}
                loader={() => import('./AdminFiles')}
              />
              <DynamicRoute loader={() => import('./NotFound')} />
            </Switch>
          </Placeholder>
          <PortalOutlet />
        </Layout>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default hot(module)(Admin);
