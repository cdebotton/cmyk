import React, { SFC, ReactNode } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  IconDefinition,
  IconName,
  IconPrefix,
} from '@fortawesome/fontawesome-common-types';
import styled from 'styled-components';

type Props = NavLinkProps & {
  icon: IconDefinition | IconName | [IconPrefix, IconName];
};

const PageLink: SFC<Props> = ({ children, icon, ...props }) => (
  <NavLink {...props}>
    <FontAwesomeIcon icon={icon} /> {children}
  </NavLink>
);

export default styled(PageLink)`
  position: relative;
`;
