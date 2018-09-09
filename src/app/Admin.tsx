import {
  faCamera,
  faCogs,
  faFolder,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rem } from 'polished';
import React from 'react';
import { hot } from 'react-hot-loader';
import { RouteComponentProps, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import ClientError from './ClientError';
import Heading from './components/Heading';
import DynamicRoute from './containers/DynamicRoute';
import ErrorBoundary from './containers/ErrorBoundary';
import Session from './containers/Session';

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

const Header = styled.header`
  grid-column: 1 / span 1;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: ${rem(24)} ${rem(16)};
`;

const Navigation = styled.nav`
  position: relative;
  display: flex;
  align-items: stretch;
  flex-flow: column nowrap;
  margin-top: ${rem(16)};
`;

const PageLink = styled(NavLink)`
  padding: ${rem(12)};
  text-align: center;
`;

function Admin({ className, match }: IProps) {
  return (
    <ErrorBoundary
      handleError={(error, info) => <ClientError error={error} info={info} />}
    >
      <div className={className}>
        <Header>
          <Heading level={1} vertical>
            CMYK
          </Heading>
          <Navigation>
            <PageLink exact to={match.url}>
              <FontAwesomeIcon icon={faHome} />
            </PageLink>
            <PageLink to={`${match.url}/documents`}>
              <FontAwesomeIcon icon={faFolder} />
            </PageLink>
            <PageLink to={`${match.url}/media`}>
              <FontAwesomeIcon icon={faCamera} />
            </PageLink>
            <PageLink to={`${match.url}/users`}>
              <FontAwesomeIcon icon={faUser} />
            </PageLink>
            <PageLink to={`${match.url}/settings`}>
              <FontAwesomeIcon icon={faCogs} />
            </PageLink>
            <Session>
              {({ session, client }) => {
                if (!session) {
                  return null;
                }

                return (
                  <button
                    onClick={() => {
                      localStorage.removeItem('jwt');
                      client.resetStore();
                    }}
                  >
                    Out
                  </button>
                );
              }}
            </Session>
          </Navigation>
        </Header>
        <Switch>
          <DynamicRoute
            exact
            path={`${match.url}`}
            loader={() => import('./AdminDashboard')}
          />
          <DynamicRoute
            path={`${match.url}/users/:userId`}
            loader={() => import('./AdminEditUser')}
          />
          <DynamicRoute
            path={`${match.url}/users`}
            loader={() => import('./AdminUsers')}
          />
          <DynamicRoute loader={() => import('./NotFound')} />
        </Switch>
      </div>
    </ErrorBoundary>
  );
}

export default hot(module)(styled(Admin)`
  position: relative;
  display: grid;
  grid-template-columns: min-content auto;
  min-height: 100vh;
  width: 100%;
`);
