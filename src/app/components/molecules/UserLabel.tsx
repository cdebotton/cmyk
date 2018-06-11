import React, { SFC } from 'react';
import styled from 'styled-components';
import { LocationDescriptor } from 'history';
import { NavLink } from 'react-router-dom';
import { rem } from 'polished';
import colors from '../../theme/colors';

type Props = {
  className?: string;
  to: LocationDescriptor;

  user: {
    role: string;
    profile: {
      firstName: string | null;
      lastName: string | null;
    };
  };
};

const Name = styled.span`
  color: ${colors.palette.light[0]};
  font-weight: 800;
`;

const Email = styled.span`
  color: ${colors.palette.light[1]};
  font-size: ${rem(12)};
`;

const UserLabel: SFC<Props> = ({ className, to, user }) => (
  <NavLink className={className} to={to}>
    {user.profile.firstName &&
      user.profile.lastName && (
        <Name>
          {user.profile.firstName} {user.profile.lastName}
        </Name>
      )}
    <Email>{user.role}</Email>
  </NavLink>
);

export default styled(UserLabel)`
  position: relative;
  display: grid;
  align-items: end;
  grid-gap: ${rem(10)};
  grid-template-columns: max-content auto;
  text-decoration: none;
`;
