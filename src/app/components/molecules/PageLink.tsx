import React, { SFC, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = NavLinkProps & {
  icon: IconDefinition | IconName | [IconPrefix, IconName];
};

const Icon = styled(FontAwesomeIcon)`
  position: relative;
`;

const PageLink: SFC<Props> = ({ children, icon, ...props }) => (
  <NavLink {...props}>
    <Icon size="lg" icon={icon} />
  </NavLink>
);

export default styled(PageLink)`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${rem(5)} 0;
  color: inherit;
  opacity: 0.8;
  text-decoration: none;

  &.active {
    opacity: 1;
  }
`;
