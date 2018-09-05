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

interface IProps extends RouteComponentProps<{}> {
  className?: string;
}

const Header = styled.header`
  grid-column: 1 / span 1;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
`;

const Navigation = styled.nav`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: ${rem(16)};
`;

const Viewport = styled.div`
  grid-column: 2 / span 1;
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
            <NavLink exact to={match.url}>
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <NavLink to={`${match.url}/documents`}>
              <FontAwesomeIcon icon={faFolder} />
            </NavLink>
            <NavLink to={`${match.url}/media`}>
              <FontAwesomeIcon icon={faCamera} />
            </NavLink>
            <NavLink to={`${match.url}/users`}>
              <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink to={`${match.url}/settings`}>
              <FontAwesomeIcon icon={faCogs} />
            </NavLink>
          </Navigation>
        </Header>
        <Viewport>
          <Switch>
            <DynamicRoute
              exact
              path={`${match.url}`}
              loader={() => import('./AdminDashboard')}
            />
            <DynamicRoute loader={() => import('./AdminUsers')} />
            <DynamicRoute loader={() => import('./NotFound')} />
          </Switch>
        </Viewport>
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
