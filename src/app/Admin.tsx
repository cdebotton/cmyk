import {
  faCamera,
  faCogs,
  faFolder,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import Heading from './components/Heading';

interface IProps {
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
`;

function Admin({ className }: IProps) {
  return (
    <div className={className}>
      <Header>
        <Heading level={1} vertical>
          CMYK
        </Heading>
        <Navigation>
          <FontAwesomeIcon icon={faFolder} />
          <FontAwesomeIcon icon={faCamera} />
          <FontAwesomeIcon icon={faUser} />
          <FontAwesomeIcon icon={faCogs} />
        </Navigation>
      </Header>
    </div>
  );
}

export default hot(module)(styled(Admin)`
  position: relative;
  display: grid;
  grid-template-columns: min-content auto;
`);
