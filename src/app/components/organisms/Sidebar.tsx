import React, { Component, ReactNode, SFC } from 'react';
import styled from 'styled-components';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../atoms/Button';
import { rem } from '../../../../node_modules/polished';
import { Format } from '../../styles/theme';

interface Props {
  className?: string;
  label: ReactNode;
  navigation: ReactNode;
}

interface State {
  open: boolean;
}

const Controls = styled.div`
  display: grid;
  grid-gap: ${rem(10)};
  grid-template-rows: min-content auto;
`;

const Navigation = styled.nav`
  display: grid;
  align-content: start;
  justify-items: stretch;
`;

const Sidebar: SFC<Props> = ({ className, label, navigation }) => (
  <div className={className}>
    <Controls>{label}</Controls>
    <Navigation>{navigation}</Navigation>
  </div>
);

export default styled(Sidebar)`
  display: grid;
  padding: ${rem(10)};
  grid-template-rows: min-content auto;
  justify-items: center;
`;
